import React from "react";
import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <div style={styles.container}>
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 style={styles.title}>
          <span style={styles.gradientText}>Your Auction Platform</span>
        </h1>
      </motion.div>

      {/* Animated Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        style={styles.subtitle}
      >
        Where Prestige Meets Opportunity
      </motion.p>

      {/* Shimmering Effect */}
      <motion.div
        className="shimmer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <div style={styles.shimmer}></div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "linear-gradient(135deg, #1D2A3B, #333333)",
    color: "#D4AF37", // Rich Gold
    fontFamily: "'Poppins', sans-serif",
    overflow: "hidden",
    position: "relative",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    margin: "0",
    textShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
  },
  gradientText: {
    background: "linear-gradient(90deg, #D4AF37, #F5F5DC)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.5rem",
    fontWeight: "300",
    color: "#F5F5DC",
    marginTop: "10px",
    textAlign: "center",
  },
  shimmer: {
    width: "200px",
    height: "5px",
    background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
    borderRadius: "50px",
    animation: "shimmer 1.5s infinite",
  },
};

// Add shimmer animation keyframes globally
const addGlobalStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shimmer {
      0% { transform: translateX(-200px); }
      100% { transform: translateX(200px); }
    }
    .shimmer {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0.8;
    }
  `;
  document.head.appendChild(style);
};

addGlobalStyles();

export default SplashScreen;
