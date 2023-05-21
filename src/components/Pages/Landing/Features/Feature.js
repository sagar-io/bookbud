const Feature = ({ imgUrl, heading, description }) => {
  return (
    <div className="feature hidden">
      <img src={imgUrl} alt="" />
      <h3>{heading}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Feature;
