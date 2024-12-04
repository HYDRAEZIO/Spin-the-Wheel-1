import React, { useEffect, useState } from "react";
import "../styles/spin.css";

// Define the allowed prize types
type PrizeType = "2%" | "3%" | "4%" | "5%";

const Spinner = ({ isSpinning, selectedPrize }: { isSpinning: boolean; selectedPrize: PrizeType }) => {
  // Define the angles corresponding to each prize
  const prizeAngles: Record<PrizeType, number> = {
    "2%": 0,   // 0 degrees for the first prize
    "3%": 90,  // 90 degrees for the second prize
    "4%": 180, // 180 degrees for the third prize
    "5%": 270  // 270 degrees for the fourth prize
  };

  const [anchorRotation, setAnchorRotation] = useState(0);

  useEffect(() => {
    if (selectedPrize) {
      // Set the anchor rotation based on the selected prize
      setAnchorRotation(prizeAngles[selectedPrize]);
    }
  }, [selectedPrize]);

  return (
    <div className={`spinner ${isSpinning ? "spinning" : ""}`}>
      {/* Wheel Sections */}
      <div className="wheel-section">
        <span>2%</span>
      </div>
      <div className="wheel-section">
        <span>3%</span>
      </div>
      <div className="wheel-section">
        <span>4%</span>
      </div>
      <div className="wheel-section">
        <span>5%</span>
      </div>

      {/* Anchor at the selected prize position */}
      {/* <div
        className="anchor-container"
        style={{ transform: `translate(-50%, -50%) rotate(${anchorRotation}deg)` }}
      >
        <img src="/anchor.png" alt="Anchor" className="wheel-anchor" />
      </div> */}
    </div>
  );
};

export default Spinner;