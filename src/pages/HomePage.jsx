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

  return (
    <section className="px-2 py-2 space-y-6">
      <div className="flex bg-blue-100 p-2 gap-2 rounded-lg">
        {["weekly", "monthly", "yearly"].map((filter, index) => {
          return (
            <button
              className={`px-4 py-1 rounded capitalize ${
                filter == dataFilter && "bg-white text-blue-500"
              }`}
              onClick={() => setDataFilter(filter)}
              key={index}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid3">
        {amountStats.map((data, index) => {
          if (index > 2)
            return (
              <div className="p-4 bg-white rounded-md" key={index}>
                <Pie data={data} />
              </div>
            );

          return (
            <div
              className="grid content-between p-4 bg-white rounded-md"
              key={index}
            >
              <div className="space-y-4">
                <div className="text-slate-500">{data.title}</div>
                <div className="font-[600]">{INRFormat(data.value)}</div>
              </div>
              <Bar data={data.data} options={options} />
            </div>
          );
        })}
      </div>
      {/* <div className="grid3">
        {amountData ? (
          <h1>Loading</h1>
        ) : (
          transactionStats.map((data, index) => {
            if (index > 2)
              return (
                <div className="p-4 bg-white rounded-md">
                  <Pie data={data} />
                </div>
              );

            return (
              <div
                className="grid content-between p-4 bg-white rounded-md"
                key={index}
              >
                <div className="space-y-4">
                  <div className="text-slate-500">{data.title}</div>
                  <div className="font-[600]">{INRFormat(data.value)}</div>
                </div>
                <Bar data={data.data} />
              </div>
            );
          })
        )}
      </div> */}

      <div className="bg-white p-4 rounded-md overflow-hidden">
        <div className="flex items-center gap-4 text-xl text-slate-500 font-[600] mb-4">
          <IoMdTrendingUp size={24} /> Trending campaigns
        </div>
        <div className="overflow-auto w-[calc(100vw-48px)] lg:w-[calc(100vw-304px)]">
          <table className="table whitespace-nowrap">
            <thead>
              <tr>
                <th className="">S. No.</th>
                <th className="">Fundraisers</th>
                <th className="">Created on</th>
                <th className="">Expired by</th>
                <th className="">Goal amount</th>
                <th className="">Raised amount</th>
                <th className="">Tip amount</th>
                <th className="">Total collection</th>
              </tr>
            </thead>
            <tbody>
              {!trendingData ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : (
                trendingData?.map((data, index) => {
                  const url = `https://give-umma.vercel.app/details/${data.id}`;
                  const createdOn = moment(data.data().date).format(
                    "DD-MM-YYYY"
                  );
                  const expiredBy = moment(data.data().date)
                    .add(2, "month")
                    .format("DD-MM-YYYY");

                  const raisedAmount = data.data()?.raisedAmount ?? 0;
                  const goalAmount = data.data()?.goalAmount ?? 0;
                  const tipAmount = data.data()?.totalTip ?? 0;
                  return (
                    <tr key={index}>
                      <td className="">{index + 1}</td>
                      <td className="">
                        <a href={url} target="_blank">
                          {url}
                        </a>
                      </td>
                      <td className="">{createdOn}</td>
                      <td className="">{expiredBy}</td>
                      <td className="">{INRFormat(goalAmount)}</td>
                      <td className="">{INRFormat(raisedAmount)}</td>
                      <td className="">{INRFormat(tipAmount)}</td>
                      <td className="">
                        {INRFormat(raisedAmount + tipAmount)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md overflow-hidden">
        <div className="flex items-center gap-4 text-xl text-slate-500 font-[600] mb-4">
          <BsClockHistory size={24} /> Recent donations
        </div>
        <div className="overflow-auto w-[calc(100vw-48px)] lg:w-[calc(100vw-304px)]">
          <table className="table whitespace-nowrap">
            <thead>
              <tr>
                <th className="">S. No.</th>
                <th className="">Name</th>
                <th className="">Amount</th>
                <th className="">Tip</th>
                <th className="">Email</th>
                <th className="">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {!recentDonations ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : (
                recentDonations?.map((data, index) => {
                  const name = data.data()?.name ?? 0;
                  const amount = data.data()?.amount ?? 0;
                  const tip = data.data()?.tip ?? 0;
                  const email = data.data()?.email ?? 0;
                  const mobile = data.data()?.mobile ?? 0;
                  return (
                    <tr key={index}>
                      <td className="">{index + 1}</td>
                      <td className="">{name}</td>
                      <td className="">{INRFormat(amount)}</td>
                      <td className="">{INRFormat(tip)}</td>
                      <td className="">{email}</td>
                      <td className="">{mobile}</td>
                      
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
