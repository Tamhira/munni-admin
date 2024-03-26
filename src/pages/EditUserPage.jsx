import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../utils/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";

const EditUserPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const docRef = doc(database, "admins", id);
  const navigate = useNavigate();

  function updateData(d) {
    updateDoc(docRef, d)
      .then(() => {
        toast.success("User updated");
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
        toast.err("Cannot update user at the moment");
      });
  }
  async function getData() {
    setLoading(true);
    let data = await getDoc(docRef);
    let formData = data.data();
    setValue("fullName", formData.fullName);
    setValue("username", formData.username);
    setValue("password", formData.password);
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Toaster />
      <div className="p-5">
        <div className="text-xl font-bold mb-4">Edit User</div>
        <div className="max-w-[40%]">
          <form onSubmit={handleSubmit(updateData)}>
            <input
              {...register("fullName")}
              type="text"
              className="w-full p-2 mb-3 shadow-sm rounded-md"
              placeholder="Full name"
            />
            <input
              {...register("username")}
              type="text"
              className="w-full p-2 mb-3 shadow-sm rounded-md"
              placeholder="Username"
            />
            <input
              {...register("password")}
              type="text"
              className="w-full p-2 mb-3 shadow-sm rounded-md"
              placeholder="Password"
            />
            <button className="primary px-6 text-sm rounded-md py-2">
              Save
            </button>
          </form>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default EditUserPage;
