import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-[white]">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="w-full px-5 flex flex-col items-center justify-center min-h-screen bg-[#F5F5DC]">

      <div className="bg-[#F5F5DC] shadow-md mx-auto w-full max-w-5xl px-6 py-8 rounded-lg">
        <ProfileHeader user={user} />
        <ProfileDetails user={user} />
      </div>
    </section>
  );
};

/**
 * ProfileHeader Component
 * Displays the user's profile image and basic information.
 */
const ProfileHeader = ({ user }) => (
  <div className="flex flex-col items-center gap-4 mb-8">
    <img
      src={user.profileImage?.url || "/imageHolder.jpg"}
      alt="Profile"
      className="w-36 h-36 rounded-full border-4 border-[#D4AF37] shadow-md"
    />
    <h2 className="text-2xl font-semibold text-[#0C1C3D]">{user.userName}</h2>
  </div>
);

/**
 * ProfileDetails Component
 * Organizes the user's personal, payment, and other details into sections.
 */
const ProfileDetails = ({ user }) => (
  <>
      <div className="text-[#0C1C3D]">
    <Section  title="Personal Details">
      <DetailField label ="Username" value={user.userName} />
      <DetailField label="Email" value={user.email} />
      <DetailField label="Phone" value={user.phone} />
      <DetailField label="Address" value={user.address} />
      <DetailField label="Role" value={user.role} />
      <DetailField
        label="Joined On"
        value={user.createdAt?.substring(0, 10)}
      />
    </Section>

    {user.role === "Seller" && (
      <Section title="Payment Details">
        <DetailField
          label="Bank Name"
          value={user.paymentMethods.bankTransfer.bankName}
        />
        <DetailField
          label="Bank Account"
          value={user.paymentMethods.bankTransfer.bankAccountNumber}
        />
        <DetailField
          label="User Name On Bank Account"
          value={user.paymentMethods.bankTransfer.bankAccountName}
        />
        <DetailField
          label="UPI Number/Paypal EMail"
          value={user.paymentMethods.upipayment?.upinumber}
        />
      </Section>
    )}

    <Section title="Other User Details">
      {user.role === "Seller" && (
        <DetailField
          label="Unpaid Commissions"
          value={`₹${user.unpaidCommission}`}
        />
      )}
      {user.role === "Bidder" && (
        <>
          <DetailField label="Auctions Won" value={user.auctionsWon} />
          <DetailField
            label="Money Spent"
            value={`₹${user.moneySpent}`}
          />
        </>
      )}
    </Section>
    </div>
  </>
);

/**
 * Section Component
 * A reusable wrapper for different sections with consistent styling.
 */
const Section = ({ title, children }) => (
  <div className="mt-8">
    <h3 className="text-xl font-medium text-dark-gray border-b-2 border-gold pb-2">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">{children}</div>
  </div>
);

/**
 * DetailField Component
 * Renders a labeled, read-only input field with consistent styling.
 */
const DetailField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <input
      type="text"
      value={value || "Not Available"}
      readOnly
      className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-light-beige text-deep-navy focus:outline-none"
    />
  </div>
);

export default UserProfile;
