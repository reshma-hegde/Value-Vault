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
import { Bar } from "react-chartjs-2";
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

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

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
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "#1D2A3B",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
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
        text: "Monthly Total Payments Received",
      },
    },
  };

  return(
    <div className="w-full h-auto px-6 pt-16 lg:pl-[320px] flex flex-col flex flex-col items-center justify-center gap-12 bg-[#F9F9F9] text-[#1D2A3B]">
          {/* Dashboard Header */}
          <h1 className="text-[#D4AF37] text-3xl font-semibold sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
            Monthly Revenue
          </h1>
   <Bar data={data} options={options} />
   <br>
   </br>
   </div>
)};

export default PaymentGraph;