import { Title } from "../components";

export const OnboardPage = () => {
  return (
    <div className="ui-px-8 ui-py-8 ui-mx-auto ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl md:ui-px-24 lg:ui-py-16 ui-bg-white">
      <div className="ui-max-w-xl ui-mb-10 md:ui-mx-auto ui-text-center lg:ui-max-w-2xl md:ui-mb-12">
        <div>
          <p className="ui-inline-block ui-px-3 ui-py-px ui-mb-4 ui-text-xs ui-font-semibold ui-tracking-wider ui-text-teal-900 ui-uppercase ui-rounded-full ui-bg-teal-accent-400">
            Vendor Onboarding
          </p>
        </div>
        <Title title="Onboarding Local Businesses" />
        <p className="ui-text-base ui-text-gray-700 md:ui-text-lg">
          We are excited to have you join our community of local businesses.
          While we work on the business owner dashboard, please fill out the
          form below, and we will contact you to complete your onboarding. You
          can also write us at
          <a
            className="ui-text-deep-purple-accent-700"
            href="mailto:info@lokalz.com"
          >
            {" "}
            info@lokalz.com
          </a>
          .
        </p>
      </div>
      <div className="ui-w-full lg:ui-w-3/4 ui-m-auto">
        <div className="ui-bg-white ui-mb-10 ui-rounded ui-shadow-2xl ui-p-7 sm:ui-p-10 ui-border-t-4 ui-border-t-deep-purple-400">
          <h3 className="ui-text-xl ui-font-semibold sm:ui-text-left ui-mb-6 sm:ui-text-2xl ui-text-gray-900">
            Contact us for onboarding
          </h3>
          <form>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="businessName"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Business Name*
              </label>
              <input
                placeholder="Business Name"
                required
                type="text"
                className="ui-flex-grow ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="businessName"
              />
            </div>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="businessOwnerName"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Business Owner Name*
              </label>
              <input
                placeholder="Business Owner Name"
                required
                type="text"
                className="ui-flex-grow ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="businessOwnerName"
              />
            </div>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="businessEmail"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Contact Email*
              </label>
              <input
                placeholder="Contact Email"
                required
                type="email"
                className="ui-flex-grow ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="businessEmail"
              />
            </div>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="businessPhone"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Contact Phone
              </label>
              <input
                placeholder="Contact Phone"
                required
                type="text"
                className="ui-flex-grow ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="businessPhone"
              />
            </div>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="businessType"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Business Type*
              </label>
              <input
                placeholder="E.g. Food Truck"
                required
                type="text"
                className="ui-flex-grow ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="businessType"
              />
            </div>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="businessDetails"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Business Details{" "}
                <span className="ui-text-sm ui-text-gray-600">(Max 1000 chars)</span>*
              </label>
              <textarea
                placeholder="Business details"
                rows={5}
                required
                className="ui-flex-grow ui-w-full ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="businessDetails"
              ></textarea>
            </div>
            <div className="ui-mt-4 ui-mb-2 sm:ui-mb-4">
              <button
                type="submit"
                className="ui-inline-flex ui-items-center ui-justify-center ui-w-full ui-h-12 ui-px-6 ui-font-medium ui-tracking-wide ui-text-white ui-transition ui-duration-200 ui-rounded ui-shadow-md ui-bg-deep-purple-accent-400 hover:ui-bg-deep-purple-accent-700 focus:ui-shadow-outline focus:ui-outline-none"
              >
                Send
              </button>
            </div>
            <p className="ui-text-center ui-text-gray-600">
              We will get in touch with you soon!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
