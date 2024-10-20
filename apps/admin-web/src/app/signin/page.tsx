import { Metadata } from "next";
import { MixIcon } from "@radix-ui/react-icons";
import { DarkModeSwitcher } from "@repo/ui/components";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lokalz - Admin | Login",
  description: "Login to manage your stores",
};

export default function SignIn() {
  return (
    <div className="from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br dark:from-boxdark dark:to-boxdark-0">
      <div className="px-6 sm:px-10 py-6 flex items-center justify-between">
      <Link
            href="/store/list"
            className="flex gap-3 items-center text-2xl text-slate-100"
          >
            {/* TO-DO: Replace with lokalz icon */}
            <MixIcon className="h-6 w-6" />{" "}
            <div className="flex items-baseline gap-2">
              <span className="font-medium">Lokalz</span>{" "}
              <span className="text-xs text-whiten">ADMIN</span>
            </div>
          </Link>
        <DarkModeSwitcher />
      </div>
    <div className="relative p-6 w-full min-h-screen flex justify-center items-center mx-auto">
      <div className="w-full sm:w-125 p-6 md:p-10 md:pb-6 rounded-xl shadow-default bg-black">
        <div className="flex flex-col items-center gap-4 pt-6 text-whiten mx-auto">
          <div className="bg-black dark:bg-black shadow-default p-8 rounded-full text-slate-300 -mt-32">
            <MixIcon className="h-16 w-16" />
          </div>
          <div className="flex items-baseline gap-2 pb-4 -mt-3">
            <span className="font-medium text-3xl">Lokalz</span>
            <span className="text-xs">ADMIN</span>
          </div>
          <div className="w-full text-center">
            <p className="text-slate-300 text-sm">
              Welcome Back! Sign in to manage your stores.
            </p>
          </div>
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border text-boxdark-2 border-slate-300 bg-slate-200 p-3 hover:bg-slate-100 dark:text-slate-200 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_191_13499)">
                    <path
                      d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                      fill="#4285F4"
                    />
                    <path
                      d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                      fill="#34A853"
                    />
                    <path
                      d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                      fill="#EB4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_191_13499">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Sign in with Google
            </button>
          </form>
          {/* <div className="text-muted-foreground text-xs">
            By continuing, you agree to Lokalz's
            <Button
              variant="link"
              className="text-xs pl-1 text-muted-foreground underline"
              onClick={() => {}}
            >
              Terms of Service
            </Button>{" "}
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
}
