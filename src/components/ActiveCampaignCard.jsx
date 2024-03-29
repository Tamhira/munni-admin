import { Link } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import EditCampaign from "../pages/EditCampaign";
import { database } from "../utils/firebase";

const ActiveCampaignCard = ({ data,id }) => {
  console.log(data);
  const [deleteButton, setDeleteButton] = useState(false);

  // const ref = collection(database, "donations");
  // const [donations, setDonations] = useState([]);
  // const [raised, setRaised] = useState(0);
  // useEffect(() => {
  //   async function getData() {
  //     const q = query(ref, where("campaignId", "==", id));  //     const data = await getDocs(q);
  //     setDonations(data.docs);
  //     setRaised(data.docs.reduce((c, n) => +c + +n.data().amount, 0));
  //   }
  //   getData();
  // }, []);

  return (
    // <Link to="">
    <>
      <div className="bg-white relative rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform">
        <div className="flex absolute gap-2 top-2 left-2"></div>

        <img src={data?.url} className="h-[260px] object-cover w-full" alt="" />

        <div className="p-4 space-y-3">
          <div className="">{data?.title}</div>
          <div className="w-full bg-gray-200 h-1 overflow-hidden">
            <div
              className="h-1 primary"
              style={{
                width: (data?.raisedAmount / data?.goalAmount) * 100 + "%",
              }}
            ></div>
          </div>
          <div className="flex items-center">
            <div>
              <div className="font-semibold text-xl">
                ₹ {data?.raisedAmount}
              </div>
              <div className="text-sm text-gray-500">
                funded of ₹ {data?.goalAmount}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-2 pt-0 p-4">
          <Link
            to={`/editCampaign/${id}`}
            state={{ data }}  // Pass data as a prop here
            className="w-1/2 bg-blue-500 rounded-full text-center cursor-pointer"
          >
            <button className="py-2 text-white text-lg font-semibold" >
              Edit
            </button>
          </Link>

          <div
            className="w-1/2 bg-red-500 rounded-full text-center cursor-pointer"
            onClick={() => setDeleteButton(!deleteButton)}
          >
            <button className=" py-2 text-white text-lg font-semibold">
              Delete
            </button>
          </div>
        </div>
      </div>
      {deleteButton && <DeleteConfirmation />}
    </>
    // </Link>
  );
};

export default ActiveCampaignCard;
