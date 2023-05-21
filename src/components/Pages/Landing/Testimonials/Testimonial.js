const Testimonial = ({
  currentTestimonialIndex,
  id,
  heading,
  description,
  imgUrl,
}) => (
  <div
    className={
      currentTestimonialIndex === id
        ? "testimonial activeTestimonial"
        : "testimonial"
    }
  >
    <img src={imgUrl} alt="" />
    <h3 className="heading">{heading}</h3>
    <p className="description">{description}</p>
  </div>
);

export default Testimonial;
