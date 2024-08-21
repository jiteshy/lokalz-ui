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
    <div className="px-8 py-8 mx-auto max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:py-16 bg-white">
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            About Us
          </p>
        </div>
        <Title title="Welcome to Lokalz" />
        <p className="text-base text-gray-700 md:text-lg">
          In an era where local businesses form the heart of our communities, we
          are on a mission to bring them closer to you. Lokalz is your go-to
          platform for discovering a wide array of local businesses—from food
          trucks and market vendors to home-based businesses and more.
        </p>
      </div>
      <div className="grid max-w-screen-lg gap-8 row-gap-10 mx-auto lg:grid-cols-2">
        <div className="flex max-w-md mx-auto flex-row">
          <div className="mr-4 p-4 flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 text-deep-purple-400">
            <FontAwesomeIcon icon={faBolt} size="xl" />
          </div>
          <div>
            <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
              Our Vision
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Our vision is to create a thriving ecosystem where local
              businesses can flourish and connect with their communities. We
              believe in the power of supporting local, and we aim to bridge the
              gap between consumers and the unique offerings that often go
              unnoticed.
            </p>
          </div>
        </div>
        <div className="flex max-w-md mx-auto flex-row">
          <div className="mr-4 p-4 flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 text-deep-purple-400">
            <FontAwesomeIcon icon={faCircleQuestion} size="xl" />
          </div>
          <div>
            <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
              What We Do
            </h6>
            <p className="mb-3 text-sm text-gray-900">
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
        <div className="flex max-w-md mx-auto flex-row">
          <div className="mr-4 p-4 flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 text-deep-purple-400">
            <FontAwesomeIcon icon={faPaperPlane} size="xl" />
          </div>
          <div>
            <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
              Our Future Plans
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              We are just getting started. In the near future, Lokalz will
              expand its services to include ordering functionalities, making it
              even easier for you to support your favorite local businesses.
              Imagine browsing, selecting, and purchasing from your favorite
              vendors all within our platform—convenient and hassle-free.
            </p>
            <a
              href="/future"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="flex max-w-md mx-auto flex-row">
          <div className="mr-4 p-4 flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 text-deep-purple-400">
            <FontAwesomeIcon icon={faMapLocationDot} size="xl" />
          </div>
          <div>
            <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
              Why Local Matters
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Supporting local businesses means investing in the growth and
              sustainability of our communities. Every purchase you make helps a
              local entrepreneur thrive, fosters job creation, and contributes
              to the unique character of our local neighborhoods.
            </p>
          </div>
        </div>
        <div className="flex max-w-md mx-auto flex-row">
          <div className="mr-4 p-4 flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50 text-deep-purple-400">
            <FontAwesomeIcon icon={faHandshakeSimple} size="xl" />
          </div>
          <div>
            <h6 className="mb-3 text-xl font-bold leading-5 text-gray-900">
              Join Us
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              We invite you to join us in celebrating and supporting local.
              Explore our platform, discover hidden gems, and enjoy the rich
              diversity of offerings from your community. Whether you are a
              consumer looking for unique finds or a business owner wanting to
              reach a wider audience, Lokalz is here to help.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center italic font-medium text-gray-900 md:text-lg">
        <p>
          Thank you for being part of our journey. Together, we can build
          stronger, more connected communities.
        </p>
        <p className="pt-5">- The Lokalz Team</p>
      </div>
    </div>
  );
};
