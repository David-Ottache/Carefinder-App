import React, { SyntheticEvent, useState } from 'react';
import '../static/Search.css';
import HospitalCard from '../hospitals/HospitalCard';
import { db } from '../firebase';
import { query, where, collection, getDocs } from "firebase/firestore";


function Search() {

  const [param1, setParam1] = useState("");
  const [data, setData] = useState([]);

    const handleSearch = async (e: SyntheticEvent) => {
        e.preventDefault();
        const list: any = [];
        const q = query(
            collection(db, "hospitals"),
          where("city", "==", param1)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setData(list)
    };
    return (
      <div className="search">
        <div className="row">
          <div className="search-params">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={param1}
                placeholder="Enter the city to search"
                onChange={(e) => setParam1(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="search-results">
            {data.length === 0 ? (
              <p>No results found.</p>
            ) : (
              data.map((hospital, index) => (
                <HospitalCard key={index} hospital={hospital} />
              ))
            )}
          </div>
        </div>
        <div className="row">
          <div className="footer">
            <span>Copyright @ 2023</span>
          </div>
        </div>
      </div>
    );
}

export default Search