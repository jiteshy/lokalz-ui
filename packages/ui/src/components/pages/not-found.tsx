import Image from "next/image";
import Link from "next/link";
import { ErrorImage, NotFoundImage } from "@repo/ui/assets";

export const NotFound = () => {
  return (
    <div className="bg-gray-50 lg:px-24 lg:py-24 md:py-20 md:px-44 p-8 md:p-24 min-h-[650px] flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div>
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you&apos;ve found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800">
                Sorry about that! Please try again or visit our hompage to get
                where you need to go.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/"
                  className="sm:w-full lg:w-auto my-2 border rounded py-2 md:py-4 px-8 text-center bg-deep-purple-accent-400 text-white hover:bg-deep-purple-accent-700 focus:outline-none focus:ring-2 focus:ring-deep-purple-accent-700 focus:ring-opacity-50"
                >
                  Take me home
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image src={NotFoundImage} alt="404 error image" />
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image src={ErrorImage} alt="404 error page illustration" />
      </div>
    </div>
  );
};
