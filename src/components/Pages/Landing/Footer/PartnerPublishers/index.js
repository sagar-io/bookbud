import { partnersData as partnerPublishersData } from "./partnerPublishersData";

export const PartnerPublishers = () => {
  const partnersElement = partnerPublishersData.map((partner) => (
    <Publishers
      key={`${partner.name}`}
      name={partner.name}
      url={partner.url}
      imgUrl={partner.imgUrl}
    />
  ));
  return partnersElement
};

const Publishers = (props) => (
  <a href={props.url} target="_blank" rel="noreferrer">
    <img src={props.imgUrl} alt={props.name} />
  </a>
);
