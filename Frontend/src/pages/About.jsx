import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    },
  ];

  return (
    <div
      className="min-h-screen w-full px-6 py-20 flex flex-col items-center"
      style={{
        background: "linear-gradient(135deg, #F9F9F9 60%, #1D2A3B)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5F5DC]">
          About Us
        </h1>
        <p className="mt-6 text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto">
          Discover the elegance of auctions, powered by technology and driven by passion. 
          At <span className="font-semibold text-[#D4AF37]">Value Vault</span>, we redefine the way you buy and sell extraordinary items.
        </p>
      </div>

      {/* Our Mission */}
      <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-lg rounded-2xl p-8 mb-12">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h3>
        <p className="text-gray-600 leading-relaxed">
          At Value Vault, we aim to revolutionize how people connect through auctions. Our platform inspires trust, encourages competition, and celebrates the art of discovering unique treasures.
        </p>
      </div>

      {/* Values Section */}
      <div className="max-w-5xl w-full mb-12">
        <h3 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value) => (
            <div
              key={value.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <h4 className="text-2xl font-semibold text-[#D4AF37] mb-4">
                {value.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl w-full bg-gray-50 border border-gray-300 shadow-lg rounded-2xl p-8 mb-12">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6">Our Story</h3>
        <p className="text-gray-600 leading-relaxed">
          Founded by passionate auctioneers, Value Vault emerged from a love for connecting people with unique and valuable items. 
          We blend technology with expertise to create an unforgettable auction experience.
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center mb-12">
        <h3 className="text-4xl font-extrabold text-gray-900 mb-6">Join Us</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Whether you're here to buy, sell, or explore, Value Vault is the perfect platform for auction enthusiasts. 
          Start uncovering hidden gems and experience the thrill of winning.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F5F5DC] text-white hover-bg-[#c7a534] font-semibold rounded-lg shadow-lg  transition-opacity duration-300">
  <a href="/sign-up">Join Now</a>
</button>

      </div>

      {/* Contact Section */}
      <div className="max-w-4xl w-full bg-white border border-gray-300 shadow-lg rounded-2xl p-8">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us</h3>
        <div className="text-lg text-gray-600 space-y-4">
          <p>
            <span className="font-semibold text-gray-900">Email:</span>{" "}
            <a
              href="mailto:valuevaultplatform@gmail.com"
              className="text-[#D4AF37] underline hover:text-[#B29F37] transition-colors"
            >
              valuevaultplatform@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Address:</span>{" "}
            Bangalore - 560, India
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center">
        <p className="text-lg text-#4e4e4e-600">
          Thank you for choosing{" "}
          <span className="font-semibold text-[#D4AF37]">Value Vault</span>. 
          We look forward to being part of your auction adventure!
        </p>
      </div>
    </div>
  );
};

export default About;
