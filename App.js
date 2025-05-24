import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: ""
  });

  const [errors, setErrors] = useState({});

  const countries = {
    India: ["Delhi", "Jaipur", "Gaurgon"],
  
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";

    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Valid 10-digit phone number required";

    if (!formData.country) newErrors.country = "Country is required";

    if (!formData.city) newErrors.city = "City is required";
    if (
      !formData.pan ||
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)
    )
      newErrors.pan = "Invalid PAN format";
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar))
      newErrors.aadhar = "Aadhar must be 12 digits";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      navigate("/success", { state: formData });
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (

    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "auto" }}>
   
      <h2>React Form</h2>
      {["firstName", "lastName", "username", "email"].map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            style={{ display: "block", width: "100%" }}
          />
          {errors[field] && <small style={{ color: "red" }}>{errors[field]}</small>}
        </div>
      ))}

      <div>
        <label>Password</label>
        <input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <button
          type="button"
          onClick={() =>
            setFormData({ ...formData, showPassword: !formData.showPassword })
          }
        >
          {formData.showPassword ? "Hide" : "Show"}
        </button>
        {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
      </div>

      <div>
        <label>Phone</label>
        <select
          name="phoneCode"
          value={formData.phoneCode}
          onChange={handleChange}
        >
          <option value="+91">+91</option>
      
        </select>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <small style={{ color: "red" }}>{errors.phoneNumber}</small>
        )}
      </div>

      <div>
        <label>Country</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">--Select--</option>
          {Object.keys(countries).map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        {errors.country && <small style={{ color: "red" }}>{errors.country}</small>}
      </div>

      <div>
        <label>City</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">--Select--</option>
          {(countries[formData.country] || []).map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
        {errors.city && <small style={{ color: "red" }}>{errors.city}</small>}
      </div>

      <div>
        <label>PAN</label>

        <input name="pan" value={formData.pan} onChange={handleChange} />
        {errors.pan && <small style={{ color: "red" }}>{errors.pan}</small>}

      </div>


			

      <div>
 
        <label>Aadhar</label>
        <input name="aadhar" value={formData.aadhar} onChange={handleChange} />
        {errors.aadhar && <small style={{ color: "red" }}>{errors.aadhar}</small>}

      </div>

      <button type="submit" disabled={!validate()}>Submit</button>
    </form>
  );
}

function SuccessPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Submitted Successfully!</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<FormPage />} />

      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}
