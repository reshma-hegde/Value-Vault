import React from "react";
import { useSelector } from "react-redux";

const AuthButtons = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return null; // Don't render anything if the user is logged in
  }

  return (
    <div className="flex justify-center mt-4 space-x-4">
      {/* Login Button */}
      <button
        className="px-6 py-2 text-lg font-semibold text-white bg-[#D4AF37] hover:bg-[#c59e32] rounded-md shadow-lg transition-colors"
        onClick={() => (window.location.href = "/login")}
      >
        Login
      </button>

      {/* Sign Up Button */}
      <button
        className="px-6 py-2 text-lg font-semibold text-[#D4AF37] bg-white border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-md shadow-lg transition-colors"
        onClick={() => (window.location.href = "/sign-up")}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;
