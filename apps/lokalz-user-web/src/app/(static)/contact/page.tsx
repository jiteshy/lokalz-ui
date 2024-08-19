export default function ContactPage() {
  return (
    <div className="px-4 py-8 mx-auto max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16 bg-white">
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Contact Us
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 block"
            >
              <defs>
                <pattern
                  id="27df4f81-c854-45de-942a-fe90f7a300f9"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#27df4f81-c854-45de-942a-fe90f7a300f9)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Get</span>
          </span>{" "}
          in touch with us
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          We would love to hear from you! Whether you have questions, or want to
          provide feedback, please get in touch with us. Please write us at
          <a
            className="text-deep-purple-accent-700"
            href="mailto:info@lokalz.com"
          >
            {" "}
            info@lokalz.com
          </a>{" "}
          or use below form.
        </p>
      </div>
      <div className="w-full lg:w-3/4 m-auto">
        <div className="bg-white rounded shadow-2xl p-7 mb-10 sm:p-10 border-t-4 border-t-deep-purple-400">
          <h3 className="text-xl font-semibold sm:text-left mb-6 sm:text-2xl text-gray-900">
            Contact us
          </h3>
          <form>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="name"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Your Name*
              </label>
              <input
                placeholder="Name"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                name="name"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="email"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Your Email*
              </label>
              <input
                placeholder="Email"
                required
                type="email"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                name="email"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="phone"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                Your Phone
              </label>
              <input
                placeholder="Phone"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                name="phone"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="query"
                className="inline-block mb-1 font-medium text-gray-900"
              >
                How can we help you?{" "}
                <span className="text-sm text-gray-600">(Max 1000 chars)</span>*
              </label>
              <textarea
                rows={5}
                required
                className="flex-grow w-full px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                name="query"
              ></textarea>
            </div>
            <div className="mt-4 mb-2 sm:mb-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Send
              </button>
            </div>
            <p className="text-center text-gray-600">
              We will get in touch with you soon!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
