import {
  faBolt,
  faCircleQuestion,
  faHandshakeSimple,
  faMapLocationDot,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Title } from "../components";

export const AboutPage = () => {
  return (
    <div className="ui-px-8 ui-py-8 ui-mx-auto ui-max-w-xl md:ui-max-w-full lg:ui-max-w-screen-xl md:ui-px-24 lg:ui-py-16 ui-bg-white">
      <div className="ui-max-w-xl ui-mb-10 md:ui-mx-auto ui-text-center lg:ui-max-w-2xl md:ui-mb-12">
        <div>
          <p className="ui-inline-block ui-px-3 ui-py-px ui-mb-4 ui-text-xs ui-font-semibold ui-tracking-wider ui-text-teal-900 ui-uppercase ui-rounded-full ui-bg-teal-accent-400">
            About Us
          </p>
        </div>
        <Title title="Welcome to Lokalz" />
        <p className="ui-text-base ui-text-gray-700 md:ui-text-lg">
          In an era where local businesses form the heart of our communities, we
          are on a mission to bring them closer to you. Lokalz is your go-to
          platform for discovering a wide array of local businesses—from food
          trucks and market vendors to home-based businesses and more.
        </p>
      </div>
      <div className="ui-grid ui-max-w-screen-lg ui-gap-8 ui-row-gap-10 ui-mx-auto lg:ui-grid-cols-2">
        <div className="ui-flex ui-max-w-md ui-mx-auto ui-flex-row">
          <div className="ui-mr-4 ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mb-4 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
            <FontAwesomeIcon icon={faBolt} size="xl" />
          </div>
          <div>
            <h6 className="ui-mb-3 ui-text-xl ui-font-bold ui-leading-5 ui-text-gray-900">
              Our Vision
            </h6>
            <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
              Our vision is to create a thriving ecosystem where local
              businesses can flourish and connect with their communities. We
              believe in the power of supporting local, and we aim to bridge the
              gap between consumers and the unique offerings that often go
              unnoticed.
            </p>
          </div>
        </div>
        <div className="ui-flex ui-max-w-md ui-mx-auto ui-flex-row">
          <div className="ui-mr-4 ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mb-4 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
            <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
          </div>
          <div>
            <h6 className="ui-mb-3 ui-text-xl ui-font-bold ui-leading-5 ui-text-gray-900">
              What We Do
            </h6>
            <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
              Lokalz is designed to simplify your search for local treasures.
              Whether you are craving the latest food truck cuisine, looking for
              unique handmade crafts, or seeking home-grown produce, our
              platform provides a seamless experience to find exactly what you
              need. We aggregate businesses that were previously scattered
              across social media and individual websites, bringing them all to
              one convenient location.
            </p>
          </div>
        </div>
        <div className="ui-flex ui-max-w-md ui-mx-auto ui-flex-row">
          <div className="ui-mr-4 ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mb-4 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
            <FontAwesomeIcon icon={faPaperPlane} size="xl" />
          </div>
          <div>
            <h6 className="ui-mb-3 ui-text-xl ui-font-bold ui-leading-5 ui-text-gray-900">
              Our Future Plans
            </h6>
            <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
              We are just getting started. In the near future, Lokalz will
              expand its services to include ordering functionalities, making it
              even easier for you to support your favorite local businesses.
              Imagine browsing, selecting, and purchasing from your favorite
              vendors all within our platform—convenient and hassle-free.
            </p>
            <a
              href="/future"
              aria-label=""
              className="ui-inline-flex ui-items-center ui-font-semibold ui-transition-colors ui-duration-200 ui-text-deep-purple-accent-400 hover:ui-text-deep-purple-800"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="ui-flex ui-max-w-md ui-mx-auto ui-flex-row">
          <div className="ui-mr-4 ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mb-4 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
            <FontAwesomeIcon icon={faMapLocationDot} size="xl" />
          </div>
          <div>
            <h6 className="ui-mb-3 ui-text-xl ui-font-bold ui-leading-5 ui-text-gray-900">
              Why Local Matters
            </h6>
            <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
              Supporting local businesses means investing in the growth and
              sustainability of our communities. Every purchase you make helps a
              local entrepreneur thrive, fosters job creation, and contributes
              to the unique character of our local neighborhoods.
            </p>
          </div>
        </div>
        <div className="ui-flex ui-max-w-md ui-mx-auto ui-flex-row">
          <div className="ui-mr-4 ui-p-4 ui-flex ui-items-center ui-justify-center ui-w-12 ui-h-12 ui-mb-4 ui-rounded-full ui-bg-indigo-50 ui-text-deep-purple-400">
            <FontAwesomeIcon icon={faHandshakeSimple} size="xl" />
          </div>
          <div>
            <h6 className="ui-mb-3 ui-text-xl ui-font-bold ui-leading-5 ui-text-gray-900">
              Join Us
            </h6>
            <p className="ui-mb-3 ui-text-sm ui-text-gray-900">
              We invite you to join us in celebrating and supporting local.
              Explore our platform, discover hidden gems, and enjoy the rich
              diversity of offerings from your community. Whether you are a
              consumer looking for unique finds or a business owner wanting to
              reach a wider audience, Lokalz is here to help.
            </p>
          </div>
        </div>
      </div>
      <div className="ui-mt-12 ui-text-center ui-italic ui-font-medium ui-text-gray-900 md:ui-text-lg">
        <p>
          Thank you for being part of our journey. Together, we can build
          stronger, more connected communities.
        </p>
        <p className="ui-pt-5">- The Lokalz Team</p>
      </div>
    </div>
  );
};
