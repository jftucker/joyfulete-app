import client from "./client";

const getUser = (userId) => client.get("/users/" + userId);

const register = (userInfo) => client.post("/users", userInfo);

export default { getUser, register };
