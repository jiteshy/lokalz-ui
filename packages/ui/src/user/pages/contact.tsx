import { Title } from "../components";

export const ContactPage = () => {
  return (
    <div className="ui-px-8 ui-py-8 ui-mx-auto ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl md:ui-px-24 lg:ui-py-16 ui-bg-white">
      <div className="ui-max-w-xl ui-mb-10 md:ui-mx-auto ui-text-center lg:ui-max-w-2xl md:ui-mb-12">
        <div>
          <p className="ui-inline-block ui-px-3 ui-py-px ui-mb-4 ui-text-xs ui-font-semibold ui-tracking-wider ui-text-teal-900 ui-uppercase ui-rounded-full ui-bg-teal-accent-400">
            Contact Us
          </p>
        </div>
        <Title title="Get in touch with us" />
        <p className="ui-text-base ui-text-gray-700 md:ui-text-lg">
          We would love to hear from you! Whether you have questions, or want to
          provide feedback, please get in touch with us. Please write us at
          <a
            className="ui-text-deep-purple-accent-700"
            href="mailto:info@lokalz.com"
          >
            {" "}
            info@lokalz.com
          </a>{" "}
          or use below form.
        </p>
      </div>
      <div className="ui-w-full lg:ui-w-3/4 ui-m-auto">
        <div className="ui-bg-white ui-rounded ui-shadow-2xl ui-p-7 ui-mb-10 sm:ui-p-10 ui-border-t-4 ui-border-t-deep-purple-400">
          <h3 className="ui-text-xl ui-font-semibold sm:ui-text-left ui-mb-6 sm:ui-text-2xl ui-text-gray-900">
            Contact us
          </h3>
          <form>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="name"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Your Name*
              </label>
              <input
                placeholder="Name"
                required
                type="text"
                className="ui-flex-grow ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="name"
              />
            </div>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="email"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Your Email*
              </label>
              <input
                placeholder="Email"
                required
                type="email"
                className="ui-flex-grow ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="email"
              />
            </div>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="phone"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                Your Phone
              </label>
              <input
                placeholder="Phone"
                required
                type="text"
                className="ui-flex-grow ui-w-full ui-h-12 ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="phone"
              />
            </div>
            <div className="ui-mb-1 sm:ui-mb-2">
              <label
                htmlFor="query"
                className="ui-inline-block ui-mb-1 ui-font-medium ui-text-gray-900"
              >
                How can we help you?{" "}
                <span className="ui-text-sm ui-text-gray-600">
                  (Max 1000 chars)
                </span>
                *
              </label>
              <textarea
                rows={5}
                required
                className="ui-flex-grow ui-w-full ui-px-4 ui-mb-2 ui-transition ui-duration-200 ui-bg-white ui-border ui-border-gray-300 ui-rounded ui-shadow-sm ui-appearance-none focus:ui-border-deep-purple-accent-400 focus:ui-outline-none focus:ui-shadow-outline"
                name="query"
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
