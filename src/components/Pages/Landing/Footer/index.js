import SignInPage from "../../../Auth/SignIn";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsReddit } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import { PartnerPublishers } from "./PartnerPublishers";
import { FooterLinks } from "./Links";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-sign-in">
        <SignInPage />
      </div>
      {PartnerPublishersBlock}
      <FooterLinks />
      {SocialBlock}
    </div>
  );
};

const SocialBlock = (
  <div className="social-links">
    <a href="#">
      <BsTwitter />
    </a>
    <a href="#">
      <BsFacebook />
    </a>
    <a href="#">
      <BsInstagram />
    </a>
    <a href="#">
      <BsReddit />
    </a>
    <a href="#">
      <BsDiscord />
    </a>
  </div>
);

const PartnerPublishersBlock = (
  <div className="footer-parteners">
    <h2>Our Parteners: </h2>
    <div className="parteners-container">
      <PartnerPublishers />
    </div>
  </div>
);

export default Footer;
