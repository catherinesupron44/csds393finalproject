import axios from 'axios';

const API_BASE_URL = 'https://1t61to83lk.execute-api.us-east-2.amazonaws.com/prod';

// Bets Endpoints
export const createMarket = async (userId, title, description, sides, odds, closing_date ) => 
    await axios.post(
        `${API_BASE_URL}/bets/createMarket`, 
        JSON.stringify({ 
          userId, 
          title, 
          description, 
          sides, 
          odds,
          closing_date 
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
export const getActiveBets = async () => await axios.get(`${API_BASE_URL}/bets/getActiveBets`);
export const getBetHistory = async () => await axios.get(`${API_BASE_URL}/bets/getBetHistory`);
export const placeBet = async (betData) => await axios.post(`${API_BASE_URL}/bets/placeBet`, betData);
export const settleBet = async (betId) => await axios.post(`${API_BASE_URL}/bets/settleBet`, { betId });

// Markets Endpoints
export const getActiveMarkets = async () => await axios.get(`${API_BASE_URL}/markets/getActiveMarkets`);
export const getMarketInformation = async (marketId) => await axios.get(`${API_BASE_URL}/markets/getMarketInformation`, { params: { marketId } });
export const settleMarket = async (marketId) => await axios.post(`${API_BASE_URL}/markets/settleMarket`, { marketId });
export const getMyMarkets = async (userId) => axios.post(`${API_BASE_URL}/markets/settleMarket`, userId);

// Profile and Group Endpoints
export const createGroup = async (groupData) => await axios.post(`${API_BASE_URL}/profile/createGroup`, groupData);
export const getGroupId = async (userId) => await axios.get(`${API_BASE_URL}/profile/getGroupId`, { params: { userId } });
export const getGroupInformation = async (groupId) => await axios.get(`${API_BASE_URL}/profile/getGroupInformation`, { params: { groupId } });
export const getGroupLeaderboard = async (groupId) => await axios.get(`${API_BASE_URL}/profile/getGroupLeaderboard`, { params: { groupId } });
export const joinGroup = async (groupId) => await axios.post(`${API_BASE_URL}/profile/joinGroup`, { groupId });
export const leaveGroup = async (groupId) => await axios.post(`${API_BASE_URL}/profile/leaveGroup`, { groupId });
export const setGroupId = async (userId, groupId) => await axios.post(`${API_BASE_URL}/profile/setGroupId`, { userId, groupId });

