import React from 'react'
import "./style.css"
import { useStateContext } from '../../context';

const PendingCard = ({name,id,himg,haddress,setIsLoading,isLoading,pendingRequest,setPendingRequest,updated,setUpdated}) => {

  // const [isLoading, setIsLoading] = useState(false);
  const {AllowHospital,DeleteRequest} = useStateContext();
  const handleAcceptBtn = async () => {
  const formData = {
    id: id,
    address: haddress
  };

  try {
    setIsLoading(true);
    console.log("kartik",formData);
    await AllowHospital(formData);
    console.log("tyagi");
    setPendingRequest(pendingRequest.filter(request => request.id !== id))
    console.log(updated);
    setUpdated(!updated);
    console.log(updated);
    setIsLoading(false);
    console.log("Allow Hospital success");
  } catch (error) {
    console.error("Allow Hospital error", error);
  }
};

const handleDeclineBtn = async () => {
  const formData = {
    id: id,
    address: haddress
  };

  try {
    setIsLoading(true);
    await DeleteRequest(formData);
    setPendingRequest(pendingRequest.filter(request => request.id !== id))
    setUpdated(!updated);
    setIsLoading(false);
    console.log("Delete Request success");
  } catch (error) {
    console.error("Delete Request error", error);
  }
};

  return (
    <div className='card-container'>
      <img className='img-card' src={himg} alt="hospital image"/>
      <div className='right-part-card'>
        <h1>{name}</h1>
        <p> Hospital ID: <span>{id}</span></p>
        <div className="pending-card-btn">
          <button className="tick-button size green" onClick={handleAcceptBtn}>
            <span role="img" aria-label="Tick" className="tick-symbol">
              Accept ✔️
            </span>
          </button>
          <button className="cross-button size red" onClick={handleDeclineBtn}>
            <span role="img" aria-label="Cross" className="cross-symbol">
              Decline ❌
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PendingCard
