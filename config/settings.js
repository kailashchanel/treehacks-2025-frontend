import Constants from "expo-constants";

const settings = {
    dev: {
      apiUrl: "http://10.32.86.217:8000/api", // should be "https://192.168.1.201:8001/api"
    },
    staging: {
      apiUrl: "http://10.32.86.217:8000/api",
    },
    prod: {
      apiUrl: "http://10.32.86.217:8000/api",
    },
  };

const getCurrentSettings = () => {
    if (__DEV__) return settings.staging;
    if (Constants.manifest.releaseChannel === "staging") return settings.staging;
    return settings.prod;
};

export default getCurrentSettings();
