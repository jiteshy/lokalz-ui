import { auth } from "@/auth";
import { PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="w-full rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between items-center p-2 mb-3 bg-slate-200 dark:bg-boxdark-0 rounded mt-4 bg-gradient-to-r from-indigo-100 via-pink-50 to-indigo-100 dark:from-boxdark-0 dark:to-boxdark-0">
        <div className="flex items-center gap-2 rounded">
          <button className="border-0 text-slate-700 px-3 py-2 rounded text-sm bg-white font-semibold">
            Profile
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65 bg-gradient-to-br from-slate-500 to-boxdark"></div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 p-1 sm:h-44 sm:max-w-44 sm:p-3">
            {session?.user?.image ? (
              <div className="relative drop-shadow-2 rounded-full">
                <Image
                  src={session.user.image}
                  width={160}
                  height={160}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt="profile"
                  className="rounded-full mx-auto"
                />
              </div>
            ) : (
              <PersonIcon className="h-5 w-5" />
            )}
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {session?.user?.name}
            </h3>
            <p className="font-medium">Super Admin</p>

            <div className="mx-auto max-w-180">
              <p className="mt-4.5">
                You are logged in with your Google account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
