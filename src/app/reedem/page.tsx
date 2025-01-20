"use client";

import React, { useEffect, useState } from "react";
import "../reedem/styles/reedem.css";

const RedeemPage = () => {
  const [loading, setLoading] = useState(true);
  const [prizeDetails, setPrizeDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrize = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        setError("Invalid or missing code.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/redeem?code=${code}`);
        if (response.ok) {
          const data = await response.json();
          setPrizeDetails(data);
        } else {
          const err = await response.json();
          setError(err.error || "Failed to fetch prize details.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrize();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="redeem-page">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You won: <strong>{prizeDetails.prize}</strong></p>
        <p>Your code: <strong>{prizeDetails.code}</strong></p>
      </div>
    </div>
  );
};

export default RedeemPage;