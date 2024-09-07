// User config
export const API_BASE_PATH = "https://lokalz.ioyogi.com:8443/rest/v1";
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
export const ADMIN_API_BASE_PATH = "https://lokalz.ioyogi.com:9443/rest/v1";
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

export const ZIPCODE_REGEX = /^\d{5}$/;

export const US_STATES = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};
