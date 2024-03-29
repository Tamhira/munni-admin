"use client";
import React from "react";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteConfirmation() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 grid place-items-center">
          <div className="bg-white relative rounded-md w-[min(440px,96%)] p-4 border-gray-300 border-2">
            {/* <div className="pt-4 px-4 text-2xl text-white">
              <MdOutlineCancel onClick={() => setIsVisible(false)} />
            </div> */}

            <div className="text-lg font-medium text-center  pb-2">
              Are you sure you want to delete this campaign?
            </div>

            <div className="text-sm">
              Deleting this campaign will remove all associated data and cannot
              be undone.
            </div>

            <div className="flex items-center gap-2 justify-center text-center text-white pt-8 text-md font-semibold float-end pb-2">
              <div className="bg-blue-500 px-6 py-2 rounded-full cursor-pointer" onClick={() => setIsVisible(false)}>Cancel</div>
              <div className="bg-red-500 px-6 py-2 rounded-full cursor-pointer">Delete</div>
            </div>
{/* 
            <div className="flex items-center gap-2 justify-center text-lg text-center text-red-700 font-bold p-3">
              <AiOutlineDelete />
              Remove Current Photo
            </div> */}

          </div>
        </div>
      )}
    </>
  );
}
export default DeleteConfirmation;
