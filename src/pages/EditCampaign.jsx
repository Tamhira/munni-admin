import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../utils/firebase";
import { BsArrowRight, BsX } from "react-icons/bs";
import { SpinnerCircular } from "spinners-react";

const EditCampaign = () => {
  const location = useLocation();
  const campaignData = location.state?.data;
  const { id } = useParams();
  const { register, handleSubmit } = useForm({
    defaultValues: campaignData // Set default values using campaignData
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function updateCampaign(data) {
    setLoading(true);
    try {
      // Construct the reference to the specific document to update
      const campaignRef = doc(database, "campaigns", id);
      // Update the document with the new data
      await updateDoc(campaignRef, data);
      setLoading(false);
      navigate("/campaigns"); // Redirect to campaigns page after successful update
    } catch (error) {
      console.error("Error updating campaign document: ", error);
      setLoading(false);
    }
  }

  return (
    <div className="px-6">
      <div className="text-xl font-bold">Edit campaign</div>
      <div className="w-[min(600px,98%)]">
        <form onSubmit={handleSubmit(updateCampaign)} className="grid gap-y-2 mt-4">
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
              Updating campaign
              <SpinnerCircular color="white" secondaryColor="gray" size={20} />
            </button>
          ) : (
          <button className="w-max bg-black text-white flex items-center gap-2 mb-12 px-3 py-2 rounded-full">
            Edit  <BsArrowRight />
          </button>)}
        </form>
      </div>
    </div>
  );
};

export default EditCampaign;
