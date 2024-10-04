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
    <ul className="ui-flex ui-flex-col ui-gap-5 ui-pt-5">
      <li>
        <button
          onClick={() => handleLinkClick("/")}
          className="ui-items-center ui-text-lg ui-whitespace-nowrap ui-text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon
            icon={faHome}
            className="ui-text-deep-purple-accent-400"
          />
          <span className="ui-pl-3">Home</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/about")}
          className="ui-items-center ui-text-lg ui-whitespace-nowrap ui-text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className="ui-text-deep-purple-accent-400"
          />
          <span className="ui-pl-3">About Us</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/onboard")}
          className="ui-items-center ui-text-lg ui-whitespace-nowrap ui-text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon icon={faStore} />
          <span className="ui-pl-3">Vendor Onboarding</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/future")}
          className="ui-items-center ui-text-lg ui-whitespace-nowrap ui-text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon icon={faLayerGroup} />
          <span className="ui-pl-3">What&apos;s Coming?</span>
        </button>
      </li>
      <hr />
      <li>
        <button
          onClick={() => handleLinkClick("/contact")}
          className="ui-items-center ui-text-lg ui-whitespace-nowrap ui-text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="ui-pl-3">Contact Us</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleLinkClick("/terms")}
          className="ui-items-center ui-text-lg ui-whitespace-nowrap ui-text-deep-purple-accent-400"
          aria-label="About Us"
        >
          <FontAwesomeIcon icon={faFileShield} />
          <span className="ui-pl-3">Terms & Conditions</span>
        </button>
      </li>
    </ul>
  );
};
