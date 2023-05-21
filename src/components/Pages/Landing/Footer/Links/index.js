import { linksData } from "./linksData";
import { LinksGenerator } from "./LinksGenerator";

export const FooterLinks = () => {
  const pressMediaElements = linksData["Press & Media"].map((linkItemData) => (
    <LinksGenerator name={linkItemData.name} url={linkItemData.url} />
  ));

  const quickLinksElements = linksData["Quick Links"].map((linkItemData) => (
    <LinksGenerator name={linkItemData.name} url={linkItemData.url} />
  ));
  const resourcesLinksElements = linksData["Resources Links"].map(
    (linkItemData) => (
      <LinksGenerator name={linkItemData.name} url={linkItemData.url} />
    )
  );

  return (
    <div className="footer-links-container">
      <div>
        <h3>Press & Media</h3>
        <ul className="links">{pressMediaElements}</ul>
      </div>

      <div>
        <h3>Quick Links</h3>
        <ul className="links">{quickLinksElements}</ul>
      </div>

      <div>
        <h3>Resources Links</h3>
        <ul className="links">{resourcesLinksElements}</ul>
      </div>
    </div>
  );
};
