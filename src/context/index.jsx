import React, { useContext, createContext } from "react";
import toast from "react-hot-toast";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xD7A0F5c90374CDCc8D9e78654a8af36d13d614c0"
  );
  const { mutateAsync: addHospitalRequest } = useContractWrite(
    contract,
    "addHospitalRequest"
  );
  const { mutateAsync: enterData } = useContractWrite(
    contract,
    "enterData"
  );

  const { mutateAsync: allowHospital } = useContractWrite(
    contract,
    "allowHospital"
  );

  const { mutateAsync: deletePendingRequest } = useContractWrite(
    contract,
    "deletePendingRequest"
  );

  const address = useAddress();
  const connect = useMetamask();
  console.log(address);
  console.log(contract);

  const AddHospital = async (form) => {
    const {name,img,id} = form
    
    try {
      if (name && img && id ) {
        const data = await addHospitalRequest({
          args: [
            name,
            img,
            id,
            address
          ],
        });
        toast.success('Request successful');
        console.log("Hospital Request Details", data);
      } else {
        console.log("Missing required form fields");
      }
    } catch (error) {
      toast.error('Hospital/Account already has access');
      console.log("");
    }
  };
  const EnterData = async (form) => {
    const {name,sex,dob,bid,time,place,motherName,fatherName,hospitalName} = form
    
    try {
      if (name && sex && dob && bid && time && place && motherName && fatherName && hospitalName) {
        const data = await enterData({
          args: [name,sex,time,hospitalName,bid,fatherName,motherName,dob,place,address],
        });

        console.log("User Details Updated", data);
      } else {
        console.log("Missing required form fields");
      }
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const AllowHospital = async (formData) => {
    try {
      console.log(formData.address);
      const data = await allowHospital({ args: [formData.id, formData.address, address] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const DeleteRequest = async (formData) => {
    try {
      console.log(formData);
      const data = await deletePendingRequest({ args: [formData.id, formData.address, address] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }


  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        AddHospital,
        AllowHospital,
        DeleteRequest,
        EnterData,
        // isOwner
        // getPendingRequest,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
