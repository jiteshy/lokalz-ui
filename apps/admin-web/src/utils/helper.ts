import { ADMIN_APIS } from "@repo/ui/config";
import { User } from "next-auth";
import { CustomUser } from "@/utils/types";

// Fetch user from DB along with an access token
export const getUserFromDB = async (
  user: Partial<User>,
): Promise<CustomUser> => {
  console.log('Fetching user--', user)
  try {
    const response = await fetch(ADMIN_APIS.AUTH.ADMIN.CALLBACK, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const customUser: CustomUser = await response.json();
    return customUser;
  } catch (error) {
    console.log(error);
    return {accessToken: '', role: '', token: ''};
  }
};
