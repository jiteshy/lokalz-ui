import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

export const Logout = () => {
  return (
    <button
      type="submit"
      aria-label="Logout"
      onClick={() => signOut()}
      className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary"
    >
      <ExitIcon className="h-5 w-5" />
      Log Out
    </button>
  );
};
