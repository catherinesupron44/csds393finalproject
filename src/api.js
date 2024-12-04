import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
const authToken = import.meta.env.VITE_REACT_APP_AUTH_TOKEN;

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
            'Content-Type': 'application/json',
            'authorizationToken' : authToken
          }
        }
      );
export const getActiveBets = async (user_id) => await axios.get(`${API_BASE_URL}/bets/getActiveBets`, {params : {user_id}, headers: {
  'authorizationToken' : authToken
} });
export const getBetHistory = async (user_id) => await axios.get(`${API_BASE_URL}/bets/getBetHistory`, {params : {user_id}, headers: {
  'authorizationToken' : authToken
} });
export const placeBet = async (user_id, market_id, side, odds, amount ) => 
  await axios.post(
      `${API_BASE_URL}/bets/placeBet`, 
      JSON.stringify({ 
        user_id, 
        market_id, 
        side, 
        odds,
        amount 
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'authorizationToken' : authToken
        }
      }
    );
export const settleBet = async (betId) => await axios.post(`${API_BASE_URL}/bets/settleBet`, { betId,         headers: {
  'authorizationToken' : authToken
} });
export const getCoins = async (user_id) => await axios.get(`${API_BASE_URL}/bets/getCoins`, {params : {user_id}, headers: {
  'authorizationToken' : authToken
}})

// Markets Endpoints
export const getActiveMarkets = async () => await axios.get(`${API_BASE_URL}/markets/getActiveMarkets`, {headers: {
  'authorizationToken' : authToken
}});
export const getMarketInformation = async (marketId) => await axios.get(`${API_BASE_URL}/markets/getMarketInformation`, { params: { marketId }, headers: {
  'authorizationToken' : authToken
} });

// Settle Market
export const settleMarket = async (market_id, outcome) => 
  await axios.post(
      `${API_BASE_URL}/markets/settleMarket`, 
      JSON.stringify({ 
        market_id,
        outcome
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'authorizationToken' : authToken
        }
      }
    );

export const getMyMarkets = async (userId) => axios.get(`${API_BASE_URL}/markets/getMyMarkets`, { params: { userId }, headers: {
  'authorizationToken' : authToken
}});

