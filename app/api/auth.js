import client from "./client";

const login = (username, password) =>
  client.post("/token/", { username, password });

const refresh = (refreshToken) =>
  client.post("/token/refresh/", { refreshToken });

export default {
  login,
  refresh,
};
