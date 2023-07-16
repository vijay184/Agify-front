import React,{useState} from "react";
import "./style.css";
import { useStateContext } from "../../context";
import { Navigate } from "react-router-dom";
import { img3 } from "../../assets";
import { logo } from "../../assets";

const LandingPage = () => {
  const { address, connect } = useStateContext();
  const [clicked,setClicked] = useState(false);
  const [click,setClick] = useState(false);
  
  const handleVerifyClick = () =>{
    console.log("verify");
    setClicked(true);
  };

  const handleClick = () => {
    setClick(true);
  };

  if (click) {
    if (address) return <Navigate to={"/home"} />;
    else connect();
  }

  if(clicked){
    return <Navigate to={"/verify"}/>
  }
  return (
    <div className='full-page'>
        <div className="hospitalHeader">
        <div className="padded-hospitalHeader">
          
          <div className="h-1-wrapper">
          <img src={logo} alt="Logo" id="logo123"/>
            <h1 className="text-wrapper">agify</h1>
          </div>
          <div className="h-2-wrapper">
            <div className="p-wrapper1">
              <p className="text-wrapper">are you an admin or a hospital?</p>
            </div>
          </div>
          <button className="h-3-wrapper" onClick={handleClick}>
            Click Here
          </button>
        </div>
      </div>
        <div className="main-content">
          <div className="padded-main-content">
            <img className="img-landingPage" src={img3} alt="Image"/>
            <h1 id="title"><span id="title-green">agify</span> - where your identity is reclaimed</h1>
            <p style={{fontSize: "1.4rem", textAlign:"center"}}>Unlock your birth certificate with a simple registration number!<br></br> Seamlessly retrieve your birth certificate and reconnect with your roots. </p>
            <button className="input-btn" onClick={handleVerifyClick}>Find Details</button>
          </div>
        </div>
        
    </div>
  );
};

export default LandingPage;