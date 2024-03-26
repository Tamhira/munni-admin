import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import Loader from "../components/Loader";

const FeedBackDetailsPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState({});
  const [loading, setLoding] = useState(true);

  const reportRef = doc(database, "reports", id);
  async function getReportData() {
    const data = await getDoc(reportRef);
    setReport(data.data());
    console.log(data.data());
    setLoding(false);
  }
  useEffect(() => {
    getReportData();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="p-5">
        <div className="text-xl font-bold mb-4">Report</div>
        <div className="bg-white rounded-lg p-4">
          <div className="text-gray-500">{report.date}</div>
          <div className="mt-3">{report.detail}</div>
          <div className="mt-3">
            <a
              href={`https://give-umma.vercel.app/details/${report.campaignId}`}
              target="blank"
            >
              <button className="primary px-3 py-1 rounded">Visit campaign</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBackDetailsPage;
