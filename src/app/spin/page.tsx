"use client";

import React, { useState } from "react";
import "./styles/spin.css";

const SpinPage = () => {
  const prizes = ["2%", "3%", "4%", "5%"];
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string>("");
  const [uniqueCode, setUniqueCode] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0); // Track spinner rotation

  const generateRandomCode = () => {
    const min = 1;
    const max = 1500;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString().padStart(5, "0");
  };

  const handleSpin = async () => {
    if (isSpinning) return;

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[prizeIndex];
    const code = generateRandomCode();

    const randomDegrees = 360 * 5 + prizeIndex * (360 / prizes.length); // 5 full rotations + prize position
    setRotation((prev) => prev + randomDegrees); // Update rotation state
    setIsSpinning(true);

    setTimeout(async () => {
      try {
        const response = await fetch("/api/spin-result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, prize }),
        });

        if (response.ok) {
          const data = await response.json();
          setSelectedPrize(data.prize);
          setUniqueCode(data.code);
          setShowModal(true);
        } else {
          console.error("Failed to save spin result");
        }
      } catch (error) {
        console.error("Error saving spin result:", error);
      } finally {
        setIsSpinning(false);
      }
    }, 3000); // Match the CSS transition duration
  };


  const closeModal = () => {
    setShowModal(false);
  };

  return (
    
    <div className="spin-page">
      
      <div className="logo-container">
        <img src="/logo.png" alt="Company Logo" className="company-logo" />
        <img src="/logo-name.png" alt="Company Name" className="company-name" />
      </div>
      <div className="spinner-container">
        <div className="spinner">
          <button
            className="spin-button-inside"
            onClick={handleSpin}
            disabled={isSpinning}
          >
            {isSpinning ? "Spinning..." : "Spin To Win"}
          </button>
        </div>
      </div>

      {/* Modal for Prize */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You won: {selectedPrize}</p>
            <p>Your unique code: {uniqueCode}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      <div className="brands-container">
        <img src="/JC.png" alt="Brand 1" className="brand-logo" />
        <img src="/Accura.png" alt="Brand 2" className="brand-logo" />
        <img src="/Smart.png" alt="Brand 3" className="brand-logo" />
        <img src="/Hengliang.png" alt="Brand 4" className="brand-logo" />
      </div>
    </div>
  );
};

export default SpinPage;
