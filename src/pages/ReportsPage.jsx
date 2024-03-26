import React, { useEffect, useState } from "react";
import FeedBackCard from "../components/FeedBackCard"
import { collection, getDocs } from "firebase/firestore"
import { database } from "../utils/firebase"
import Loader from "../components/Loader"
const FeedbackPage = () => {
  
  const [reports, setReports] = useState([])
  const [loading, setLoding] = useState(false)
  const [allReports,setAllReports] = useState([])

  async function getReports() {
    setLoding(true)
    const ref = collection(database, "reports")
    const data = await getDocs(ref)
    setReports(data.docs)
    setLoding(false)
  } 
  useEffect(() => {
    getReports()
  }, [])
  
  
  return (
    <>
      {loading && <Loader/>}
      <div className="p-5">
        <div className="text-xl font-bold">All Reports</div>
        <div className="flex gap-4 py-4">
          <div className="border border-blue-600 cursor-pointer px-5 py-2 rounded-full text-sm hover:text-white hover:bg-blue-600">
            All
          </div>
          <div className="border border-blue-600 cursor-pointer px-5 py-2 rounded-full text-sm hover:text-white hover:bg-blue-600">
            Unread
          </div>
          <div className="border border-blue-600 cursor-pointer px-5 py-2 rounded-full text-sm hover:text-white hover:bg-blue-600">
            Read
          </div>
        </div>
        <div className="shadow-md bg-white rounded-lg overflow-hidden">
          {reports.map((item, index) => {
            return <FeedBackCard key={index} id={item.id} data={item.data()} />;
          })}
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
