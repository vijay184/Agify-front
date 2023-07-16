import React, { useState, useEffect } from "react";
import "./style.css";
import { useStateContext } from "../../context";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { logo } from "../../assets";

const Verify = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const { contract } = useStateContext();
  const [user, setUser] = useState([]);
  const [clicklogo,setClicklogo]= useState(false);

  const handleLogoClick = () => {
    setClicklogo(true);
  }

  const fetchUserData = async () => {
    if (contract) {
      try {
        setIsLoading(true);
        const data = await contract.call("getData", [searchInput]);
        console.log(data);
        setUser(data);

        setIsLoading(false);
        // console.log(pendingRequest);
      } catch (error) {
        // Check if the error message contains the revert reason
        console.log("Cannot Fetch Pending Request");
      }
    }
  };

  const handleSearchClick = () => {
    console.log(searchInput);
    fetchUserData();
  };

  useEffect(() => {
    setUser([]);
  }, []);

  useEffect(() => {
    if (user && user.name === "") {
      setShowCertificate(false);
      toast.error("No Data for this ID exists!");
    } else {
      setShowCertificate(true);
    }
  }, [user]);

  if(clicklogo)
  {
    return <Navigate to="/"/>
  }

  return (
    <div className="full-page">
      <div className="nav-bar">
        <div className="padded-navbar">
          <div className="newlogo" onClick={handleLogoClick}>
            <img src={logo} alt="Logo" id="logo123" />
            <h1 className="heading">agify</h1>
          </div>
          <div class="input-with-button">
            <input
              type="text"
              className="input-field"
              placeholder="Enter certificate ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <button class="input-button" onClick={handleSearchClick}>
              Find Details
            </button>
          </div>
        </div>
      </div>
      <div className="main-content">
        {isLoading ? (
          <div className="skeleton-card">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text-1"></div>
            <div className="display">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="display">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="display">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="display">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="display">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="display">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="display">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="display">
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ) : (
          <div>
            {showCertificate && user.length !== 0 && (
              <div class="certificate">
                <h1>Certificate of Birth</h1>
                <div className="detail">
                  <div>
                    This is to certify that the following information has been
                    extracted
                  </div>
                  <div>
                    from the original record of Birth, which is in {user.place},
                    India.
                  </div>
                </div>
                <hr />
                <div className="div1">
                  <div className="div2">
                    <p>
                      <span className="info-label">Name :</span>
                      <span className="info">{user.name}</span>
                    </p>
                    <p>
                      <span className="info-label">Sex :</span>
                      <span className="info">{user.sex}</span>
                    </p>
                    <p>
                      <span className="info-label">Date of Birth :</span>
                      <span className="info">{user.dob}</span>
                    </p>
                    <p>
                      <span className="info-label">Time of Birth :</span>
                      <span className="info">{user.time}</span>
                    </p>
                    <p>
                      <span className="info-label">Registration No :</span>
                      <span className="info">{user.id}</span>
                    </p>
                    <p>
                      <span className="info-label">Place of Birth :</span>
                      <span className="info">{user.place}</span>
                    </p>
                    <p>
                      <span className="info-label">Hospital Name :</span>
                      <span className="info">{user.hname}</span>
                    </p>
                    <p>
                      <span className="info-label">Name of Mother :</span>
                      <span className="info">{user.mname}</span>
                    </p>
                    <p>
                      <span className="info-label">Name of Father :</span>
                      <span className="info">{user.fname}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
