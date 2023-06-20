import React, { SyntheticEvent, useEffect, useState } from 'react';
import "../static/HospitalForm.css";
import { serverTimestamp, addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import { app, storage } from "../firebase";
import swal from 'sweetalert';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Hospital } from './Hospital';

const db = getFirestore(app);



function CreateHospital() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("")
  const [country, setCountry] = useState(""); 
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState<number>(0);
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [per, setPer] = useState<number>(0)
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    email: "",
    number: "",
    link: "",
  });

  useEffect(() => {
    const uploadFile = () => {
      if (file) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPer(progress)
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgUrl(downloadURL)
            })
          }
        )
      }
    }
    file && uploadFile()
  }, [file])

  

  

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const hospital: any = { name, address, city, country, email, number, link, imgUrl };
    setErrors(() => validate(hospital));
    try {
      await addDoc(collection(db, "hospitals"), {
      ...hospital,
      timestamp: serverTimestamp()
      });
      console.log(hospital)
      swal("Registration Successful!", "New Hospital Added", "success");
      navigate("/");
    } catch (e) {
      swal("Registration Failed", "Please try again!", "error")
      navigate("/create-hospital")
    }
  }  

  function validate(hospital: Hospital) {
    let errors: any = { name: "", address: "", city: "", country: "", email: "", number: 0, link: "", imgUrl: "" }
    if (hospital.name.length === 0) {
      errors.name = "**Name is required";
    }
    if (hospital.address.length === 0) {
      errors.address = "**Address is required";
    }
    if (hospital.city.length === 0) {
      errors.city = "**Address is required";
    }
    if (hospital.country.length === 0) {
      errors.country = "**Address is required";
    }
    if (hospital.email.length === 0) {
      errors.email = "**Email is required";
    }
    if (hospital.number === 0) {
      errors.number = "**Number is required";
    }
    if (hospital.link.length === 0) {
      errors.link = "**Link is required";
    }
    if (hospital.imgUrl.length === 0) {
      errors.imgUrl = "**Image Url is required"
    }
    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.address.length === 0 &&
      errors.city.length === 0 &&
      errors.country.length === 0 &&
      errors.email.length === 0 &&
      errors.number.length === 0 &&
      errors.link.length === 0
    );
  }
  return (
    <div className="create-hospital-container">
      <h3>Create Hospital</h3>
      <form className="hospital-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Hospital Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the hospital name"
        />
        {errors.name.length > 0 && (
          <div className="error">
            <p>{errors.name}</p>
          </div>
        )}
        <label htmlFor="address">Hospital Address</label>
        <textarea
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter the hospital address"
        ></textarea>
        {errors.address.length > 0 && (
          <div className="error">
            <p>{errors.address}</p>
          </div>
        )}
        <label htmlFor="link">City</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter the city"
        />
        {errors.city.length > 0 && (
          <div className="error">
            <p>{errors.city}</p>
          </div>
        )}
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter the Country"
        />
        {errors.country.length > 0 && (
          <div className="error">
            <p>{errors.country}</p>
          </div>
        )}
        <label htmlFor="email">Hospital Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter the email of the hospital"
        />
        {errors.email.length > 0 && (
          <div className="error">
            <p>{errors.email}</p>
          </div>
        )}
        <label htmlFor="number">Contact Number</label>
        <input
          type="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          placeholder="Enter the hospital contact number"
        />
        {errors.number.length > 0 && (
          <div className="error">
            <p>{errors.number}</p>
          </div>
        )}
        <label htmlFor="link">Hospital Link</label>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter the hospital website link"
        />
        {errors.link.length > 0 && (
          <div className="error">
            <p>{errors.link}</p>
          </div>
        )}
        <label htmlFor="image_url">Hospital Image</label>
        <input
          type="file"
          name="image_url"
          onChange={(e) => {
            if (e.target.files != null) {
              setFile(e.target.files[0]);
            }
          }}
        />
        {/* {errors.imgUrl.length > 0 && (
          <div className="error">
            <p>{errors.imgUrl}</p>
          </div>
        )} */}
        <div className="input-group">
          <button
            disabled={per !== null && per < 100}
            className="primary"
            type="submit"
          >
            Save
          </button>
          <button className="secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateHospital