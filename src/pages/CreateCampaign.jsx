import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowRight, BsX } from "react-icons/bs";
import { database, storage } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { SpinnerCircular } from "spinners-react";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function saveImage() {
    const storageRef = ref(storage, `images/${image.name}`);
    const upload = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    return url;
  }

  async function createCampaign(data) {
    setLoading(true);
    data.url = await saveImage();
    data.raisedAmount = 0;
    const ref = collection(database, "campaigns");
    await addDoc(ref, data);
    setLoading(false);
    navigate("/campaigns");
  }
  return (
    <div className="px-6">
      <div className="text-xl font-bold">Create a new campaign</div>
      <div className="w-[min(600px,98%)]">
        <form
          onSubmit={handleSubmit(createCampaign)}
          className="grid gap-y-2 mt-4"
        >
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
          {!image ? (
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop campaign Image
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  required
                />
              </label>
            </div>
          ) : (
            <div className="relative">
              <div
                className="absolute top-2 left-2 bg-black text-white p-1 rounded-full cursor-pointer"
                onClick={() => setImage(null)}
              >
                <BsX />
              </div>
              <img
                src={URL.createObjectURL(image)}
                className="w-full h-[360px] rounded-md object-cover"
                alt=""
              />
            </div>
          )}

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
            <button
              disabled
              className="disabled:bg-gray-600 w-max bg-black text-white flex items-center gap-2 mb-12 px-3 py-2 rounded-full"
            >
              Creating campaign
              <SpinnerCircular color="white" secondaryColor="gray" size={20} />
            </button>
          ) : (
            <button className="w-max bg-black text-white flex items-center gap-2 mb-12 px-3 py-2 rounded-full">
              Create <BsArrowRight />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
