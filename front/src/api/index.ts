import axios from "axios";

const ROOT_URL = "http://localhost:3000";

const getAssets = async () => {
  try {
    const response = await axios.get(`${ROOT_URL}/assets`);
    return response;
  } catch (error) {
    return error
  }
};

const getTrades = async () => {
  try {
    const response = await axios.get(`${ROOT_URL}/trades`);
    return response;
  } catch (error) {
    return error;
  }
};

const getLastTrades = async (id: number|string) => {
  try {
    const response = await axios.get(`${ROOT_URL}/trades?asset_id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

const getSymbolInfo = async (id: number | string) => {
  try {
    const response = await axios.get(`${ROOT_URL}/assets/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

const getSupply = async (id: number | string) => {
  try {
    const response = await axios.get(`${ROOT_URL}/bidasks?asset_id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

const callAPI = {
  getAssets,
  getTrades,
  getLastTrades,
  getSymbolInfo,
  getSupply,
};

export default callAPI;