"use client";

import React, { useState, useEffect } from "react";
import "./styles/spin.css";
import Spinner from "./components/Spinner";

// Define PrizeType as a union of the available prizes
type PrizeType = "2%" | "3%" | "4%" | "5%";

const SpinPage = () => {
  const prizes: PrizeType[] = ["2%", "3%", "4%", "5%"];
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<PrizeType | "">(""); // State for selected prize
  const [uniqueCode, setUniqueCode] = useState<string>("");
  const [winners, setWinners] = useState<{ code: string; prize: string }[]>([]);

  // Fetch recent winners from the backend on component mount
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch("/api/spin-result");
        if (response.ok) {
          const data = await response.json();
          setWinners(data || []); // Set winners data
        } else {
          console.error("Failed to fetch winners:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching winners:", error);
      }
    };

    fetchWinners();
  }, []); // Empty array means this effect runs only once on mount

  const handleSpin = async () => {
    if (isSpinning) return; // Prevent spinning if already in progress

    setIsSpinning(true);
    const prizeIndex = Math.floor(Math.random() * prizes.length); // Random prize index
    const prize = prizes[prizeIndex];
    const code = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate unique code

    setTimeout(async () => {
      try {
        const response = await fetch("/api/spin-result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, prize }), // Send spin result
        });

        if (response.ok) {
          const savedWinner = await response.json(); // Get saved winner data
          setSelectedPrize(savedWinner.prize);
          setUniqueCode(savedWinner.code);
          setWinners((prev) => [savedWinner, ...prev].slice(0, 3)); // Keep last 3 winners
        } else {
          console.error("Failed to save spin result");
        }
      } catch (error) {
        console.error("Error saving spin result:", error);
      } finally {
        setIsSpinning(false);
      }
    }, 3000); // Simulate spin duration with a 3-second delay
  };

  return (
    <div className="spin-page">
      {/* Company Logo and Header */}
      <div className="logo-container">
        <img src="/logo.png" alt="Company Logo" className="company-logo" />
        <h1 className="company-header">Shree Aadinath Mercantile and Exports Pvt Ltd</h1>
      </div>

      {/* Spinner and Spin Button */}
      <div className="spinner-container">
        <Spinner isSpinning={isSpinning} selectedPrize={selectedPrize as PrizeType} />
        <button
          className="spin-button"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin the Wheel"}
        </button>
      </div>

      {/* Display Result after Spin */}
      {selectedPrize && uniqueCode && (
        <div className="result">
          <h2>Congratulations!</h2>
          <p>
            You won: <strong>{selectedPrize}</strong>
          </p>
          <p>
            Your code: <strong>{uniqueCode}</strong>
          </p>
        </div>
      )}

      {/* Recent Winners Table */}
      {winners.length > 0 && (
        <table className="winners-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => (
              <tr key={index}>
                <td>{winner.code}</td>
                <td>{winner.prize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <footer>© 2024 Shree Aadinath Mercantile and Exports Pvt Ltd</footer>
    </div>
  );
};

export default SpinPage;