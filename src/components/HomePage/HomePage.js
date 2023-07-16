import React, { useState } from "react";
import "./style1.css";
import { useStateContext } from "../../context";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logo } from "../../assets";

export default function HomePage() {
  const { address, contract } = useStateContext();
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);

  const [clicklogo,setClicklogo]= useState(false);

const handleLogoClick = () => {
  setClicklogo(true);
}

if(clicklogo)
{
  return <Navigate to="/"/>
}

  const handleVerifyClick = () => {
    setClick1(true);
  };

  const handleOwnerClick = async () => {
    try {
      const data = await contract.call("checkOwner",[address]);
      console.log("kartik", data)
      if (data) {
        console.log("tyagi")
        setClick2(true);
      } else {
        toast.error("Only owner can access this page");
      }
    } catch (error) {
      console.log("Internal Server Error:", error);
    }
  };

  const handleHospitalClick = () => {
    setClick3(true);
  };

  if (click1) {
    return <Navigate to="/verify" />;
  }

  if (click2) {
    return <Navigate to="/pending" />;
  }

  if (click3) {
    return <Navigate to="/hospital" />;
  }
  return (
    <div>
      <div className="hospitalHeader">
        <div className="padded-hospitalHeader">
          <div className="h-1-wrapper" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" id="logo123"/>
            <h1 className="text-wrapper">agify</h1>
          </div>
          <div className="h-2-wrapper" >
            <div className="p-wrapper">
              <p className="text-wrapper">want to verify someone’s age?</p>
            </div>
          </div>
          <button className="h-3-wrapper" onClick={handleVerifyClick}>
            Click Here
          </button>
        </div>
      </div>
      <div className="homelayer2">
        <div className="howner">Are you an owner?</div>
        <button type="button" class="hownerbtn" onClick={handleOwnerClick}>
          Click Here
        </button>
        <img
          className="imgelement"
          alt="Element"
          src="data:image/png;base64,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"
        />
      </div>
      <div className="homelayer3">
        <div className="hospt">Are you accessing from a hospital?</div>
       <button type="button" class="hosptbtn" onClick={handleHospitalClick}>
          Click Here
        </button>
        <img
          className="imgelement"
          alt="Element"
          src="https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
        />
      </div>
    </div>
  );
}
