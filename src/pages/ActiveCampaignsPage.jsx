import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../utils/firebase";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";
import ActiveCampaignCard from "../components/ActiveCampaignCard";
import { IoReload } from "react-icons/io5";

const ActiveCampaignsPage = () => {
  const data = useState(null);
  const campaignsRef = collection(database, "campaigns");
  const [campaigns, setCampaigns] = useState([]);
  async function getCampaigns() {
    const data = await getDocs(campaignsRef);
    setCampaigns(data.docs);
  }
  useEffect(() => {
    getCampaigns();
  }, []);
  return (
    <>
      <Toaster />
      <div className="p-5 h-[100dvh] overflow-scroll">
        <div className="text-xl font-bold mb-4 flex justify-between items-center">
          <div>All campaigns </div>
          <IoReload className="cursor-pointer text-gray-600" />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4 py-2">
          {campaigns.map((item, index) => {
            return <ActiveCampaignCard data={item.data()} key={index} id={item.id} />;
          })}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4"></div>
      </div>
    </>
  );
};

export default ActiveCampaignsPage;
