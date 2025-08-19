import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import Spinner from "@/custom-components/Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);

  const cardItems = [
    {
      title: "Monthly Total Payments Received",
      description: "View monthly payments and revenue details.",
      bgColor: "bg-[#D4AF37]",
      route: "/dashboard/payment-graph",
    },
    {
      title: "Users",
      description: "Analyze the distribution of bidders and auctioneers.",
      bgColor: "bg-[#333333]",
      route: "/dashboard/users-graph",
    },
    {
      title: "Payment Proofs",
      description: "Review and manage payment proofs submitted.",
      bgColor: "bg-[#1D2A3B]",
      route: "/dashboard/payment-proofs",
    },
    {
      title: "Delete Items From Auction",
      description: "Manage and delete auction items.",
      bgColor: "bg-[#FF6347]",
      route: "/dashboard/delete-auction-items",
    },
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#F5F5DC] text-[#1D2A3B] px-6 pt-16">
          {/* Dashboard Header */}
          <h1 className="text-[#D4AF37] text-3xl font-semibold sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center">
            Dashboard
          </h1>

          {/* Card Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 justify-center items-center mt-8">
            {cardItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.route)}
                className={`cursor-pointer p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${item.bgColor} text-white`}
              >
                <h3 className="text-xl font-semibold sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
