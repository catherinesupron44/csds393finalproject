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
export const getActiveBets = async (user_id) => await axios.get(`${API_BASE_URL}/bets/getActiveBets`, {params : {user_id} });
export const getBetHistory = async (user_id) => await axios.get(`${API_BASE_URL}/bets/getBetHistory`, {params : {user_id} });
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
          'Content-Type': 'application/json'
        }
      }
    );
export const settleBet = async (betId) => await axios.post(`${API_BASE_URL}/bets/settleBet`, { betId });
export const getCoins = async (user_id) => await axios.get(`${API_BASE_URL}/bets/getCoins`, {params : {user_id} })

// Markets Endpoints
export const getActiveMarkets = async () => await axios.get(`${API_BASE_URL}/markets/getActiveMarkets`);
export const getMarketInformation = async (marketId) => await axios.get(`${API_BASE_URL}/markets/getMarketInformation`, { params: { marketId } });

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
          'Content-Type': 'application/json'
        }
      }
    );

export const getMyMarkets = async (userId) => axios.get(`${API_BASE_URL}/markets/getMyMarkets`, { params: { userId } });

