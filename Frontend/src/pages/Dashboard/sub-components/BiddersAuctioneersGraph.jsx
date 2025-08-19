import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  // Mock data for when the Redux state is empty
  const defaultBidders = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  const defaultAuctioneers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders?.length ? totalBidders : defaultBidders,
        borderColor: "#1d2a3b",
        fill: false,
      },
      {
        label: "Number of Sellers",
        data: totalAuctioneers?.length ? totalAuctioneers : defaultAuctioneers,
        borderColor: "#D4AF37",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Number of Bidders and Sellers Registered",
        font: {
          size: 18,
          family: "Arial, sans-serif",
        },
      },
    },
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-12 px-6 bg-[#F9F9F9] text-[#1D2A3B]">
  {/* Dashboard Header */}
  <h1 className="text-[#D4AF37] text-3xl font-semibold sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
    Number of Bidders and Sellers Registered
  </h1>
  <div className="w-full max-w-4xl p-4 bg-white rounded shadow">
    <Line data={data} options={options} />
  </div>
</div>

  );
};

export default BiddersAuctioneersGraph;
