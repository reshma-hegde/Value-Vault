import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#F5F5DC] px-4 py-10">
      <div className="w-full max-w-lg bg-[#1d2a3b] border border-[#D4AF37] shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#D4AF37] py-6 text-center text-[#1D2A3B]">
          <h1
            className="text-3xl font-bold tracking-wider uppercase"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Submit Payment Proof
          </h1>
          <p
            className="text-[#1D2A3B] mt-2 text-md"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Upload your payment details for verification
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 bg-[#1d2a3b]">
          <form className="flex flex-col gap-6" onSubmit={handlePaymentProof}>
            {/* Amount Input */}
            <div className="flex flex-col">
              <label
                className="block text-[#D4AF37] font-medium mb-2 uppercase text-sm"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                Amount Paid
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9F9F9] text-[#1D2A3B] rounded-md border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all duration-300"
                placeholder="Enter the amount paid"
              />
            </div>

            {/* Payment Proof Input */}
            <div className="flex flex-col">
              <label
                className="block text-[#D4AF37] font-medium mb-2 uppercase text-sm"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                Upload Payment Proof (Screenshot)
              </label>
              <input
                type="file"
                onChange={proofHandler}
                className="w-full px-4 py-3 text-[#1D2A3B] bg-[#F9F9F9] rounded-md border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all duration-300"
              />
            </div>

            {/* Comment Input */}
            <div className="flex flex-col">
              <label
                className="block text-[#D4AF37] font-medium mb-2 uppercase text-sm"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 text-[#1D2A3B] bg-[#F9F9F9] rounded-md border border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all duration-300"
                placeholder="Enter any additional information"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                className="w-full max-w-md bg-[#D4AF37] hover:bg-[#C69422] text-[#1D2A3B] font-semibold py-3 px-6 rounded-md shadow-md transition-all duration-300"
                type="submit"
                disabled={loading}
                style={{ fontFamily: "Merriweather, serif" }}
              >
                {loading ? "Uploading..." : "Upload Payment Proof"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubmitCommission;
