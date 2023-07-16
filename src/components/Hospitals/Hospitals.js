import React, { useEffect, useState } from "react";
import "./style.css";
import { img1, img2 } from "../../assets";
import { useStateContext } from "../../context";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../loader/Loader";
import { logo } from "../../assets";



const Hospitals = () => {
  const { AddHospital, address, contract } = useStateContext();
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    img: "",
    id: "",
  });
  const [clicklogo,setClicklogo]= useState(false);

const handleLogoClick = () => {
  setClicklogo(true);
}

if(clicklogo)
{
  return <Navigate to="/"/>
}

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmitCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await AddHospital(form);
    setForm({
      name: "",
      img: "",
      id: "",
    });
    setLoading(false);
  };

  const handleHospitalCheck = async (e) => {
    try {
      const data = await contract.call("checkHospital", [address]);
      if (data) {
        setClick2(data);
      } else {
        toast.error("Only Authorized Hospital can access this");
      }
    } catch (error) {
      console.log("Internal Server Error", error);
    }
  };

  const handleVerifyClick = () => {
    setClick1(true);
  };

  if (click1) {
    return <Navigate to="/verify" />;
  }

  if (click2) {
    return <Navigate to="/form" />;
  }

  return (
    <div>
      <div className="hospitalHeader">
        <div className="padded-hospitalHeader">
          <div className="h-1-wrapper" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" id="logo123"/>
            <h1 className="text-wrapper">agify</h1>
          </div>
          <div className="h-2-wrapper">
            <div className="p-wrapper">
              <p className="text-wrapper">want to verify someone’s age?</p>
            </div>
          </div>
          <button className="h-3-wrapper" onClick={handleVerifyClick}>
            Click Here
          </button>
        </div>
      </div>
      <div className="hospitalContent">
        {loading && <Loader />} {/* Show loader overlay when loading is true */}
        <div className="hdiv1">
          <div className="subDiv1">
            <h1 className="text-wrapper">
              Enter hospital details to get access from portal owner
            </h1>
          </div>
          <div className="subDiv2">
            <form className="entryform1" onSubmit={handleSubmitCertificate}>
              <div className="formdata1">
                <div className="text1-wrapper">Hospital Name :</div>
                <input
                  className="input-wrapper"
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => handleFormFieldChange("name", e)}
                  required
                />
              </div>
              <div className="formdata1">
                <div className="text1-wrapper">Hospital Id :</div>
                <input
                  className="input-wrapper"
                  type="string"
                  id="id"
                  value={form.id}
                  onChange={(e) => handleFormFieldChange("id", e)}
                  required
                />
              </div>
              <div className="formdata1">
                <div className="text1-wrapper">Hospital Image :</div>
                <input
                  className="input-wrapper"
                  type="text"
                  id="img"
                  value={form.img}
                  onChange={(e) => handleFormFieldChange("img", e)}
                  required
                />
              </div>
              <button type="submit" id="btnSearch9">
                Submit
              </button>
            </form>
          </div>
          <div className="subDiv3">
            <p className="text2-wrapper">
              if already registered, fill the form to generate a new birth
              certificate <Link onClick={handleHospitalCheck} className="link">enter here</Link>
            </p>
          </div>
        </div>
        <div className="hdiv2">
          <div className="subDiv4">
            <img className="img1" src={img1} alt="Your Image" />
          </div>
          <div className="subDiv5">
            <img className="img2" src={img2} alt="Your Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
