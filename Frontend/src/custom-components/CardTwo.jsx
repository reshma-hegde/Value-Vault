import React from "react";
import { Link } from "react-router-dom";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
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

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <Link
      to={`/auction/item/${id}`}
      className="bg-white rounded-xl shadow-lg w-full sm:w-[250px] lg:w-[280px] p-4 transition-all transform group hover:scale-105 hover:shadow-2xl"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-[200px] object-cover rounded-md group-hover:opacity-80 transition-all duration-300"
      />
      <div className="pt-4 pb-2">
        <h5 className="font-serif text-[#1D2A3B] text-xl font-semibold mb-2 group-hover:text-[#D4AF37]">
          {title}
        </h5>
        {startingBid && (
          <p className="text-[#333] text-sm">
            Starting Bid:{" "}
            <span className="font-semibold text-[#D4AF37]">{startingBid}</span>
          </p>
        )}
        <p className="text-[#333] text-sm">
          {timeLeft.type}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="font-semibold text-[#D4AF37] ml-1">
              {formatTimeLeft(timeLeft)}
            </span>
          ) : (
            <span className="font-semibold text-[#D4AF37] ml-1">Time's up!</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default CardTwo;
