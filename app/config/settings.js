import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://10.0.0.13:8000/api/v1/",
    refreshEndpoint: "token/refresh/",
  },
  staging: {
    apiUrl: "https://api.joyfulete.com/api/v1/",
    refreshEndpoint: "token/refresh/",
  },
  prod: {
    apiUrl: "https://api.joyfulete.com/api/v1/",
    refreshEndpoint: "token/refresh/",
  },
};

const getCurrentsettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentsettings();
