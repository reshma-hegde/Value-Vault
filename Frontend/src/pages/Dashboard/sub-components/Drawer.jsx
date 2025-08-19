import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentProof } from "@/store/slices/superAdminSlice";


const PaymentUpdateForm = () => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const dispatch = useDispatch();

  // Form state
  const [userId, setUserId] = useState(singlePaymentProof.userId || "");
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "Pending");
  const [comment, setComment] = useState(singlePaymentProof.comment || "");
  const [showPaymentScreenshot, setShowPaymentScreenshot] = useState(false);

  useEffect(() => {
    if (singlePaymentProof) {
      setUserId(singlePaymentProof.userId);
      setAmount(singlePaymentProof.amount);
      setStatus(singlePaymentProof.status);
      setComment(singlePaymentProof.comment);
    }
  }, [singlePaymentProof]);

  const handlePaymentProofUpdate = () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("amount", amount);
    formData.append("status", status);
    formData.append("comment", comment);

    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-[#D4AF37] mb-4 text-center">
        Update Payment Proof
      </h2>
      <form className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">User ID</label>
          <input
            type="text"
            value={userId}
            disabled
            className="border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Settled">Settled</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Comment</label>
          <textarea
            rows={4}
            value={singlePaymentProof.comment || ""}
            onChange={(e) => e.target.value}
            disabled
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#D4AF37]"
          ></textarea>
        </div>

        {/* Button to toggle showing payment screenshot */}
        {singlePaymentProof.proof?.url && (
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setShowPaymentScreenshot(!showPaymentScreenshot)}
              className="bg-[#D4AF37] text-white px-4 py-2 rounded-md hover:bg-[#b38c2f] transition-all"
            >
              {showPaymentScreenshot ? "Hide Payment Screenshot" : "View Payment Screenshot"}
            </button>

            {/* Displaying the payment screenshot if showPaymentScreenshot is true */}
            {showPaymentScreenshot && (
              <div className="mt-4">
                <img
                  src={singlePaymentProof.proof.url}
                  alt="Payment Screenshot"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4">
        <button
                  type="button"
                  className="bg-blue-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
                  onClick={handlePaymentProofUpdate}
                >
                  {loading ? "Updating Payment Proof" : "Update Payment Proof"}
                </button>
          <button
            type="button"
            onClick={() => console.log("Cancelled")}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentUpdateForm;
