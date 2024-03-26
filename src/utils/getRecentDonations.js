import { collection, getDocs } from "firebase/firestore";
import { database } from "./firebase";

export async function getRecentDonations() {
  const donationsRef = collection(database, "donations");
  const donationsData = await getDocs(donationsRef);
  return donationsData.docs;
}
