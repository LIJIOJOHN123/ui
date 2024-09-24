// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MerchantRisk from "./pages/UseCase/MerchantRisk";
import MerchantIndustryClassification from "./pages/UseCase/MerchantInduClassify";
import SALESINTELLIGENCE from "./pages/UseCase/SALESINTELLIGENCE";
import OnlineReputation from "./pages/UseCase/OnlineReputation";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/dashboard/Dashboard";
import LawEnforcement from "./pages/UseCase/LawEnforcement";
import NavBar from "./pages/dashboard/NavBar";
import Dashboard from "./pages/dashboard/Dashboard";
import BatchEnrichment from "./pages/dashboard/BatchEnrichment";
import Documentation from "./pages/dashboard/Documentation";
import Plans from "./pages/dashboard/Plans";
import Settings from "./pages/dashboard/Settings";
import RefundPolicy from "./components/RefundPolicy";
import FAQ from "./components/FAQ";
import ContactUs from "./components/ContactUs";
import DataEnrichment from "./pages/UseCase/DataEnrichment";
import Publishing_Advertising from "./pages/UseCase/Publishing&Advertising";
import Cybersecurity from "./pages/UseCase/Cybersecurity";
import InternetTelecommunication from "./pages/UseCase/Internet-Telecommunication";
import Marketing from "./pages/UseCase/Marketing";
import CalendlyDemo from "./components/CalendlyDemo";
import Pricing from "./components/Pricing";
import Report from "./pages/Repoter";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/api/:id" element={<HomePage />} />

        <Route
          path="/use-cases/merchantriskassessmentsimplified"
          element={<MerchantRisk />}
        />
        <Route
          path="/use-cases/merchant-industry-classification"
          element={<MerchantIndustryClassification />}
        />
        <Route
          path="/use-cases/data-enrichment-analysis"
          element={<DataEnrichment />}
        />
        <Route
          path="/use-cases/internet-telecommunication"
          element={<InternetTelecommunication />}
        />
        <Route path="/use-cases/marketing" element={<Marketing />} />
        <Route
          path="/use-cases/publishing-advertising"
          element={<Publishing_Advertising />}
        />

        <Route path="/report" element={<Report />} />
        <Route path="/use-cases/cybersecurity" element={<Cybersecurity />} />
        <Route
          path="/use-cases/salesintelligence"
          element={<SALESINTELLIGENCE />}
        />
        <Route
          path="/use-cases/onlinereputation"
          element={<OnlineReputation />}
        />
        <Route path="/book-a-demo" element={<CalendlyDemo />} />
        <Route path="/use-cases/law-enforcement" element={<LawEnforcement />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="batch-enrichment" element={<BatchEnrichment />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="plans" element={<Plans />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
