import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { database } from "./firebase";

export const getTrendingCampaigns = async() => {
  const campaignsRef = collection(database, "campaigns");
  return getDocs(
    query(
      campaignsRef,
      where("status", "==", "Active"),
      orderBy("goalAmount", "desc"),
      limit(10)
    )
  ).then((data) => {
    return data.docs;
  });
};
