// src/App.js

import React from 'react';
import GetActiveBets from './components/GetActiveBets';
import GetBetHistory from './components/GetBetHistory';
import PlaceBet from './components/PlaceBet';
import SettleBet from './components/SettleBet';
import CreateGroup from './components/CreateGroup';
import GetActiveMarkets from './components/GetActiveMarkets';
import GetGroupId from './components/GetGroupId';
import GetGroupLeaderboard from './components/GetGroupLeaderboard';
import SetGroupId from './components/SetGroupId';
import GetMarketInformation from './components/GetMarketInformation';
import JoinGroup from './components/JoinGroup';
import LeaveGroup from './components/LeaveGroup';
import CreateMarket from './components/CreateMarket';
import GetGroupInformation from './components/GetGroupInformation';

const App = () => {
  return (
    <div>
      <h1>Betting Platform</h1>
      <GetActiveBets />
      <GetBetHistory />
      <PlaceBet />
      <SettleBet />
      <CreateGroup />
      <GetActiveMarkets />
      <GetGroupId />
      <GetGroupLeaderboard />
      <SetGroupId />
      <GetMarketInformation />
      <JoinGroup />
      <LeaveGroup />
      <CreateMarket />
      <GetGroupInformation />
      {/* Render other components here as needed */}
    </div>
  );
};

export default App;
