import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { login } from "@/store/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("captchaValue", captchaValue); // Optional: Pass the captcha value to the backend (if implemented).
    dispatch(login(formData));
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <section className="w-full h-screen flex justify-center items-center bg-[#2C2C2C] animate-gradient-bg">
      <div className="bg-[#1D2A3B] w-full max-w-md px-6 py-8 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
        <h1
          className="text-[#D4AF37] text-3xl font-bold text-center mb-6 animate__animated animate__fadeIn"
          style={{ fontFamily: "Mangro, sans-serif" }}
        >
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col">
            <label
              className="text-[#D4AF37] text-md text-xl font-medium mb-2"
              style={{ fontFamily: "Carlo, sans-serif" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-3 px-4 border border-[#8A7968] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "Philosopher, sans-serif" }}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              className="text-[#D4AF37] text-xl text-md font-medium mb-2"
              style={{ fontFamily: "Carlo, sans-serif" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-3 px-4 border border-[#8A7968] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "Philosopher, sans-serif" }}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LflR48qAAAAAI1MNh2O8Ss0ksMLB0xPnxibAVRS" // Replace with your reCAPTCHA site key
              onChange={onCaptchaChange}
              className="mb-4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#D4AF37] text-white font-semibold py-3 px-6 rounded-md mt-4 transition-all duration-300 transform hover:scale-105 hover:bg-[#b69834] hover:from-[#D4AF37] hover:to-[#1D2A3B]"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <p
          className="text-center text-[#333333] mt-4 animate__animated animate__fadeIn animate__delay-1s"
          style={{ fontFamily: "Philosopher, sans-serif" }}
        >
          <a href="/forgot-password" className="text-[#D4AF37] hover:underline">
            Forgot your password?
          </a>
        </p>

        {/* Create Account */}
        <p
          className="text-center text-[#ffffff] mt-2 animate__animated animate__fadeIn animate__delay-1s"
          style={{ fontFamily: "Philosopher, sans-serif" }}
        >
          Don't have an account?{" "}
          <a href="/sign-up" className="text-[#D4AF37] hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
