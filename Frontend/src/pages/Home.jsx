import React from "react";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classicCar from "../assets/images/car7.webp"; 
import clocks from "../assets/images/clock.webp"; 
import antiqueVase from "../assets/images/antiquevase.webp";
import ring from "../assets/images/ring.webp";
import fineArt from "../assets/images/painting.webp"
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import AuthButtons from "./AuthButtons";
import { Link } from "react-router-dom"

const auctions = [
  {
    id: 1,
    title: "Antique Vase Collection",
    description: "A rare and valuable antique vase from the 18th century.",
    image: antiqueVase, // Imported image
  },
  {
    id: 2,
    title: "Classic Car Auction",
    description: "Vintage cars from the 1950s and 1960s up for grabs.",
    image: classicCar, // Imported image
  },
  {
    id: 3,
    title: "Fine Art Showcase",
    description: "Exquisite paintings by renowned artists.",
    image: fineArt, // Imported image
  },
  {
    id: 4,
    title: "Antique clocks",
    description: "Antique clocks and watches from the medieval system.",
    image: clocks, // Imported image
  },
  {
    id: 5,
    title: "Long lost jewellery",
    description: "Jewellery enhancing the looks.",
    image: ring, // Imported image
  },
];

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    
    <section className="min-h-screen bg-[#1D2A3B] text-[#F9F9F9] m-0 p-0 pb-8">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1
          className="text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5F5DC]"
          style={{
            fontFamily: "LeMajor, serif",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Value Vault
        </h1>
        <p className="mt-4 text-lg lg:text-2xl text-[#D4AF37] max-w-4xl leading-relaxed" 
        style={{fontFamily: "Carlo,serif"}}>
          Discover, bid, and own the extraordinary. Your journey to premium auctions begins here.
        </p>
        <AuthButtons/>
      </div>

     {/* Carousel Section */}
     <div className="max-w-6xl mx-auto p-4">
  <h2
    className="text-3xl lg:text-4xl font-medium text-center mb-6"
    style={{ fontFamily: "Playfairdisplay, serif" }}
  >
    Explore Auctions
  </h2>
  <Slider {...settings}>
    {auctions.map((auction) => (
      <Link
        to={"/auctions"} // Navigate to a specific auction page
        key={auction.id}
        className="flex flex-col items-center text-center bg-[#2A2D45] border border-[#333333] rounded-lg p-4 shadow-md"
        style={{ maxWidth: "200px", margin: "0 auto" , height:"400px"}} // Compact card width
      >
        <img
          src={auction.image}
          alt={auction.title}
          className="w-full h-64 object-contain rounded-md mb-2" // Ensure the entire image is visible
        />
        <h3
          className="text-lg font-bold text-[#D4AF37]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {auction.title}
        </h3>
        <p
          className="text-sm text-[#F5F5DC] mt-1 leading-snug"
          style={{ maxHeight: "3rem", overflow: "hidden", textOverflow: "ellipsis" }} // Limit description height
        >
          {auction.description}
        </p>
      </Link>
    ))}
  </Slider>
</div>


      {/* Footer Section */}
      <div className="text-center pb-8">
        <p
          className="text-lg"
          style={{ fontFamily: "Poppins, sans-serif", color: "#F5F5DC" }}
        >
          Explore the world of exclusive auctions with{" "}
          <span className="text-[#D4AF37] font-bold">Value Vault</span>.
        </p>
      </div>
      <FeaturedAuctions/>
      <UpcomingAuctions/>
    </section>
  );
};

export default HomePage;
