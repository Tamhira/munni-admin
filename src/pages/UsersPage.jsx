import React, { useEffect, useState } from "react";
import TableRow from "../components/TableRow";
import Loader from "../components/Loader"
import AddUser from "../components/AddUser";
import { Toaster } from "react-hot-toast";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../utils/firebase";

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getUsers() {
    const ref = collection(database, "admins");
    const users = await getDocs(ref);
    setAllUsers(users.docs);
    setLoading(false)
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Toaster />
      <div className="p-5 h-[100dvh] overflow-scroll">
        <div className="mb-4 flex justify-between itens-center">
          <span className="text-xl font-bold">All Users</span>{" "}
          <button
            onClick={() => setAdd(true)}
            className="border bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            Add user
          </button>
        </div>
        <div className="rounded-lg">
          <div className="grid grid-cols-3 font-medium bg-white">
            <div className="p-4 border-r">Full name</div>
            <div className="p-4 border-r">User name</div>
            <div className="p-4 border-r">Password</div>
          </div>
          {allUsers.map((item) => (
            <TableRow
              data={item.data()}
              key={item.id}
              id={item.id}
              method={getUsers}
            />
          ))}
        </div>
      </div>
      {add && <AddUser controller={[add, setAdd]} method={getUsers} />}
    </>
  );
};

export default UsersPage;
