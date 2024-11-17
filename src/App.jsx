import React from 'react';
import GetActiveBets from './components/GetActiveBets.jsx';
import GetBetHistory from './components/GetBetHistory.jsx';
import PlaceBet from './components/PlaceBet.jsx';
import SettleBet from './components/SettleBet.jsx';
import CreateGroup from './components/CreateGroup.jsx';
import GetActiveMarkets from './components/GetActiveMarkets.jsx';
import GetGroupId from './components/GetGroupId.jsx';
import GetGroupLeaderboard from './components/GetGroupLeaderboard.jsx';
import SetGroupId from './components/SetGroupId.jsx';
import GetMarketInformation from './components/GetMarketInformation.jsx';
import JoinGroup from './components/JoinGroup.jsx';
import LeaveGroup from './components/LeaveGroup.jsx';
import CreateMarket from './components/CreateMarket.jsx';
import GetGroupInformation from './components/GetGroupInformation.jsx';

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
