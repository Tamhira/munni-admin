import React, { useEffect,useState } from "react";
import CampaignCard from "../components/CampaignCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../utils/firebase";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";

const RequestsPage = () => {

  const campaignsRef = collection(database, "campaigns")
  const [allCampaigns, setAllCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  
  async function getCampaigns() {
    const q = query(campaignsRef, where("status", "==", "Pending"))
    const data = await getDocs(q)
    setAllCampaigns(data.docs)
    setLoading(false)
  }
  useEffect(() => {
    getCampaigns()
  },[])

  return (
    <>
      {loading && <Loader />}
      <Toaster />
      <div className="p-5 h-[100dvh] overflow-scroll">
        <div className="text-xl font-bold mb-4">Campaign creation requests</div>
        {allCampaigns == "" && (
          <div className="text-xl font-bold text-gray-500 grid place-items-center h-[80vh] rounded-lg text-center">
            No new campaign requests found
          </div>
        )}
        <div className="grid grid-cols-3 gap-4">
          {allCampaigns.map((item, index) => {
            return (
              <CampaignCard
                method={getCampaigns}
                data={item.data()}
                key={item.id}
                id={item.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RequestsPage;
