import React from "react";
import "../styles/spin.css"; // Assuming path is correct

interface SpinnerProps {
  isSpinning: boolean;
  selectedPrize: string;
}

const Spinner: React.FC<SpinnerProps> = ({ isSpinning, selectedPrize }) => {
  return (
    <div className={`spinner ${isSpinning ? "spinning" : ""}`}>
      <div className="wheel-section">
        <span></span>
      </div>
      <div className="wheel-section">
        <span></span>
      </div>
      <div className="wheel-section">
        <span></span>
      </div>
      <div className="wheel-section">
        <span></span>
      </div>

      <div className="spinner-button-container">
        <button
          className="spin-button-inside"
          onClick={(e) => e.stopPropagation()} // Prevent triggering the parent's click
        >
          {isSpinning ? "Spinning..." : "SPIN"}
        </button>
      </div>
    </div>
  );
};

export default Spinner;