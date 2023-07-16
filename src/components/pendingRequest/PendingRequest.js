import React, { useState,useEffect } from "react";
import "./style.css";
import { useStateContext } from "../../context";
import PendingCard from "../pendingcard/PendingCard";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { logo } from "../../assets";

const PendingRequest = () => {
  const { contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [updated,setUpdated] = useState(false);
  const [clicklogo,setClicklogo]= useState(false);

  const handleLogoClick = () => {
    setClicklogo(true);
  }

  useEffect(() => {
    if(contract) {
      handleOwnerClick();}
  },[contract,address]);

  useEffect(() => {
    console.log(updated);
    if(contract) {
      fetchPendingRequest();}
    console.log(contract);
  },[contract,address,updated]);

  

  const handleOwnerClick = async () => {
    try {
      const data = await contract.call("checkOwner",[address]);
      
      if (!data) {
        console.log("mohit");
        setClick2(true);
        toast.error("You are not authorized");
      }
    } catch (error) {
      console.log("Internal Server Error:", error);
    }
  };

  const fetchPendingRequest = async () => {
    try {
      setIsLoading(true);
      const data = await contract.call("getPendingRequest", [address]);
      
      console.log(data);
      setPendingRequest(data);
      console.log(pendingRequest);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      // Check if the error message contains the revert reason
      console.log("Cannot Fetch Pending Request");
  }
  };

  

  const handleVerifyClick = () => {
    setClick1(true);
  };

  if(clicklogo)
  {
    return <Navigate to="/"/>
  }

  if(click1){
    return <Navigate to='/verify' />;
  }

  if(click2){
      return <Navigate to='/' />;
    }

  return (
    <div className="main-container">
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
      <h1 id="pheader"> Pending Requests</h1>
      {isLoading ? (
        <div className="card-container-pending-request">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-container">
              <div className="skeleton-image"></div>
              <div className="right-part-card">
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="pending-card-btn">
                  <div className="skeleton-btn"></div>
                  <div className="skeleton-btn"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {pendingRequest.length > 0 ? ( <div className="card-container-pending-request">
            {pendingRequest &&
              pendingRequest.map((request, i) => (
                <PendingCard
                  key={i}
                  name={request.hname}
                  id={request.hid}
                  himg={request.img}
                  haddress={request.haddress}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  pendingRequest={pendingRequest}
                  setPendingRequest={setPendingRequest}
                  updated={updated}
                  setUpdated = {setUpdated}
                  
                  />
              ))}
          </div>):(
            <h1 id="nopending">There is no pending request right now ...</h1>
          )}
          </>
      )}
    </div>
  );
};

export default PendingRequest;
