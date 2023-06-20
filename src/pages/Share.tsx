import React, { useState } from 'react'
import "../static/Share.css";
import { useNavigate } from 'react-router-dom';
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Hospital } from '../hospitals/Hospital';
import axios from 'axios'
import swal from 'sweetalert';



function Share() {

  const navigate = useNavigate()

  const [param, setParam] = useState('');
  const [email, setEmail] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedItems, setSelectedItems] = useState<Hospital[]>([]);

  const handleShareSearch = async () => {
    const list: any = [];
    const q = query(collection(db, "hospitals"), where("city", "==", param));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setHospitals(list);
  }
  

  const handleShare = async () => {
    if (email.trim() !== "" && selectedItems.length > 0) {
      const sharedItems = selectedItems
        .map(
          (item) =>
            `${item.name} - ${item.link} - ${item.number} - ${item.email}`
        )
        .join("\n");
      try {
        const url = "http://localhost:8000/sendEmail"; // Replace with your API endpoint URL

        // Define the data to send
        const data = {
          email: email,
          message: sharedItems,
          subject: "This is a list of items searched"
        };

        // Make the POST request
        const response = await axios.post(url, data);
        console.log("Response:", response.data);
        swal("Success","Email has been sent successfully!!","success")
        navigate("/")
        
      } catch (error) {
        // Handle the error
        swal("Error", "Email has not been sent successfully!!", "error");
        console.error("Error:", error);
      }
      
      //console.log({email, sharedItems})
    }
  }



  const handleCancel = () => {
    navigate('/')
  }

  const handleSelectItem = (index: number) => {
    const selectedHospital = hospitals[index];
    const isSelected = selectedItems.some(
      (hospital) => hospital.name === selectedHospital.name
    );
    if (!isSelected) {
      setSelectedItems([...selectedItems, selectedHospital]);
    } else {
      setSelectedItems(
        selectedItems.filter(
          (hospital) => hospital.name !== selectedHospital.name
        )
      );
    }
  };

  return (
    <div className="share-container">
      <div className="row">
        <div className="top">
          <h1>Share Hospital</h1>
          <div className="top-button">
            <input
              type="text"
              value={param}
              className="search-param"
              placeholder="Enter the city to search"
              onChange={(e) => setParam(e.target.value)}
            />
            <button className="search-button" onClick={handleShareSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="middle">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" className="checkbox" />
                    <span>Select</span>
                  </th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.length === 0 ? (
                  <tr>
                    <td>No hospitals found.</td>
                  </tr>
                ) : (
                  hospitals.map((hospital: Hospital, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedItems.some(
                            (item) => item.name === hospital.name
                          )}
                          onChange={() => handleSelectItem(index)}
                        />
                      </td>
                      <td>{hospital.name}</td>
                      <td>{hospital.address}</td>
                      <td>{hospital.city}</td>
                      <td>{hospital.country}</td>
                      <td>{hospital.email}</td>
                      <td>{hospital.number}</td>
                      <td>{hospital.link}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bottom">
          <div className="form">
            <div className="form-top">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter email to share to"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-bottom">
              <button type="submit" className="primary" onClick={handleShare}>
                Send
              </button>
              <button type="reset" className="secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <script src="https://smtpjs.com/v3/smtp.js"></script>
      <div className="row">
        <div className="footer">
          <span>Copyright @ 2023</span>
        </div>
      </div>
    </div>
  );
}

export default Share