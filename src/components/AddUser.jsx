import React, { useState } from "react";
import style from "../assets/users.module.css";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../utils/firebase";
import { toast } from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";

const AddUser = ({ controller, method }) => {
  const [add, setAdd] = controller;
  const { register, handleSubmit } = useForm();
  const [adding, setAdding] = useState(false);

  async function handleData(d) {
    setAdding(true);
    const ref = collection(database, "admins");
    await addDoc(ref, d)
      .then(() => {
        toast.success("User added");
        method();
        setAdd(false);
        setAdding(false);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div
      className={`fixed bg-black inset-0 z-10 ${style.overlay} grid place-items-center`}
    >
      <div className="w-[32%] bg-white rounded p-4 animate__animated animate__bounceIn">
        <div className="text-xl font-bold mb-3">Add a user</div>
        <form onSubmit={handleSubmit(handleData)}>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full name"
              className="border border-gray-200 w-full p-3 rounded-lg"
              {...register("fullName")}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-200 w-full p-3 rounded-lg"
              {...register("username")}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-200 w-full p-3 rounded-lg"
              {...register("password")}
              required
            />
            <button className="bg-black w-full text-white p-2 rounded-lg flex justify-center" disabled={adding}>
              {adding ? (
                <SpinnerCircular size={30} color="white" />
              ) : (
                "Add user"
              )}
            </button>

            <div
              className="text-center cursor-pointer"
              onClick={() => setAdd(false)}
            >
              Close
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
