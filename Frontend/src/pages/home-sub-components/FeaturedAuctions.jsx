import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "@/custom-components/Card";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Arrow icons for navigation

const FeaturedAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const [currentPage, setCurrentPage] = useState(0);

  // Sort auctions by end time (active first)
  const sortedAuctions = [...allAuctions].sort((a, b) => {
    const now = new Date();
    const aEndTime = new Date(a.endTime);
    const bEndTime = new Date(b.endTime);

    if (aEndTime > now && bEndTime <= now) return -1; // a is active, b is expired
    if (aEndTime <= now && bEndTime > now) return 1;  // a is expired, b is active

    return aEndTime - bEndTime; // Otherwise sort by end time
  });

  // Limit to only 8 auctions in total
  const limitedAuctions = sortedAuctions.slice(0, 8);

  // Auctions to display per page (4 auctions per page)
  const auctionsPerPage = 4;
  const auctionsToDisplay = limitedAuctions.slice(
    currentPage * auctionsPerPage,
    (currentPage + 1) * auctionsPerPage
  );

  // Handlers for next and previous
  const handleNext = () => {
    if ((currentPage + 1) * auctionsPerPage < limitedAuctions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="my-8">
      <h3 className="text-[#D4AF37] text-2xl font-semibold mb-6 min-[480px]:text-xl md:text-2xl lg:text-3xl text-center">
        Featured Auctions
      </h3>

      {/* Grid Layout for Auctions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {auctionsToDisplay.map((element) => (
          <div key={element._id} className="bg-[#F5F5DC] px-2 rounded-lg">
            <Card
              title={element.title}
              imgSrc={element.image?.url}
              startTime={element.startTime}
              endTime={element.endTime}
              startingBid={element.startingBid}
              id={element._id}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrevious}
          className="p-2 bg-[#D4AF37] rounded-full text-white flex items-center justify-center"
          disabled={currentPage === 0}
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-[#D4AF37] rounded-full text-white flex items-center justify-center"
          disabled={(currentPage + 1) * auctionsPerPage >= limitedAuctions.length}
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default FeaturedAuctions;
