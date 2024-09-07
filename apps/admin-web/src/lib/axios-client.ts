import axios from "axios";
import { ADMIN_API_BASE_PATH } from "@repo/ui/config";

const defaultOptions = {
  baseURL: ADMIN_API_BASE_PATH,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export default axios.create(defaultOptions);
