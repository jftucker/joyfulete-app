import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://10.0.0.146:8000/api/v1/",
    refreshEndpoint: "token/refresh/",
  },
  staging: {
    apiUrl: "http://10.0.0.146:9000/api",
    refreshEndpoint: "token/refresh/",
  },
  prod: {
    apiUrl: "http://10.0.0.146:9000/api",
    refreshEndpoint: "token/refresh/",
  },
};

const getCurrentsettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentsettings();
