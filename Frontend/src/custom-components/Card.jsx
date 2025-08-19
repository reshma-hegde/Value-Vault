import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <>
      <Link
        to={`/auction/item/${id}`}
        className="flex-grow basis-full bg-[#F5F5DC] rounded-lg group sm:basis-44 lg:basis-48 2xl:basis-56 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
      >
        {/* Image */}
        <img
          src={imgSrc}
          alt={title}
          className="w-full rounded-t-lg aspect-[4/3] object-cover"
        />
        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h5
            className="font-extrabold text-[#d4af37] text-[18px] md:text-[20px] mb-2 tracking-wide"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {title}
            
          </h5>
          {/* Starting Bid */}
          {startingBid && (
            <p
              className="text-[#d4af37] font-medium text-sm md:text-md mb-2"
              style={{ fontFamily: "Lora, serif" }}
            >
              Starting Bid:{" "}
              <span className="text-[#D4AF37] font-bold ml-1">
                {startingBid}
              </span>
            </p>
          )}
          {/* Time Left */}
          <p
            className="text-[#d4af37] text-sm md:text-md font-light"
            style={{ fontFamily: "Lora, serif" }}
          >
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-[#D4AF37] font-semibold ml-1">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-[#D4AF37] font-semibold ml-1">
                Time up!
              </span>
            )}
          </p>
        </div>
      </Link>
    </>
  );
};

export default Card;
