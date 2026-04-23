import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightToBracket,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const icons = {
  "arrow-left": faArrowLeft,
  "arrow-right-to-bracket": faArrowRightToBracket,
  "arrow-up": faArrowUp,
  "chevron-left": faChevronLeft,
  "chevron-right": faChevronRight,
  facebook: faFacebookF,
  instagram: faInstagram,
  scissors: faScissors,
};

const Icon = ({ name, ...props }) => {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return <FontAwesomeIcon icon={icon} {...props} />;
};

export default Icon;
