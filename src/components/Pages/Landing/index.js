import HeroSection from "./HeroSection";
import FeaturedBooks from "./FeaturedBooks";
import Testimonials from "./Testimonials";
import Features from "./Features";
import Footer from "./Footer";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    // code for scroll animation for landing page elements
    const hiddenElements = document.querySelectorAll(".hidden");
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      })
    );
    hiddenElements.forEach((element) => observer.observe(element));
  }, []);

  return (
    <div className="landing-wrapper">
      <HeroSection />
      <Features />
      <FeaturedBooks />
      <div className="video-container">
        <iframe
          className="hidden"
          src="https://www.youtube.com/embed/KYuqUU-qW0c"
          title="Welcome to Free eBooks!"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <Testimonials />
      <Footer />
    </div>
  );
};
export default LandingPage;
