import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const accessKey = "accessToken";
const refreshKey = "refreshToken";

const storeAccessToken = async (accessToken) => {
  try {
    await SecureStore.setItemAsync(accessKey, accessToken);
  } catch (error) {
    console.log("Error storing the access token", error);
  }
};

const storeRefreshToken = async (refreshToken) => {
  try {
    await SecureStore.setItemAsync(refreshKey, refreshToken);
  } catch (error) {
    console.log("Error storing the refresh token", error);
  }
};

const getAccessToken = async () => {
  try {
    return await SecureStore.getItemAsync(accessKey);
  } catch (error) {
    console.log("Error getting the access token", error);
  }
};

const getRefreshToken = async () => {
  try {
    return await SecureStore.getItemAsync(refreshKey);
  } catch (error) {
    console.log("Error getting the refresh token", error);
  }
};

const getUser = async () => {
  const token = await getAccessToken();
  return token ? jwtDecode(token) : null;
};

const removeTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(accessKey);
    await SecureStore.deleteItemAsync(refreshKey);
  } catch (error) {
    console.log("Error removing the auth tokens", error);
  }
};

export default {
  getAccessToken,
  getRefreshToken,
  getUser,
  removeTokens,
  storeAccessToken,
  storeRefreshToken,
};
