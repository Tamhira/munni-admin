import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../utils/firebase";
import { INRFormat } from "../utils/rupees_format";
import { IoMdTrendingUp } from "react-icons/io";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { lazy, useEffect, useState } from "react";
import { getWeeklyData } from "../utils/weekly_data";
import { getMonthlyData } from "../utils/monthly_data";
import { getYearlyData } from "../utils/yearly_data";
import { getTrendingCampaigns } from "../utils/getTrendingCampaigns";
import moment from "moment";
import { BsClockHistory } from "react-icons/bs";
import { getRecentDonations } from "../utils/getRecentDonations";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const HomePage = () => {
  const barPlaceholder = {
    labels: [24, 25, 26, 27, 28, 29, 30],
    datasets: [
      {
        label: "Weekly data",
        data: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
        backgroundColor: "#ddd",
      },
    ],
  };

  const [isLoading, setIsLoading] = useState(false);

  const [amountData, setAmountData] = useState({});

  // amountData destructering
  const { totalAmount, totalDonation, totalTip, donationPercent, tipPercent } =
    amountData;

  const [weeklySummary, setWeeklySummary] = useState(barPlaceholder);

  const filters = {
    weekly: weeklySummary,
    monthly: weeklySummary,
    yearly: weeklySummary,
  };

  const [dataFilter, setDataFilter] = useState("weekly");

  const options = {};

  const piePlaceholder = {
    labels: ["Donation", "Tip"],
    datasets: [
      {
        data: isLoading ? [75, 25] : [donationPercent, tipPercent],
        backgroundColor: isLoading
          ? ["#ddd", "#aaa"]
          : ["#3b81f6", "lightskyblue"],
      },
    ],
  };

  const amountStats = [
    {
      title: "Total amount recieved",
      value: totalAmount,
      data: filters[dataFilter].total ?? barPlaceholder,
    },
    {
      title: "Total amount for donation",
      value: totalDonation,
      data: filters[dataFilter].donation ?? barPlaceholder,
    },
    {
      title: "Total amount for tip",
      value: totalTip,
      data: filters[dataFilter].tip ?? barPlaceholder,
    },
    piePlaceholder,
  ];

  // const transactionStats = [
  //   {
  //     title: "Total transaction initiated",
  //     value: Math.random(9999) * 100000,
  //     data: dataFilter,
  //   },
  //   {
  //     title: "Total successful transaction",
  //     value: Math.random(9999) * 100000,
  //     data: dataFilter,
  //   },
  //   {
  //     title: "Total unsuccessful transaction",
  //     value: Math.random(9999) * 100000,
  //     data: dataFilter,
  //   },
  //   {
  //     labels: ["Successful", "Unsuccessful"],
  //     datasets: [
  //       {
  //         data: [90, 10],
  //         backgroundColor: ["#3b81f6", "lightskyblue"],
  //       },
  //     ],
  //   },
  // ];

  function getData(filter) {
    setIsLoading(true);
    filter()
      .then((data) => {
        setAmountData(data);
        setWeeklySummary(data.chartData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const dataFilterFuntions = {
    weekly: getWeeklyData,
    monthly: getMonthlyData,
    yearly: getYearlyData,
  };

  useEffect(() => {
    getData(dataFilterFuntions[dataFilter]);
  }, [dataFilter]);

  const [trendingData, setTrendingData] = useState(null);
  const [recentDonations, setRecentDonations] = useState(null);
  useEffect(() => {
    getTrendingCampaigns().then(setTrendingData);
    getRecentDonations().then(setRecentDonations);
    // console.log(recentDonations);
  }, []);


  //fetching data
  const data = useState(null);
  const campaignsRef = collection(database, "campaigns");
  const [campaigns, setCampaigns] = useState([]);
  async function getCampaigns() {
    const data = await getDocs(campaignsRef);
    setCampaigns(data.docs);
  }
  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-base">
              <th></th>
              <th>Title</th>
              <th>Category</th>
              <th>Raised Amount</th>
              <th>Goal Amount</th>
            </tr>
          </thead>
          <tbody>
            {campaigns
              .sort((a, b) => b.data().raisedAmount - a.data().raisedAmount) 
              .slice(0, 5)
              .map((campaign, index) => {
                const campaignData = campaign.data(); 
                return (
                  <tr key={index} className="hover:bg-blue-200">
                    <th>{index + 1}</th>
                    <td>{campaignData.title}</td>
                    <td>{campaignData.category}</td>
                    <td>{campaignData.raisedAmount}</td>
                    <td>{campaignData.goalAmount}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
  
  
};

export default HomePage;
