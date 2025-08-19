import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <section className="my-8 pb-8 "> {/* Added padding-bottom to prevent bottom gap */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {/* Reduced height black box */}
  <div className="col-span-full bg-[#000000] p-2 rounded-lg shadow-lg flex flex-col items-center justify-center text-center min-h-[2px] w-full">
    <span className="rounded-full bg-[#D4AF37] text-white w-14 h-14 flex items-center justify-center mb-4">
      <RiAuctionFill size={23} />
    </span>
    <h3 className="text-[#D4AF37] text-xl font-medium leading-tight tracking-wide">
      Auctions For Today
    </h3>
    
  </div>







        {/* Display Auctions */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {auctionsStartingToday.slice(0, 6).map((element) => {
              return (
                <Link
                  to={`/auction/item/${element._id}`}
                  key={element._id}
                  className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-12 2xl:h-12 rounded-md"
                    />
                    <p className="font-extralight text-[#111] text-sm truncate w-40 sm:w-48 lg:w-64">
                      {element.title}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-stone-600 font-semibold">Starting Bid:</p>
                    <p className="text-[#fdba88] font-semibold">Rs. {element.startingBid}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-stone-600 font-bold">Starting Time:</p>
                    <p className="text-black text-sm">
                      {new Date(element.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingAuctions;
