import React, { useEffect, useState } from "react";
import "./style.css";
import { useStateContext } from "../../context";
import { Navigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { toast } from "react-hot-toast";
import { logo } from "../../assets";

const Forms = () => {
  const { EnterData, contract, address} = useStateContext();
  const [click1, setClick1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    sex: "",
    dob: "",
    bid: "",
    time: "",
    place: "",
    motherName: "",
    fatherName: "",
    hospitalName: "",
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleVerifyClick = () => {
    setClick1(true);
  };

  if (click1) {
    return <Navigate to="/verify" />;
  }

  const handlebtnClick = async () => {
    try {
      const data1 = await contract.call("checkRegistration",[form.bid]);
      const data2 = await contract.call("checkHospital", [address]);
      if(!data1 && data2){
      setLoading(true);
      await EnterData(form);
      setForm({
        name: "",
        sex: "",
        dob: "",
        bid: "",
        time: "",
        place: "",
        motherName: "",
        fatherName: "",
        hospitalName: "",
      });
      setLoading(false);}
      else if(data1){
        toast.error("Data already exist for this Registration No");
      }
      else if(!data2){
        toast.error("Not Authoried to enter data");
      }
    } catch (error) {
      console.log("Internal error: ",error);
    }
  };

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
      {loading && <Loader />}
      <div className="formConter">
        <div className="formHeading">
          <h1 className="form-text-wrapper">Enter details of new born child</h1>
        </div>
        <div className="form-content">
          <form className="entryform2" onSubmit={handleSubmit}>
            <div className="formdata2">
              <input
                className="input-formdata2"
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => handleFormFieldChange("name", e)}
                placeholder="Name :"
                required
              />
            </div>
            <div className="formdata2">
              <select
                className="input-formdata_2"
                id="sex"
                value={form.sex}
                onChange={(e) => handleFormFieldChange("sex", e)}
                required
              >
                <option value="">Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="formdata2">
              <input
                className="input-formdata2"
                type="date"
                id="dob"
                value={form.dob}
                onChange={(e) => handleFormFieldChange("dob", e)}
                required
              />
            </div>
            <div className="formdata2">
              <input
                className="input-formdata2"
                type="text"
                id="bid"
                value={form.bid}
                onChange={(e) => handleFormFieldChange("bid", e)}
                placeholder="Registration No :"
                required
              />
            </div>
            <div className="formdata2">
              <input
                className="input-formdata2"
                type="time"
                id="time"
                value={form.time}
                onChange={(e) => handleFormFieldChange("time", e)}
                required
              />
            </div>
            <div className="formdata2">
              <input
                className="input-formdata2"
                type="text"
                id="place"
                value={form.place}
                onChange={(e) => handleFormFieldChange("place", e)}
                placeholder="Place Of Birth :"
                required
              />
            </div>
            <div className="formdata2">
              <input
                className="input-formdata2"
                type="text"
                id="motherName"
                value={form.motherName}
                onChange={(e) => handleFormFieldChange("motherName", e)}
                placeholder="Mother's Name :"
                required
              />
            </div>
            <div className="formdata2">
              <input
                className="input-formdata2"
                type="text"
                id="fatherName"
                value={form.fatherName}
                onChange={(e) => handleFormFieldChange("fatherName", e)}
                placeholder="Father's Name :"
                required
              />
            </div>
            <div className="formdata2">
              <input
                className="input-formdata2"
                type="text"
                id="hospitalName"
                value={form.hospitalName}
                onChange={(e) => handleFormFieldChange("hospitalName", e)}
                placeholder="Hospital Name :"
                required
              />
            </div>
            <button
              onClick={handlebtnClick}
              className="btnSearch1"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forms;
