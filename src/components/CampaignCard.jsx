import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { database } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast, { } from "react-hot-toast"

const CampaignCard = ({ data, id, method }) => {
  
  function accept(postId) {
    const campaignRef = doc(database, "campaigns", postId)
    updateDoc(campaignRef, {
      status:"Active"
    })
      .then(updated => {
        toast.success("Campaign accepted")
        method()
      })
    .catch(err=>console.log(err))
  }

  function reject(postId) {
    const campaignRef = doc(database, "campaigns", postId)
    updateDoc(campaignRef, {
      status:"Rejected"
    })
      .then(updated => {
        toast.error("Campaign rejected")
        method()
      })
    .catch(err=>console.log(err))
  }
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform">
      <img
        src={data.campaignImage[0]}
        className="h-[260px] object-cover w-full"
        alt=""
      />
      <div className="p-4 space-y-3">
        <div className="">
         {data.campaignTitle}
        </div>
        <div className="grid grid-cols-2 gap-5 mt">
          <button onClick={()=>accept(id)} className="bg-green-500 text-white py-2 rounded-xl flex items-center justify-center gap-2">
            <FaCheck /> Accept
          </button>
          <button onClick={()=>reject(id)} className="bg-red-500 text-white py-2 rounded-xl flex items-center justify-center gap-2">
            <FaTimes />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
