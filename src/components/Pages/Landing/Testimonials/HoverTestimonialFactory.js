import { useRef } from "react";
import { GoMailRead } from "react-icons/go";

// h means hover
const HoverTestimonialFactory = ({
  imgUrl,
  name,
  country,
  heading,
  description,
}) => {
  const contentRef = useRef();
  const coverRef = useRef();
  const dotRef = useRef();

  return (
    <div className="h-testimonial">
      <div className="h-cover" ref={coverRef}>
        <div className="img-container">
          <img src={imgUrl} alt="" />
          <div className="border" ref={dotRef}></div>
        </div>
        <p className="name">{name}</p>
        <p className="country">{country}</p>
        <button className="btn-y h-btn" onClick={handleMouseHover}>
          <GoMailRead />
        </button>
      </div>

      <div className="h-content" ref={contentRef}>
        <h3>{heading}</h3>
        <p>{description}</p>
      </div>
    </div>
  );

  function handleMouseHover() {
    dotRef.current.style.display = "none";
    coverRef.current.style.visibility = "hidden";
    contentRef.current.style.visibility = "visible";

    setTimeout(() => {
      dotRef.current.style.display = "block";
      contentRef.current.style.visibility = "hidden";
      coverRef.current.style.visibility = "visible";
    }, 3500);
  }
};

export default HoverTestimonialFactory;
