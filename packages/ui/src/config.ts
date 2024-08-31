// User config
const API_BASE_PATH = "https://lokalz.ioyogi.com:8443/rest/v1";
export const USER_APIS = {
  STORE: {
    STORES_LIST: `${API_BASE_PATH}/store/zip`,
    STORE_DETAILS: `${API_BASE_PATH}/store`,
  },
  THIRD_PARTY: {
    FETCH_IP: "https://api.ipify.org/?format=json",
    FETCH_LOCATION_FROM_IP: "https://ipapi.co/",
  },
};

// Admin config
const ADMIN_API_BASE_PATH = "https://lokalz.ioyogi.com:9443/rest/v1";
export const ADMIN_APIS = {
  AUTH: {
    ADMIN: {
      CALLBACK: `${ADMIN_API_BASE_PATH}/auth/login/callback`,
    },
  },
  STORE: {
    STORES_LIST: `${ADMIN_API_BASE_PATH}/store/list`,
    STORE_DETAILS: `${ADMIN_API_BASE_PATH}/store`,
  },
};
