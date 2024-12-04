import React from 'react';
import GetActiveMarkets from "../components/GetActiveMarkets.jsx";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen" data-testid="dashboard-container">
      <div className="space-y-4">
        {/* Directly render the GetActiveMarkets component without the Active Markets container */}
        <GetActiveMarkets />
      </div>
    </div>
  );
}
