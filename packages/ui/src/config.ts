export const CONFIG = {
  API_BASE_PATH:
    "https://my-json-server.typicode.com/jitesh-yadav/lokalz-fake-api",
  API_BASE_PATH2:
    "https://my-json-server.typicode.com/jiteshy/lokalz-fake-api2/menu",
};

const API_BASE_PATH = "https://lokalz.ioyogi.com:8443/rest/v1";
export const APIS = {
  AUTH: {
    CALLBACK: `${API_BASE_PATH}/auth/login/callback`,
  },
  STORE: {
    STORES_LIST: `${API_BASE_PATH}/store/zip`,
    STORE_DETAILS: `${API_BASE_PATH}/store`,
  },
  THIRD_PARTY: {
    FETCH_IP: "https://api.ipify.org/?format=json",
    FETCH_LOCATION_FROM_IP: "https://ipapi.co/",
  },
};
