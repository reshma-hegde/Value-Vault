import React, { useState, useEffect, useRef } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaSignInAlt } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io";
import { FaUserCircle, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";
import { TiUser } from "react-icons/ti";
import { FcBusinessContact } from "react-icons/fc";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const drawerRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#1d2a3b] text-white text-3xl p-3 rounded-md hover:bg-[#D4AF37] transition-colors z-50"
        aria-label="Open side drawer"
      >
        <FaUserCircle />
      </button>

      {/* Overlay */}
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShow(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 left-0 w-[300px] bg-[#1D2A3B] h-full z-50 transform ${
          show ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 p-4 flex flex-col justify-between`}
        aria-hidden={!show}
      >
        {/* Sidebar Header */}
        <header>
          <Link to="/" onClick={() => setShow(false)}>
            <h1
              className="text-4xl font-semibold text-[#D4AF37] mb-4"
              style={{ fontFamily: "LeMajor, sans-serif" }}
            >
              Value Vault
            </h1>
          </Link>
          <nav>
            <ul className="flex flex-col gap-4 mt-6">
              <li>
                <Link
                  to="/auctions"
                  className="flex items-center gap-2 text-2xl text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                  style={{ fontFamily: "Carlo, sans-serif" }}
                  onClick={() => setShow(false)}
                >
                  <RiAuctionFill /> Auctions
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="flex items-center gap-2 text-2xl text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                  style={{ fontFamily: "Carlo, sans-serif" }}
                  onClick={() => setShow(false)}
                >
                  <MdLeaderboard /> Leaderboard
                </Link>
              </li>
              {isAuthenticated &&  (
              <li>
                <Link
                  to="/me"
                  className="flex items-center gap-2 text-2xl text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                  style={{ fontFamily: "Carlo, sans-serif" }}
                  onClick={() => setShow(false)}
                >
                  <TiUser /> Get Profile
                </Link>
              </li>
              )}
              {isAuthenticated && user?.role === "Seller" && (
                <>
                  <li>
                    <Link
                      to="/submit-commission"
                      className="flex items-center gap-2 text-2xl text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                      style={{ fontFamily: "Carlo, sans-serif" }}
                      onClick={() => setShow(false)}
                    >
                      <FaFileInvoiceDollar /> Submit Commission
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/create-auction"
                      className="flex items-center gap-2 text-2xl text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                      style={{ fontFamily: "Carlo, sans-serif" }}
                      onClick={() => setShow(false)}
                    >
                      <IoIosCreate /> Create Auction
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/view-my-auctions"
                      className="flex items-center gap-2 text-2xl text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                      style={{ fontFamily: "Carlo, sans-serif" }}
                      onClick={() => setShow(false)}
                    >
                      <FaEye /> My Auctions
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && user?.role === "Admin" && (
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-2xl text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                    style={{ fontFamily: "Carlo, sans-serif" }}
                    onClick={() => setShow(false)}
                  >
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </header>

        {/* Footer */}
        <footer className="mt-6">
          {!isAuthenticated ? (
            <div className="my-4 flex gap-4">
              <Link
                to="/sign-up"
                className="flex items-center text-[#F5F5DC] gap-2 hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: "Carlo, sans-serif" }}
                onClick={() => setShow(false)}
              >
                <FaSignInAlt /> Sign Up
              </Link>
              <Link
                to="/login"
                className="text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: "Carlo, sans-serif" }}
                onClick={() => setShow(false)}
              >
                Login
              </Link>
            </div>
          ) : (
            <button
              className="my-4 flex items-center gap-2 text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
              onClick={handleLogout}
              style={{ fontFamily: "Carlo, sans-serif" }}
            >
              <FaSignInAlt /> Logout
            </button>
          )}
          <hr className="my-4 border-t-[#8D6E63]" />
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: "Carlo, sans-serif" }}
                onClick={() => setShow(false)}
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="flex items-center gap-2 text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                style={{ fontFamily: "Carlo, sans-serif" }}
                onClick={() => setShow(false)}
              >
                < FcBusinessContact/> Contact Us
              </Link>
            </li>
          </ul>
          
          <div className="flex gap-4 mt-4">
            <Link
              to="/"
              className="text-[#8D6E63] hover:text-[#3B5998] transition-colors"
            >
              <FaFacebook size={20} />
            </Link>
            <Link
              to="/"
              className="text-[#8D6E63] hover:text-[#E1306C] transition-colors"
            >
              <RiInstagramFill size={20} />
            </Link>
          </div>
          <p
            className="text-sm text-[#8D6E63] mt-4"
            style={{ fontFamily: "Philosopher, sans-serif" }}
          >
            &copy; Value Vault, LLC. All rights reserved.
          </p>
        </footer>
      </aside>
    </>
  );
};

export default SideDrawer;
