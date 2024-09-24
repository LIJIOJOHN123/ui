import React, { useEffect } from "react";
import icon from "../assets/icon.png";
import CSVFolder from "../components/CSVFolder";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pricing from "../components/Pricing";
import SEO from "../components/SEO";
import WhyValidX from "../components/WhyValidX";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seoData = {
    title: "ValidX - Home",
    description:
      "Welcome to ValidX, your premier solution for chargeback management and fraud prevention. Explore our advanced tools and services designed to reduce chargebacks, enhance fraud detection, and improve financial performance.",
    keywords:
      "chargeback management, fraud prevention, chargeback reduction, fraud detection, financial performance, risk management",
    author: "ValidX Team",
    image: icon, // Relative image path
    url: "https://www.validx.chargebackzero.com/",
    type: "website", // Open Graph type
  };
  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        author={seoData.author}
        image={seoData.image} // Pass the imported image path
        url={seoData.url}
      />

      <Header />
      <WhyValidX />
      <Features />
      <Pricing />
      <CSVFolder />
      <Footer />
    </>
  );
}

export default HomePage;
