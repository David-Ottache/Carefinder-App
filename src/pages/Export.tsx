import React, { SyntheticEvent, useState } from 'react';
import '../static/Export.css';
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Hospital } from "../hospitals/Hospital";
import exportToCSV from "../utilities/exportCsv";
import swal from "sweetalert";
import exportToPDF from '../utilities/exportPdf';

function Export() {
  const [param, setParam] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [selectedItems, setSelectedItems] = useState<Hospital[]>([]);

  const handleSearch = async (e: SyntheticEvent) => {
    const list: any = [];
    const q = query(collection(db, "hospitals"), where("city", "==", param));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setHospitals(list);
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

  const handleExportToCSV = () => {
    const sharedItems = selectedItems
      .map(
        (item) =>
          `${item.name},${item.address},${item.city},${item.country},${item.link},${item.number},${item.email}\n`
      )
      .join("\n");
    
    exportToCSV(sharedItems, 'hospitalList.csv')
    swal("Successful", "Your list of hospitals has been downloaded", "success");
  }

  const handleExportToPDF = () => {
    const sharedItems = selectedItems
      .map(
        (item) => `${item.name} - ${item.link} - ${item.number} - ${item.email}`
      )
      .join("\n");
    exportToPDF(
      sharedItems
    )
      .then(() => {
        swal(
          "Successful",
          "PDF file created successfully.",
          "success"
        );
       
      })
      .catch((error) => {
        swal("Error", "Failed to create PDF file.", "error");
        console.error("Error creating PDF file:", error);
      });
  }
  return (
    <div>
      <div className="row">
        <div className="top">
          <h1>Export Hospital</h1>
          <input
            type="text"
            className="search-param"
            placeholder="Enter the city to search"
            value={param}
            onChange={(e) => setParam(e.target.value)}
          />
          <button
            type="submit"
            className="search-button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="middle">
          <div className="table-container">
            <table>
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
          <div className="button-container">
            <button type="submit" onClick={handleExportToCSV}>
              Export to CSV
            </button>
            <button type="submit" onClick={handleExportToPDF}>
              Export to PDF
            </button>
          </div>
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

export default Export