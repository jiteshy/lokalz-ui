import Image from "next/image";
import Link from "next/link";
import errorCode from "../../assets/images/404.png";
import errorIllustration from "../../assets/images/error.png";

export const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div className="ui-bg-gray-50 lg:ui-px-24 lg:ui-py-24 md:ui-py-20 md:ui-px-44 ui-p-8 md:ui-p-24 ui-min-h-[650px] ui-flex ui-justify-center ui-flex-col-reverse lg:ui-flex-row md:ui-gap-28 ui-gap-16">
      <div className="xl:ui-pt-24 ui-w-full xl:ui-w-1/2 ui-relative ui-pb-12 lg:ui-pb-0">
        <div className="ui-relative">
          <div className="ui-absolute">
            <div>
              <h1 className="ui-my-2 ui-text-gray-800 ui-font-bold ui-text-2xl">
                Looks like you&apos;ve found the doorway to the great nothing
              </h1>
              <p className="ui-my-2 ui-text-gray-800">
                Sorry about that! Please try again or visit our hompage to get
                where you need to go.
              </p>
              <div className="ui-flex ui-gap-3">
                <button
                  className="sm:ui-w-full lg:ui-w-auto ui-my-2 ui-border ui-rounded ui-py-2 md:ui-py-4 ui-px-8 ui-text-center ui-bg-deep-purple-accent-400 ui-text-white hover:ui-bg-deep-purple-accent-700 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-deep-purple-accent-700 focus:ui-ring-opacity-50"
                  onClick={() => reset()}
                >
                  Try again
                </button>
                <Link
                  href="/"
                  className="sm:ui-w-full lg:ui-w-auto ui-my-2 ui-border ui-rounded ui-py-2 md:ui-py-4 ui-px-8 ui-text-center ui-bg-deep-purple-accent-400 ui-text-white hover:ui-bg-deep-purple-accent-700 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-deep-purple-accent-700 focus:ui-ring-opacity-50"
                >
                  Take me home
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image src={errorCode} alt="404 error image" />
          </div>
        </div>
      </div>
      <div className="ui-hidden lg:ui-block">
        <Image src={errorIllustration} alt="404 error page illustration" />
      </div>
    </div>
  );
};
