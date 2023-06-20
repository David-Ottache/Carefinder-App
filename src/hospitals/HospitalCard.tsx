import React from 'react'
//import { Link } from 'react-router-dom';
import { Hospital } from './Hospital'

interface HospitalCardProps  {
  hospital: Hospital;
}
function HospitalCard(props: HospitalCardProps) {
  const {hospital} = props
  return (
    <div className="card">
      <img src={hospital.imgUrl} alt="One hospital should be here" />
      <section className="section dark">
        <h5 className="strong">
          <strong>{hospital.name}</strong>
        </h5>
        <p>Email: {hospital.email}</p>
        <p>Address: {hospital.address}</p>
        <p>City: {hospital.city}</p>
        <p>Country: {hospital.country}</p>
        <p>Number: {hospital.number}</p>
        <p>Link: {hospital.link}</p>

        {/* <div className="input group">
          <Link to={"/hospital/" + hospital.id}>
            <button className="bordered">View More</button>
          </Link>
        </div> */}
      </section>
    </div>
  );
}

export default HospitalCard;