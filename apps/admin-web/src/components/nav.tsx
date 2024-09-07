import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { auth, signOut } from "@/auth";
import { ExitIcon } from "@radix-ui/react-icons";

export const AdminNav = async () => {
  const session = await auth();

  return (
    <div className="px-6 py-5 mx-auto w-full">
      <div className="relative flex items-center justify-between">
        <h4 className="text-xl font-semibold text-slate-700">
          {session && `Welcome, ${session.user?.name}!`}
        </h4>
        <ul className="flex items-center space-x-8">
          <li>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="text-slate-700 items-center pl-4 whitespace-nowrap inline-flex transition-colors duration-200 hover:text-slate-800"
                aria-label="Logout"
              >
                <ExitIcon className="w-5 h-5" />
                <span className="pl-2">Logout</span>
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};
