import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Seller") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  return (
    <div className="w-full min-h-screen bg-[#1D2A3B] flex items-center justify-center px-5 pt-20">
      <div className="w-full max-w-7xl bg-[#F5F5DC] rounded-xl p-8">
        <h1 className="text-[#D4AF37] font-serif text-4xl font-extrabold mb-6 text-center sm:text-5xl md:text-6xl lg:text-7xl" 
        style={{ fontFamily: "Playfairdisplay, sans-serif"}}>
          My Auctions
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div
            className={`${
              myAuctions.length > 2 ? "flex-grow" : ""
            } flex flex-wrap justify-center gap-6 w-full`}
          >
            {myAuctions.length > 0 ? (
              myAuctions.map((element) => {
                return (
                  <CardTwo
                    key={element._id}
                    title={element.title}
                    startingBid={element.startingBid}
                    endTime={element.endTime}
                    startTime={element.startTime}
                    imgSrc={element.image?.url}
                    id={element._id}
                  />
                );
              })
            ) : (
              <h3 className="text-[#666] text-xl font-semibold text-center mt-10 sm:text-2xl lg:text-3xl">
                You have not posted any auctions.
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMyAuctions;
