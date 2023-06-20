import React, { useEffect, useState } from 'react'
import HospitalCard from '../hospitals/HospitalCard';
import '../static/HomePage.css'
import { collection,  getDocs } from 'firebase/firestore'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list: any = []
      try {
        const querySnapshot = await getDocs(collection(db, "hospitals"));
        querySnapshot.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
        });
        setData(list)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [data])
  
  const handleSearch = () => {
    navigate('/search')
  }

  return (
    <div className="homepage-container">
      <div className="row">
        <div className="search-container">
          <h3>Looking for something?</h3>
          <button className="header-button" type="submit" onClick={handleSearch}>
            search
          </button>
        </div>
      </div>
      <div className="row">
        <div className="list-container">
          {data.map((hospital, index) => (
            <HospitalCard key={index} hospital={hospital} />
          ))}
        </div>
      </div>
      <div className="row">
        <div className="footer">
          <span>
            Copyright @ 2023
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomePage