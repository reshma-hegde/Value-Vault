import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#1D2A3B", // Deep Navy Blue for the entire page
        color: "#F5F5DC", // Creamy Beige for text
      }}
    >
      {/* Content Section */}
      <section
        className="my-8 p-10 rounded-lg shadow-lg w-full max-w-6xl"
        style={{
          backgroundColor: "#1D2A3B", // White card for content
          color: "#000000", // Text color inside the card
        }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center">
          <h3 className="text-[#D4AF37] text-4xl  mb-6"
          style={{ fontFamily: "Playfairdisplay, sans-serif"}}>
            Bidders Leaderboard
          </h3>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {leaderboard.slice(0, 10).map((element, index) => (
            <div
              key={element._id}
              className="w-80 p-5 bg-[#F9F9F9] text-[#1D2A3B] rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-[#D4AF37]">
                  #{index + 1}
                </span>
                <img
                  src={element.profileImage?.url}
                  alt={element.userName}
                  className="h-16 w-16 object-cover rounded-full border-2 border-[#D4AF37]"
                />
              </div>
              <h4 className="text-xl font-semibold  mb-2"
              style={{ fontFamily: "Playfairdisplay, sans-serif"}}>
                {element.userName}
              </h4>
              <p className="text-lg "
              style={{ fontFamily: "Raleway, sans-serif"}}>
                <span className="font-bold">Bid Expenditure: </span>
                {element.moneySpent}
              </p>
              <p className="text-lg"
              style={{ fontFamily: "Raleway, sans-serif"}}>
                <span className="font-bold">Auctions Won: </span>
                {element.auctionsWon}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
