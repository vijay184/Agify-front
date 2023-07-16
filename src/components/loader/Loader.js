import React from 'react';
import { loader } from '../../assets';
import './style.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <img src={loader} alt="loader" className="loader" />
        <p className="loader-text">Transaction is in progress<br />Please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
