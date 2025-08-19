import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React, { useState } from "react";
import { useSelector } from "react-redux";

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

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter auctions based on selected category
  const filteredAuctions =
    selectedCategory === "All"
      ? allAuctions
      : allAuctions.filter(
          (auction) => auction.category === selectedCategory
        );

  // Sort auctions to move "Time up!" items to the end
  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    const now = new Date();
    const aTimeUp = new Date(a.endTime) < now; // Is auction A's time up?
    const bTimeUp = new Date(b.endTime) < now; // Is auction B's time up?

    if (aTimeUp && !bTimeUp) return 1; // Move A after B
    if (!aTimeUp && bTimeUp) return -1; // Move A before B
    return 0; // Leave the order unchanged
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <article className="w-full min-h-screen flex flex-col items-center justify-center bg-[#1D2A3B] px-5 py-10">
          {/* Header Section */}
          <section className="text-center mb-10">
            <h1
              className="text-[#D4AF37] text-3xl font-extrabold mb-4 min-[480px]:text-4xl md:text-5xl xl:text-6xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Auctions
            </h1>
            <p
              className="text-[#F5F5DC] text-md md:text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "Lora, serif" }}
            >
              Explore our curated collection of premium items. Bid and win
              something extraordinary.
            </p>
          </section>

          {/* Category Filter Section */}
          <section className="mb-10">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleCategoryChange("All")}
                className={`${
                  selectedCategory === "All" ? "bg-[#D4AF37]" : "bg-[#333333]"
                } text-[#F5F5DC] font-bold py-2 px-6 rounded-md transition-all duration-300`}
              >
                All
              </button>
              {auctionCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`${
                    selectedCategory === category
                      ? "bg-[#D4AF37]"
                      : "bg-[#333333]"
                  } text-[#F5F5DC] font-bold py-2 px-6 rounded-md transition-all duration-300`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Auctions Section */}
          <section className="flex flex-wrap justify-center gap-6 w-full max-w-screen-lg">
            {sortedAuctions.length > 0 ? (
              sortedAuctions.map((element) => (
                <Card
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                  startingBid={element.startingBid}
                  id={element._id}
                  key={element._id}
                  styles={{
                    container:
                      "border border-[#D4AF37] bg-[#F9F9F9] shadow-lg hover:shadow-xl transition-shadow duration-300",
                    title:
                      "text-[#333333] font-semibold text-lg md:text-xl lg:text-2xl",
                    subtitle: "text-[#1D2A3B] text-sm md:text-md",
                  }}
                />
              ))
            ) : (
              <p className="text-[#F5F5DC] text-xl font-bold">No auctions found</p>
            )}
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;
