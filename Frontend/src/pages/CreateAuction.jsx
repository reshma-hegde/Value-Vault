import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewellry",
    "Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Sports Memorabilia",
    "Books & Manuscripts",

  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Seller") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#ffffff" }}
    >
      <article className="w-full max-w-6xl bg-[#F5F5DC] shadow-lg rounded-lg p-8">
        <h1
          className="text-[#D4AF37] text-4xl font-bold mb-6 text-center"
          style={{ fontFamily: "Playfairdisplay, sans-serif"}}>
      
          Create Auction
        </h1>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleCreateAuction}
        >
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <label className="block text-lg text-[#333333] font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg text-[#333333] font-semibold mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="">Select Category</option>
                {auctionCategories.map((element) => (
                  <option key={element} value={element}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <label className="block text-lg text-[#333333] font-semibold mb-2">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-lg text-[#333333] font-semibold mb-2">
                Starting Bid
              </label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="w-full py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <label className="block text-lg text-[#333333] font-semibold mb-2">
                Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg text-[#333333] font-semibold mb-2">
                End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
          <div>
            <label className="block text-lg text-[#333333] font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              rows={5}
            />
          </div>
          <div>
            <label className="block text-lg text-[#333333] font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              onChange={imageHandler}
              className="block w-full text-sm text-gray-500 bg-gray-100 border border-gray-400 rounded-md cursor-pointer"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded-md shadow-lg w-40 h-auto"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-[#D4AF37] hover:bg-[#a1831e] text-[#1D2A3B] py-3 px-6 rounded-lg font-bold text-lg transition duration-300 mx-auto w-full"
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </article>
    </div>
  );
};

export default CreateAuction;
