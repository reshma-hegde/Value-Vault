import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_z08nhuj",
        "template_lbsvgmc",
        templateParams,
        "Gceq24KBpGy5zNJMN"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section className="w-full min-h-screen px-6 py-12 bg-[#333333] flex flex-col items-center justify-center">
      <div className="bg-[#1D2A3B] shadow-lg rounded-lg max-w-4xl w-full p-8">
        <h3
          className="text-[#D4AF37] text-4xl font-semibold text-center mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Contact Us
        </h3>
        <form className="flex flex-col gap-6" onSubmit={handleContactForm}>
          <div className="flex flex-col gap-2">
            <label
              className="text-[#F5F5DC] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-[#D4AF37] bg-[#F5F5DC]  rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-[#F5F5DC] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#D4AF37]  bg-[#F5F5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-[#F5F5DC] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Your Phone
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-[#D4AF37]  bg-[#F5F5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-[#F5F5DC] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-[#D4AF37] bg-[#F5F5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-[#F5F5DC] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Message
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-[#D4AF37] bg-[#F5F5DC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
              required
            />
          </div>
          <button
            className="w-full bg-[#D4AF37] text-[#1D2A3B] py-3 rounded-md text-lg font-semibold hover:bg-[#b38f2b] transition-all duration-300"
            style={{ fontFamily: "Poppins, sans-serif" }}
            type="submit"
          >
            {loading ? "Sending Message..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
