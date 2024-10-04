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
import { Title } from "../components";

export const FuturePage = () => {
  return (
    <div className="ui-px-8 ui-py-8 ui-mx-auto sm:ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl md:ui-px-24 lg:ui-py-16 ui-bg-white ui-mb-10">
      <div className="ui-max-w-xl ui-mb-10 md:ui-mx-auto ui-text-center lg:ui-max-w-2xl md:ui-mb-12">
        <div>
          <p className="ui-inline-block ui-px-3 ui-py-px ui-mb-4 ui-text-xs ui-font-semibold ui-tracking-wider ui-text-teal-900 ui-uppercase ui-rounded-full ui-bg-teal-accent-400">
            What&apos;s Coming?
          </p>
        </div>
        <Title title="We have exciting stuff coming your way!" />
        <p className="ui-text-base ui-text-gray-700 md:ui-text-lg">
          We&apos;re excited to share the enhancements and new functionalities
          we&apos;re working on to make your experience even better.
        </p>
      </div>
      <h2 className="ui-text-deep-purple-400 ui-font-sans ui-text-3xl ui-leading-none ui-tracking-tight ui-text-center ui-my-5 ui-font-bold">
        For Customers
      </h2>
      <div className="ui-px-4 ui-mx-auto md:ui-py-8 sm:ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl md:ui-px-24 lg:ui-px-8">
        <div className="ui-grid ui-row-gap-8 sm:ui-row-gap-0 sm:ui-grid-cols-2 lg:ui-grid-cols-3">
          <div className="ui-p-8 ui-border-b ui-border-slate-300 sm:ui-border-r">
            <div className="ui-max-w-md ui-m-auto ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faCartShopping} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                Online Ordering and Delivery
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
                Soon, you will be able to order directly from your favorite
                local businesses through our platform. Whether it&apos;s a quick
                bite from a food truck or a unique craft from a local artisan,
                enjoy the convenience of online ordering and home delivery.
              </p>
            </div>
          </div>
          <div className="ui-p-8 ui-border-b ui-border-slate-300 lg:ui-border-r">
            <div className="ui-max-w-md ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faNewspaper} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                Real-Time Business Updates
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
                Stay updated with real-time notifications about your favorite
                businesses. Get alerts about new arrivals, special promotions,
                and live locations for mobile vendors like food trucks.
              </p>
            </div>
          </div>
          <div className="ui-p-8 ui-border-b ui-border-slate-300 sm:ui-border-r lg:ui-border-r-0">
            <div className="ui-max-w-md ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faStar} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                User Reviews and Ratings
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
                We are introducing a review and rating system so you can share
                your experiences and read about others. Honest feedback helps
                businesses improve and helps consumers make informed decisions.
              </p>
            </div>
          </div>
          <div className="ui-p-8 ui-border-b ui-border-slate-300 lg:ui-border-b-0 lg:ui-border-r">
            <div className="ui-max-w-md ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faFilter} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                Enhanced Search and Filtering
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
                Our new advanced search and filtering options will make it
                easier than ever to find exactly what you are looking for.
                Search by location, business type, product offerings, and more
                to discover local businesses that meet your needs.
              </p>
            </div>
          </div>
          <div className="ui-p-8 ui-border-b ui-border-slate-300 sm:ui-border-b-0 sm:ui-border-r">
            <div className="ui-max-w-md ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faCreditCard} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                Secure Payment Gateway
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
                Your transactions will be more secure than ever with our new,
                robust payment gateway. Enjoy peace of mind with seamless and
                secure payments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="ui-hidden sm:ui-block ui-border-b ui-border-b-slate-200" />
      <h2 className="ui-text-deep-purple-400 ui-pt-8 ui-font-sans ui-text-3xl ui-leading-none ui-tracking-tight ui-text-center ui-my-5 ui-font-bold">
        For Business Owners
      </h2>
      <div className="ui-px-4 md:ui-py-8 ui-mx-auto sm:ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl md:ui-px-24 lg:ui-px-8">
        <div className="ui-grid ui-row-gap-8 sm:ui-row-gap-0 sm:ui-grid-cols-2 lg:ui-grid-cols-3">
          <div className="ui-p-8 ui-border-b ui-border-slate-300 sm:ui-border-r">
            <div className="ui-max-w-md ui-m-auto ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faCartShopping} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                Online Ordering and Delivery
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
                With Online Ordering, your business can reach a broader
                audience. Customers will be able to discover and order from you
                with just a few clicks. This means more visibility and more
                potential sales.
              </p>
            </div>
          </div>
          <div className="ui-p-8 ui-border-b ui-border-slate-300 lg:ui-border-r">
            <div className="ui-max-w-md ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faNewspaper} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                Real-Time Business Updates
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
                Send real-time notifications about your business. Send alerts
                about live locations of your business e.g. food truck, new
                arrivals and special promotions.
              </p>
            </div>
          </div>
          <div className="ui-p-8 ui-border-b ui-border-slate-300 sm:ui-border-r lg:ui-border-r-0">
            <div className="ui-max-w-md ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faIdCard} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                Business Profiles and Portfolios
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
                Businesses will soon have the ability to create detailed
                profiles and portfolios showcasing their offerings, story, and
                customer testimonials. This will give you deeper insights into
                the businesses you’re supporting.
              </p>
            </div>
          </div>
          <div className="ui-p-8 ui-border-b ui-border-slate-300 lg:ui-border-b-0 lg:ui-border-r">
            <div className="ui-max-w-md ui-text-center">
              <div className="ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mx-auto ui-mb-4 sm:ui-w-16 sm:ui-h-16 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
                <FontAwesomeIcon icon={faGaugeHigh} size="xl" />
              </div>
              <h6 className="ui-mb-2 ui-font-semibold ui-leading-5 ui-text-gray-900">
                Business Dashboard for Vendors
              </h6>
              <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
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
