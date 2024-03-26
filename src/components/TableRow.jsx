import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { database } from "../utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const TableRow = ({ data,id,method }) => {
  const [options, setOptions] = useState(false)

  function deleteUser() {
    const consent = confirm(`Are you sure you want to delete ${data.fullName}'s account?`)
    if (consent) {
      const docRef = doc(database, "admins", id)
      deleteDoc(docRef)
        .then(() => {
          toast.success("Account deleted")
          method()
        })
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 bg-white border-t">
        <div className="p-4 border-r">{data.fullName}</div>
        <div className="p-4 border-r">{data.username}</div>
        <div className="p-4 border-r relative flex items-center justify-between">
          {data.password}{" "}
          <BsThreeDots
            className="cursor-pointer"
            onClick={() => setOptions(!options)}
          />
          {options && (
            <div className="select-none absolute z-10 overflow-hidden rounded-lg right-3 top-8 bg-white shadow-lg">
              <Link to={`/edit/${id}`}>
                <div className="py-1 px-5 text-sm border-b cursor-pointer hover:bg-gray-100">
                  Edit
                </div>
              </Link>
              <div
                className="py-1 px-5 text-sm cursor-pointer text-red-500  hover:bg-gray-100"
                onClick={deleteUser}
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TableRow;
