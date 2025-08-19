import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "@/store/slices/userSlice";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [bankAccountName, setBankAccountName] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [otherBankName, setOtherBankName] = useState("");
    const [upinumber, setupinumber] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [profileImagePreview, setProfileImagePreview] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [captchaError, setCaptchaError] = useState("");

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();


    const handleRegister = (e) => {
        e.preventDefault();
    
        if (!recaptchaToken) {
            setCaptchaError("Please verify that you are human!");
            return;
          }
      
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("address", address);
        formData.append("role", role);
        formData.append("profileImage", profileImage);
        if (role === "Seller") {
            formData.append("bankAccountName", bankAccountName);
            formData.append("bankAccountNumber", bankAccountNumber);
            formData.append(
                "bankName",
                bankName === "others" ? otherBankName : bankName
            );
            formData.append("upinumber", upinumber);
        }
        dispatch(register(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
    }, [dispatch, loading, isAuthenticated]);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProfileImagePreview(reader.result);
            setProfileImage(file);
        };
    };

    const onCaptchaChange = (token) => {
        setRecaptchaToken(token);
        setCaptchaError("");
      };
    return (
        <section className="w-full h-auto px-5 pt-20 flex flex-col items-center min-h-screen bg-[#F5F5DC] "
        style={{ fontFamily: "Raleway, sans-serif"}}>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                {/* Header */}
                <h1 className="text-4xl text-[#1d2a3b] text-center mb-6"
                style={{ fontFamily: "Lobster, sans-serif"}}>
                    Register
                </h1>
                <p className="text-center text-[#555555] mb-8">
                    Fill your details
                </p>

                {/* Form */}
                <form className="space-y-6 " onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* User Details */}
                        <div>
                            <label className="block text-[#333333]  font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[#333333] font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[#333333] font-medium mb-2">Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[#333333] font-medium mb-2">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                placeholder="Enter your address"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[#333333] font-medium mb-2">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                            required
                        >
                            <option value="">Select a Role</option>
                            <option value="Seller">Seller</option>
                            <option value="Bidder">Bidder</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#333333] font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-[#333333] font-medium mb-2">Profile Image</label>
                        <div className="flex items-center gap-4">
                            <img
                                src={profileImagePreview || "/imageHolder.jpg"}
                                alt="Profile Preview"
                                className="w-16 h-16 rounded-full border border-[#d4af37] object-cover"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={imageHandler}
                                className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Seller Details */}
                    {role === "Seller" && (
                        <div>
                            <h2 className="text-[#1d2a3b] text-lg font-semibold mb-4">
                                Seller Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[#333333] font-medium mb-2">Bank Name</label>
                                    <select
                                        value={bankName}
                                        onChange={(e) => setBankName(e.target.value)}
                                        className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                    >
                                        <option value="">Select Your Bank</option>
                                        <option value="SBI">SBI</option>
                                        <option value="HDFC">HDFC</option>
                                        <option value="Canara Bank">Canara Bank</option>
                                        <option value="IDFC Bank">IDFC Bank</option>
                                        <option value="Federal Bank">Federal Bank</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                {bankName === "others" && (
                                    <div>
                                        <label className="block text-[#333333] font-medium mb-2">
                                            Specify Bank Name
                                        </label>
                                        <input
                                            type="text"
                                            value={otherBankName}
                                            onChange={(e) => setOtherBankName(e.target.value)}
                                            className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-[#333333] font-medium mb-2">Bank Account Number</label>
                                    <input
                                        type="text"
                                        value={bankAccountNumber}
                                        onChange={(e) => setBankAccountNumber(e.target.value)}
                                        className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#333333] font-medium mb-2">Account Holder Name</label>
                                    <input
                                        type="text"
                                        value={bankAccountName}
                                        onChange={(e) => setBankAccountName(e.target.value)}
                                        className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#333333] font-medium mb-2">UPI Number/Paypal Email</label>
                                    <input
                                        type="text"
                                        value={upinumber}
                                        onChange={(e) => setupinumber(e.target.value)}
                                        className="w-full border border-[#d4af37] rounded-lg py-2 px-4 text-[#333333] focus:ring-2 focus:ring-[#d4af37] focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* CAPTCHA */}
          <div>
            <ReCAPTCHA
              sitekey="6LflR48qAAAAAI1MNh2O8Ss0ksMLB0xPnxibAVRS"
              onChange={onCaptchaChange}
            />
            {captchaError && <p className="text-red-500 mt-2">{captchaError}</p>}
          </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#d4af37] hover:bg-[#b3942b] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                       
                    </div>
                    <div className="flex justify-center mt-4">
    <p className="text-[#333333]">
        Already have an account?{" "}
        <a
            href="/login"
            className="text-[#d4af37] hover:underline transition-all duration-300 font-semibold"
        >
            Login
        </a>
    </p>
</div>
                </form>
            </div>
        </section>
    );
};

export default SignUp;
