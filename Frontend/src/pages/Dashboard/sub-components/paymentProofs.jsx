import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
} from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs } = useSelector((state) => state.superAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch payment proof details
  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
    navigate("/drawer"); // Redirect to Drawer.jsx after fetching details
  };

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-12 px-6 bg-[#F9F9F9] text-[#1D2A3B]">
      {/* Dashboard Header */}
      <h1 className="text-[#D4AF37] text-3xl font-semibold sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
        Payment Proof
      </h1>
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="min-w-full bg-white mt-5 border border-gray-300 rounded-md shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-center">User ID</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4">{element.userId}</td>
                  <td className="py-2 px-4">{element.status}</td>
                  <td className="flex items-center justify-center gap-3 py-4">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all duration-300"
                      onClick={() => handleFetchPaymentDetail(element._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all duration-300"
                      onClick={() => handlePaymentProofDelete(element._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-6 text-center text-xl text-sky-600"
                >
                  No payment proofs are found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentProofs;
