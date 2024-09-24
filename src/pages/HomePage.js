import React, { useEffect } from "react";
import CSVFolder from "../components/CSVFolder";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pricing from "../components/Pricing";
import WhyValidX from "../components/WhyValidX";
import { Helmet } from "react-helmet-async";
import icon from "../assets/icon.png";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>ValidX - Home</title>
        <meta
          name="description"
          content="Welcome to ValidX, your premier solution for chargeback management and fraud prevention. Explore our advanced tools and services designed to reduce chargebacks, enhance fraud detection, and improve financial performance."
        />
        <meta
          name="keywords"
          content="chargeback management, fraud prevention, chargeback reduction, fraud detection, financial performance, risk management"
        />
        <meta name="author" content="ValidX Team" />
        <meta property="og:title" content="ValidX - Home" />
        <meta
          property="og:description"
          content="ValidX provides top-notch solutions for managing and preventing chargebacks. Discover how our services can help you reduce chargebacks and improve your financial outcomes."
        />
        <meta property="og:image" content={icon} />
        <meta
          property="og:url"
          content="https://www.validx.chargebackzero.com/"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content={icon} />
        <meta name="twitter:title" content="ValidX - Home" />
        <meta
          name="twitter:description"
          content="Discover ValidX's advanced chargeback management and fraud prevention solutions. Learn how we can help you minimize chargebacks and enhance financial performance."
        />
        <meta name="twitter:image" content={icon} />
        <link rel="canonical" href="https://www.validx.chargebackzero.com/" />
      </Helmet>

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
