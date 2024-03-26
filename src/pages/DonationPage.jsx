import { collection, getDocs } from "firebase/firestore";
import { database } from "../utils/firebase";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import moment from "moment";

const DonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading,setLoading] = useState(false)

  async function getData() {
    setLoading(true)
    const data = await getDocs(collection(database, "donations"));
    setDonations(data.docs);
    setLoading(false)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="p-5">
        <div className="text-xl font-bold">All donations</div>
        <div className="overflow-x-auto">
          <table className="bg-white border-none mt-4 overflow-x-auto table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Tip</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>View campaign</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((item) => {
                return (
                  <tr>
                    <td className="">{item.data().name || "NA"}</td>
                    <td className="text-black">{moment(item.data().date).format("DD-MM-YYYY")}</td>
                    <td>{item.data().amount}</td>
                    <td>{item.data().tip}</td>
                    <td>{item.data().email || "NA"}</td>
                    <td>{item.data().mobile || "NA"}</td>
                    <td>
                      <a href="">View campaign</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DonationPage;
