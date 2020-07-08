import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken["access"]);
    setUser(user);
    authStorage.storeAccessToken(authToken["access"]);
    authStorage.storeRefreshToken(authToken["refresh"]);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeTokens();
  };

  return { user, logIn, logOut };
};
