import {
  faCircleQuestion,
  faEnvelope,
  faFileShield,
  faHome,
  faLayerGroup,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavLinksProps = {
  handleLinkClick: (route: string) => void;
};

export const NavLinksMobile = ({ handleLinkClick }: NavLinksProps) => {
  return (
    <ul className="flex flex-col gap-5 pt-5">
      <li>
        <button
          onClick={() => handleLinkClick("/")}
          className="items-center text-lg text-nowrap text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon
            icon={faHome}
            className="text-deep-purple-accent-400"
          />
          <span className="pl-3">Home</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/about")}
          className="items-center text-lg text-nowrap text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className="text-deep-purple-accent-400"
          />
          <span className="pl-3">About Us</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/onboard")}
          className="items-center text-lg text-nowrap text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon icon={faStore} />
          <span className="pl-3">Vendor Onboarding</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/future")}
          className="items-center text-lg text-nowrap text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon icon={faLayerGroup} />
          <span className="pl-3">What&apos;s Coming?</span>
        </button>
      </li>
      <hr />
      <li>
        <button
          onClick={() => handleLinkClick("/contact")}
          className="items-center text-lg text-nowrap text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="pl-3">Contact Us</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/terms")}
          className="items-center text-lg text-nowrap text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon icon={faFileShield} />
          <span className="pl-3">Terms & Conditions</span>
        </button>
      </li>
    </ul>
  );
};
