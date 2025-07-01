import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [productQuery, setProductQuery] = useState("");
  const [productDetail, setProductDetail] = useState(null);
  const [quater, setQuater] = useState("Q3");
  const [fyear, setFyear] = useState("2018");
  const [quaterResult, setQuaterResult] = useState(null);
  const [contactDetails, setContactDetails] = useState(null);
  const [supplierForm, setSupplierForm] = useState({
    companyName: "",
    officialEmailId: "",
    contactNumber: "",
    durationOfContract: "",
    dor: ""
  });
  const [updateContact, setUpdateContact] = useState({
    officialEmailId: "",
    contactNumber: ""
  });
  const [deleteEmail, setDeleteEmail] = useState("");

  const baseUrl = "http://node1:5000";

  useEffect(() => {
    axios.get(`${baseUrl}/home`).then(res => setCompanies(res.data.companyDetail));
    axios.get(`${baseUrl}/products`).then(res => setProducts(res.data.products));
    axios.get(`${baseUrl}/contactus`).then(res => setContactDetails(res.data["Details to"]));
  }, []);

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/productDetails/${productQuery}`);
      if (res.data.searchResult.length > 0) {
        setProductDetail(res.data.searchResult[0]);
      } else {
        setProductDetail(null);
        alert("Product not found");
      }
    } catch (err) {
      alert("Error fetching product details");
    }
  };

  const fetchQuaterResult = async () => {
    try {
      const res = await axios.post(`${baseUrl}/quaterlyResult`, {
        quater,
        fyear
      });
      if (res.data.QuaterlyDetails) {
        setQuaterResult(res.data.QuaterlyDetails);
      } else {
        setQuaterResult(null);
        alert("Quarterly result not available");
      }
    } catch (err) {
      alert("Error fetching quarterly result");
    }
  };

  const registerSupplier = async () => {
    await axios.post(`${baseUrl}/supplierRegister`, supplierForm);
    alert("Supplier registered successfully");
  };

  const updateSupplierContact = async () => {
    try {
      await axios.put(`${baseUrl}/supplierUpdateContactNumber`, updateContact);
      alert("Contact number updated");
    } catch (err) {
      alert("Failed to update contact number");
    }
  };

  const removeSupplier = async () => {
    try {
      await axios.delete(`${baseUrl}/supplierRemove`, { data: { officialEmailId: deleteEmail } });
      alert("Supplier removed");
    } catch (err) {
      alert("Failed to delete supplier");
    }
  };

  return (
    <div className="container">
      <h1>Pharma Company Dashboard</h1>

      <section>
        <h2>Companies</h2>
        {companies.map((comp, i) => (
          <div className="card" key={i}>
            <p><strong>Why Us:</strong> {comp.whyUs}</p>
            <p><strong>Vision:</strong> {comp.vision}</p>
            <p><strong>Mission:</strong> {comp.mission}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Products</h2>
        <ul>
          {products.map((p, i) => (
            <li key={i}>{p.name}</li>
          ))}
        </ul>

        <div className="form-row">
          <input placeholder="Enter product name" value={productQuery} onChange={e => setProductQuery(e.target.value)} />
          <button onClick={fetchProductDetails}>Get Product Detail</button>
        </div>
        {productDetail && (
          <div className="card">
            <p><strong>Name:</strong> {productDetail.name}</p>
            <p><strong>About:</strong> {productDetail.about}</p>
            <p><strong>Uses:</strong> {productDetail.use.join(", ")}</p>
            <p><strong>Side Effects:</strong> {productDetail.sideEffects.join(", ")}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Quaterly Result</h2>
        <div className="form-row">
          <input placeholder="Quarter (e.g. Q3)" value={quater} onChange={e => setQuater(e.target.value)} />
          <input placeholder="Year (e.g. 2018)" value={fyear} onChange={e => setFyear(e.target.value)} />
          <button onClick={fetchQuaterResult}>Get Result</button>
        </div>
        {quaterResult && (
          <div className="card">
            {Object.entries(quaterResult.result).map(([key, val]) => (
              <p key={key}><strong>{key}:</strong> {val}</p>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Supplier Management</h2>
        <div className="form-grid">
          <div>
            <h3>Register Supplier</h3>
            {Object.keys(supplierForm).map(key => (
              <input
                key={key}
                placeholder={key}
                value={supplierForm[key]}
                onChange={e => setSupplierForm({ ...supplierForm, [key]: e.target.value })}
              />
            ))}
            <button onClick={registerSupplier}>Register</button>
          </div>

          <div>
            <h3>Update Contact</h3>
            <input placeholder="Email" value={updateContact.officialEmailId} onChange={e => setUpdateContact({ ...updateContact, officialEmailId: e.target.value })} />
            <input placeholder="New Contact Number" value={updateContact.contactNumber} onChange={e => setUpdateContact({ ...updateContact, contactNumber: e.target.value })} />
            <button onClick={updateSupplierContact}>Update</button>
          </div>
        </div>

        <div className="form-row">
          <h3>Delete Supplier</h3>
          <input placeholder="Email to delete" value={deleteEmail} onChange={e => setDeleteEmail(e.target.value)} />
          <button className="delete" onClick={removeSupplier}>Delete</button>
        </div>
      </section>

      <section>
        <h2>Contact Us</h2>
        {contactDetails && contactDetails.map((d, i) => (
          <div className="card" key={i}>
            <p><strong>Address:</strong> {d.contactUs?.address}</p>
            <p><strong>Hours:</strong> {d.contactUs?.businessHours}</p>
            <p><strong>Phone:</strong> {d.contactUs?.contactNumber}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
