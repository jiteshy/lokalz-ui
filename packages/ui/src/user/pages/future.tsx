import {
  faCartShopping,
  faCreditCard,
  faFilter,
  faGaugeHigh,
  faIdCard,
  faNewspaper,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FuturePage = () => {
  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16 bg-white mb-10">
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            What&apos;s Coming?
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10"
            >
              <defs>
                <pattern
                  id="4314d5df-c4ea-4854-be21-f1fdbb6fe951"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#4314d5df-c4ea-4854-be21-f1fdbb6fe951)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">We</span>
          </span>{" "}
          have exciting stuff coming your way!
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          We&apos;re excited to share the enhancements and new functionalities
          we&apos;re working on to make your experience even better.
        </p>
      </div>
      <h2 className="text-deep-purple-400 font-sans text-3xl leading-none tracking-tight text-center my-5 font-bold">
        For Customers
      </h2>
      <div className="px-4 mx-auto md:py-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-8 sm:row-gap-0 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-8 border-b border-slate-300 sm:border-r">
            <div className="max-w-md m-auto text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faCartShopping} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Online Ordering and Delivery
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Soon, you will be able to order directly from your favorite
                local businesses through our platform. Whether it&apos;s a quick
                bite from a food truck or a unique craft from a local artisan,
                enjoy the convenience of online ordering and home delivery.
              </p>
            </div>
          </div>
          <div className="p-8 border-b border-slate-300 lg:border-r">
            <div className="max-w-md text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faNewspaper} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Real-Time Business Updates
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Stay updated with real-time notifications about your favorite
                businesses. Get alerts about new arrivals, special promotions,
                and live locations for mobile vendors like food trucks.
              </p>
            </div>
          </div>
          <div className="p-8 border-b border-slate-300 sm:border-r lg:border-r-0">
            <div className="max-w-md text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faStar} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                User Reviews and Ratings
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                We are introducing a review and rating system so you can share
                your experiences and read about others. Honest feedback helps
                businesses improve and helps consumers make informed decisions.
              </p>
            </div>
          </div>
          <div className="p-8 border-b border-slate-300 lg:border-b-0 lg:border-r">
            <div className="max-w-md text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faFilter} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Enhanced Search and Filtering
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Our new advanced search and filtering options will make it
                easier than ever to find exactly what you are looking for.
                Search by location, business type, product offerings, and more
                to discover local businesses that meet your needs.
              </p>
            </div>
          </div>
          <div className="p-8 border-b border-slate-300 sm:border-b-0 sm:border-r">
            <div className="max-w-md text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faCreditCard} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Secure Payment Gateway
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Your transactions will be more secure than ever with our new,
                robust payment gateway. Enjoy peace of mind with seamless and
                secure payments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="hidden sm:block border-b border-b-slate-200" />
      <h2 className="text-deep-purple-400 pt-8 font-sans text-3xl leading-none tracking-tight text-center my-5 font-bold">
        For Business Owners
      </h2>
      <div className="px-4 md:py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-8 sm:row-gap-0 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-8 border-b border-slate-300 sm:border-r">
            <div className="max-w-md m-auto text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faCartShopping} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Online Ordering and Delivery
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                With Online Ordering, your business can reach a broader
                audience. Customers will be able to discover and order from you
                with just a few clicks. This means more visibility and more
                potential sales.
              </p>
            </div>
          </div>
          <div className="p-8 border-b border-slate-300 lg:border-r">
            <div className="max-w-md text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faNewspaper} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Real-Time Business Updates
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Send real-time notifications about your business. Send alerts
                about live locations of your business e.g. food truck, new
                arrivals and special promotions.
              </p>
            </div>
          </div>
          <div className="p-8 border-b border-slate-300 sm:border-r lg:border-r-0">
            <div className="max-w-md text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faIdCard} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Business Profiles and Portfolios
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Businesses will soon have the ability to create detailed
                profiles and portfolios showcasing their offerings, story, and
                customer testimonials. This will give you deeper insights into
                the businesses you’re supporting.
              </p>
            </div>
          </div>
          <div className="p-8 border-b border-slate-300 lg:border-b-0 lg:border-r">
            <div className="max-w-md text-center">
              <div className="p-4 flex items-center justify-center w-12 h-12 mx-auto mb-4 sm:w-16 sm:h-16 rounded-full bg-indigo-50 text-deep-purple-400">
                <FontAwesomeIcon icon={faGaugeHigh} size="xl" />
              </div>
              <h6 className="mb-2 font-semibold leading-5 text-gray-900">
                Business Dashboard for Vendors
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Local business owners will gain access to a comprehensive
                dashboard where they can manage their profiles, track orders,
                engage with customers, and analyze their business performance
                with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
