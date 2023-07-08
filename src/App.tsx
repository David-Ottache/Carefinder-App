import React, {ReactNode, useContext} from 'react';

import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import '../node_modules/mini.css/dist/mini-default.min.css';

import HospitalForm from "./hospitals/HospitalForm";
import HomePage from './pages/HomePage';
import Login from './users/Login';
import UserForm from './users/UserForm';
import { AuthContext } from './context/AuthContext';
import Search from './pages/Search';
import Share from './pages/Share';
import Export from './pages/Export';
//import HospitalDetails from './hospitals/HospitalDetails';


interface Props {
  children: ReactNode;
}


function App() {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }: Props): JSX.Element | null => {
    return currentUser ? <>{children}</> : <Navigate to="/login-user" />;
  };

  const { dispatch } = useContext(AuthContext);
  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo">
            <NavLink to="/" className="nav-link">
              <h1>Carefinda</h1>
            </NavLink>
          </div>
          <div className="links">
            {currentUser ? (
              <div className="login-links">
                <NavLink to="/share" className="nav-link">
                  <h3>Share</h3>
                </NavLink>
                <NavLink to="/export" className="nav-link">
                  <h3>Export</h3>
                </NavLink>
                <NavLink to="/create-hospital" className="nav-link">
                  <h3>Add Hospital</h3>
                </NavLink>
                <NavLink to="" onClick={handleLogout} className="nav-link">
                  <h3>Logout</h3>
                </NavLink>
              </div>
            ) : (
              <NavLink to="/login-user" className="nav-link">
                <h3>Login</h3>
              </NavLink>
            )}
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route path="/login-user" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            {/* <Route path='/hospital/:id' element={ <HospitalDetails />} /> */}
            <Route
              path="/search"
              element={
                <RequireAuth>
                  <Search />
                </RequireAuth>
              }
            />
            <Route
              path="/share"
              element={
                <RequireAuth>
                  <Share />
                </RequireAuth>
              }
            />
            <Route
              path="/export"
              element={
                <RequireAuth>
                  <Export />
                </RequireAuth>
              }
            />

            <Route
              path="/create-hospital"
              element={
                <RequireAuth>
                  <HospitalForm />
                </RequireAuth>
              }
            />
            <Route path="/register-user" element={<UserForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
