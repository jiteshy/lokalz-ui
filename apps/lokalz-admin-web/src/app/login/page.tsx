"use client";

import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8 bg-slate-100">
      <div className="w-full max-w-sm bg-white border border-slate-300 rounded-lg p-8">
        <div>
          <h2 className="text-2xl text-slate-800">Login</h2>
          <span className="text-sm text-slate-500">
            Provide the key phrase for admin access
          </span>
        </div>
        <div className="">
          <div className="text-sm text-red-accent-700 h-8" aria-live="polite">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <form
            action={formAction}
            className="w-full flex items-center justify-between gap-3"
          >
            <input
              type="password"
              name="keyPhrase"
              required
              placeholder="Enter Key Phrase"
              className={`${
                errorMessage ? "border-red-accent-400" : "border-slate-400"
              } px-3 py-2 w-3/4 text-slate-900 transition duration-200 bg-white border rounded shadow-sm appearance-none focus:outline-none`}
            />
            <button
              type="submit"
              aria-disabled={isPending}
              disabled={isPending}
              className="w-1/4 px-3 py-2 bg-slate-700 text-slate-200 rounded hover:bg-slate-900 disabled:bg-slate-400"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
