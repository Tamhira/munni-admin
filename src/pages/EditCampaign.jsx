import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowRight, BsX } from "react-icons/bs";
import { database, storage } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { SpinnerCircular } from "spinners-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditCampaign = () => {
  const location = useLocation();
  const campaignData = location.state?.data;
  const { id } = useParams();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: campaignData // Set default values using campaignData
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function createCampaign(data) {
    setLoading(true);
    // data.url = await saveImage(); // You can uncomment this line if you're using it
    data.raisedAmount = 0;
    const ref = collection(database, "campaigns");
    await addDoc(ref, data);
    setLoading(false);
    navigate("/campaigns");
  }

  return (
    <div className="px-6">
      <div className="text-xl font-bold">Edit campaign</div>
      <div className="w-[min(600px,98%)]">
        <form onSubmit={handleSubmit(createCampaign)} className="grid gap-y-2 mt-4">
          <div>Basic details</div>
          <input
            type="text"
            placeholder="Campaign title"
            className="w-full rounded p-2 border"
            {...register("title")}
            required
          />
          <input
            type="text"
            placeholder="Campaign category"
            className="w-full rounded p-2 border"
            {...register("category")}
            required
          />
          <textarea
            className="w-full border rounded p-3"
            placeholder="Campaign story"
            id=""
            cols="30"
            rows="10"
            {...register("story")}
            required
          ></textarea>
          <div>Benificiary details</div>
          <input
            type="text"
            placeholder="Benificiary name"
            className="w-full rounded p-2 border"
            {...register("benificiaryName")}
            required
          />
          <input
            type="text"
            placeholder="Benificiary email"
            className="w-full rounded p-2 border"
            {...register("benificiaryEmail")}
            required
          />
          <input
            type="text"
            placeholder="Benificiary phone"
            className="w-full rounded p-2 border"
            {...register("benificiaryPhone")}
            required
          />
          <div>Financial details</div>
          <input
            type="text"
            placeholder="Required amount"
            className="w-full rounded p-2 border"
            {...register("goalAmount")}
            required
          />
          <div>Campaign end date</div>
          <input
            type="date"
            className="w-full rounded p-2 border"
            {...register("endDate")}
            required
          />
          {loading ? (
            <button disabled className="disabled:bg-gray-600 w-max bg-black text-white flex items-center gap-2 mb-12 px-3 py-2 rounded-full">
              Creating campaign
              <SpinnerCircular color="white" secondaryColor="gray" size={20} />
            </button>
          ) : (
            <button className="w-max bg-black text-white flex items-center gap-2 mb-12 px-3 py-2 rounded-full">
              Edit <BsArrowRight />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditCampaign;
