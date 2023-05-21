import { features as featuresData } from "./featuresData";
import Feature from "./Feature";

const Features = () => {
  const featuresElements = featuresData.map((feature, id) => (
    <Feature
      imgUrl={feature.imgUrl}
      heading={feature.heading}
      description={feature.description}
      key={id}
    />
  ));
  return (
    <div className="standard">
      <h1>Features</h1>
      <h4>Why Choose us ?</h4>
      <div className="features">{featuresElements}</div>
    </div>
  );
};

export default Features;
