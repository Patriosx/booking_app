import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const Slider = ({ photos, setOpenSlider, slideNumber, setSlideNumber }) => {
  const handleMoveSlider = (direction) => {
    let newSlideNumber;
    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };
  const closeSlider = () => {
    setOpenSlider(false);
  };
  return (
    <div className="slider">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="close"
        onClick={closeSlider}
      />
      <FontAwesomeIcon
        icon={faCircleArrowLeft}
        className="arrow"
        onClick={() => handleMoveSlider("left")}
      />
      <div className="sliderWrapper">
        <img src={photos[slideNumber]} alt="" className="sliderImg" />
      </div>
      <FontAwesomeIcon
        icon={faCircleArrowRight}
        className="arrow"
        onClick={() => handleMoveSlider("right")}
      />
    </div>
  );
};

export default Slider;
