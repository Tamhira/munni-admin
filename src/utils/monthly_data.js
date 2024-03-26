import { database } from "./firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import moment from "moment";
const Year = moment().startOf("year").valueOf();

const monthLabels = {};

for (let index = 1; index <= 12; index++) {
  monthLabels[index] = 0;
}

export async function getMonthlyData() {
  const donationRef = collection(database, "donations");
  const data = await getDocs(query(donationRef, where("date", ">=", Year)));
  const yearData = data.docs;

  const Summary = {
    totalAmount: { ...monthLabels },
    totalTip: { ...monthLabels },
    totalDonation: { ...monthLabels },
  };

  // amount
  let totalDonation = 0;

  // tip
  let totalTip = 0;

  // sum of tip + donation
  let totalAmount = 0;

  yearData.forEach((doc) => {
    const amount = Number(doc.data().amount);
    const tip = Number(doc.data().tip);
    const donation = amount + tip;

    // donation
    totalDonation += amount;

    // tip
    totalTip += tip;

    const month = moment(doc.data().date).month() + 1;

    // daily totalAmount
    Summary.totalDonation[month] += amount;

    // daily totalTip
    Summary.totalTip[month] += tip;

    // daily totalAmount = donation = tip
    Summary.totalAmount[month] += donation;
  });

  const weeklyDonationData = {
    labels: Object.keys(monthLabels),
    datasets: [
      {
        label: "Monthly total donation",
        data: Object.values(Summary.totalDonation),
        backgroundColor: "#3b81f6",
      },
    ],
  };
  const weeklyTipData = {
    labels: Object.keys(monthLabels),
    datasets: [
      {
        label: "Monthly total tip",
        data: Object.values(Summary.totalTip),
        backgroundColor: "#3b81f6",
      },
    ],
  };

  const weeklyAmountData = {
    labels: Object.keys(monthLabels),
    datasets: [
      {
        label: "Monthly Total amount",
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
