import { database } from "./firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import moment from "moment";
const Year = moment().startOf("year").year();

const yearLabels = {};

for (let index = Year - 4; index <= Year; index++) {
  yearLabels[index] = 0;
}

export async function getYearlyData() {
  const donationRef = collection(database, "donations");
  const data = await getDocs(
    query(donationRef, where("date", ">=", Year.valueOf()))
  );
  const yearData = data.docs;

  const Summary = {
    totalAmount: { ...yearLabels },
    totalTip: { ...yearLabels },
    totalDonation: { ...yearLabels },
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

    const month = new moment(doc.data().date).year();

    // daily totalAmount
    Summary.totalDonation[month] += amount;

    // daily totalTip
    Summary.totalTip[month] += tip;

    // daily totalAmount = donation = tip
    Summary.totalAmount[month] += donation;
  });

  const weeklyDonationData = {
    labels: Object.keys(yearLabels),
    datasets: [
      {
        label: "Yearly total donation",
        data: Object.values(Summary.totalDonation),
        backgroundColor: "#3b81f6",
      },
    ],
  };
  const weeklyTipData = {
    labels: Object.keys(yearLabels),
    datasets: [
      {
        label: "Yearly total tip",
        data: Object.values(Summary.totalTip),
        backgroundColor: "#3b81f6",
      },
    ],
  };

  const weeklyAmountData = {
    labels: Object.keys(yearLabels),
    datasets: [
      {
        label: "Yearly Total amount",
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
