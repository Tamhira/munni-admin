import { database } from "./firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import moment from "moment";
const Today = moment();
const LastWeek = moment().subtract(6, "days");

const weekLabels = {};
for (let day = LastWeek.date(); day <= Today.date(); day++) {
  weekLabels[day] = 0;
}

export async function getWeeklyData() {
  const donationRef = collection(database, "donations");
  const data = await getDocs(
    query(donationRef, where("date", ">", LastWeek.valueOf()))
  );
  const weekData = data.docs;

  const Summary = {
    totalAmount: { ...weekLabels },
    totalTip: { ...weekLabels },
    totalDonation: { ...weekLabels },
  };

  // amount
  let totalDonation = 0;

  // tip
  let totalTip = 0;

  // sum of tip + donation
  let totalAmount = 0;

  weekData.forEach((doc) => {
    const amount = Number(doc.data().amount);
    const tip = Number(doc.data().tip);
    const donation = amount + tip;

    // donation
    totalDonation += amount;

    // tip
    totalTip += tip;

    const day = moment(doc.data().date).date();
    // daily totalAmount
    Summary.totalDonation[day] += amount;

    // daily totalTip
    Summary.totalTip[day] += tip;

    // daily totalAmount = donation = tip
    Summary.totalAmount[day] += donation;
  });

  const weeklyDonationData = {
    labels: Object.keys(weekLabels),
    datasets: [
      {
        label: "Weekly total donation",
        data: Object.values(Summary.totalDonation),
        backgroundColor: "#3b81f6",
      },
    ],
  };
  const weeklyTipData = {
    labels: Object.keys(weekLabels),
    datasets: [
      {
        label: "Weekly total tip",
        data: Object.values(Summary.totalTip),
        backgroundColor: "#3b81f6",
      },
    ],
  };

  const weeklyAmountData = {
    labels: Object.keys(weekLabels),
    datasets: [
      {
        label: "Weekly Total amount",
        data: Object.values(Summary.totalAmount),
        backgroundColor: "#3b81f6",
      },
    ],
  };

  // total amount = totalDonation + totaltip
  totalAmount = totalDonation + totalTip;

  const donationPercent = (totalDonation / totalAmount) * 100;
  const tipPercent = (totalTip / totalAmount) * 100;

  const chartData = {
    total: weeklyAmountData,
    donation: weeklyDonationData,
    tip: weeklyTipData,
  };

  return {
    totalAmount,
    totalDonation,
    totalTip,
    chartData,
    donationPercent,
    tipPercent,
  };
}
