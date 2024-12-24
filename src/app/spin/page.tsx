// SpinPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner"; // Assuming the path to Spinner.tsx is correct
import "./styles/spin.css";

const SpinPage = () => {
  const prizes = ["2%", "3%", "4%", "5%"]; // Define prize options
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string>("");
  const [uniqueCode, setUniqueCode] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const generateRandomCode = () => {
    const min = 1;
    const max = 1500;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString().padStart(5, "0");
  };

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[prizeIndex];
    const code = generateRandomCode();

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
        const err = error as Error;
        console.error("Error saving spin result:", err.message);
      } finally {
        setIsSpinning(false);
      }
    }, 3000); // Simulate spin duration
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
        <div className="wheel">
          <button
            className="spin-button-inside"
            onClick={handleSpin}
            disabled={isSpinning}
          >
            {isSpinning ? "Spinning..." : "SPIN"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You won: <strong>{selectedPrize}</strong></p>
            <p>Your unique number: <strong>{uniqueCode}</strong></p>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <footer>© 2024 My Mobile App</footer>
    </div>
  );
};

export default SpinPage;
