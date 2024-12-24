"use client";

import React, { useState } from "react";
import "./styles/sales.css";

const VerifyPage = () => {
  const [searchCode, setSearchCode] = useState<string>(""); // Input value for searching
  const [searchResult, setSearchResult] = useState<any>(null); // Store the search result
  const [errorMessage, setErrorMessage] = useState<string>(""); // Store error messages
  const [successMessage, setSuccessMessage] = useState<string>(""); // Success messages

  // Handle search
  const handleSearch = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!searchCode) {
      setErrorMessage("Please enter a code to search.");
      return;
    }

    try {
      const response = await fetch(`/api/verify-code?code=${searchCode}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to search code.");
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Error searching for code:", error);
      setErrorMessage("An error occurred while searching.");
    }
  };

  // Handle redeeming a searched code
  const redeemCode = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!searchResult || searchResult.redeemed) {
      setErrorMessage("Code is already redeemed or invalid.");
      return;
    }

    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: searchResult.code, redeem: true }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setSearchResult(updatedData); // Update the result with redeemed status
        setSuccessMessage("Code redeemed successfully!");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to redeem code.");
      }
    } catch (error) {
      console.error("Error redeeming code:", error);
      setErrorMessage("An error occurred while redeeming the code.");
    }
  };

  return (
    <div className="verify-page">
      <h1>Search and Redeem Code</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter code to search"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Display search result */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {searchResult && (
        <div className="search-result">
          <p><strong>Code:</strong> {searchResult.code}</p>
          <p><strong>Prize:</strong> {searchResult.prize}</p>
          <p>
            <strong>Status:</strong> {searchResult.redeemed ? "Redeemed" : "Not Redeemed"}
          </p>
          {!searchResult.redeemed && (
            <button onClick={redeemCode} className="redeem-button">
              Redeem
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyPage;