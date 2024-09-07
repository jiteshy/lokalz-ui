import { User } from "next-auth";
import { CustomUser } from "@/utils/types";
import axios from "@/lib/axios-client";

// Fetch user from DB along with an access token
export const getUserFromDB = async (
  user: Partial<User>,
): Promise<CustomUser> => {
  const response = await axios.post("/auth/login/callback", user);
  return response.data;
};
