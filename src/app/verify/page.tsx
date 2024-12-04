"use client";

import React, { useState } from "react";
import "./styles/sales.css";

const SalesVerificationPage = () => {
  const [inputCode, setInputCode] = useState("");
  const [verificationResult, setVerificationResult] = useState("");
  const [verifiedCodes, setVerifiedCodes] = useState<{ code: string; prize: string }[]>([]);

  const handleVerify = async () => {
    if (!inputCode) {
      setVerificationResult("Please enter a code.");
      return;
    }

    try {
      // Send a request to the verify-code API
      const response = await fetch(`/api/verify-code?code=${inputCode.toUpperCase()}`);
      const data = await response.json();

      if (response.ok) {
        setVerificationResult(`Valid Code! Prize: ${data.prize}`);
        setVerifiedCodes((prev) => [...prev, { code: inputCode.toUpperCase(), prize: data.prize }].slice(-3)); // Keep last 3 entries
      } else {
        setVerificationResult(data.error || "Invalid Code. Please try again.");
      }
    } catch (error) {
      setVerificationResult("Failed to verify the code. Please try again later.");
    }

    setInputCode(""); // Clear the input field
  };

  return (
    <div className="sales-page">
      {/* Header */}
      <h1 className="sales-header">Sales Team Verification</h1>

      {/* Code Input Section */}
      <div className="verification-container">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter Code"
          className="code-input"
        />
        <button onClick={handleVerify} className="verify-button">
          Verify Code
        </button>
      </div>

      {/* Display Verification Result */}
      {verificationResult && <p className="verification-result">{verificationResult}</p>}

      {/* Display Recent Verified Codes */}
      {verifiedCodes.length > 0 && (
        <div className="verified-codes-container">
          <h2>Recent Verified Codes</h2>
          <table className="verified-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {verifiedCodes.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.code}</td>
                  <td>{entry.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesVerificationPage;