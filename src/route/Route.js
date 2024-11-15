import React from "react";
import { Route, Routes } from "react-router-dom";
import CalendlyDemo from "../components/CalendlyDemo";
import ContactUs from "../components/ContactUs";
import FAQ from "../components/FAQ";
import RefundPolicy from "../components/RefundPolicy";
import BlogPage from "../pages/BlogPage";
import HomePage from "../pages/HomePage";
import Report from "../pages/Repoter";
import Cybersecurity from "../pages/UseCase/Cybersecurity";
import DataEnrichment from "../pages/UseCase/DataEnrichment";
import InternetTelecommunication from "../pages/UseCase/Internet-Telecommunication";
import LawEnforcement from "../pages/UseCase/LawEnforcement";
import Marketing from "../pages/UseCase/Marketing";
import MerchantIndustryClassification from "../pages/UseCase/MerchantInduClassify";
import MerchantRisk from "../pages/UseCase/MerchantRisk";
import OnlineReputation from "../pages/UseCase/OnlineReputation";
import PublishingAdvertising from "../pages/UseCase/PublishingAdvertising";
import SALESINTELLIGENCE from "../pages/UseCase/SALESINTELLIGENCE";
import Form from "../pages/apiList/Form";
import ApiList from "../pages/apiList/List";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RestePassword from "../pages/auth/RestePassword";
import BatchEnrichment from "../pages/batch-enrichment/BatchEnrichment";
import Dashboard from "../pages/dashboard/Dashboard";
import Documentation from "../pages/documentation/Documentation";
import ApiGroup from "../pages/groupApi/ApiGroup";
import GroupApiForm from "../pages/groupApi/GroupApiForm";
import PrivateRoute from "../pages/layout/ProctedRoutes";
import Plans from "../pages/plans/Plans";
import Settings from "../pages/settings/Settings";
import GroupApiView from "../pages/groupApi/GroupApiView";
import ApiListView from "../pages/apiList/ApiListView";
import ClientManagement from "../pages/clientmanagement/List";
import ClientDetails from "../pages/clientmanagement/Details";

function RoutesPage() {
 

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
          element={<PublishingAdvertising />}
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
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<RestePassword />} />
        </Route>

        <Route path="/">
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="batch-enrichment" element={<BatchEnrichment />} />

            {/* //////// */}
            <Route path="api-list" element={<ApiList />} />
            <Route path="api-list/:id" element={<ApiListView />} />
            <Route path="api-list/create" element={<Form />} />
            <Route path="/api-list/edit/:id" element={<Form />} />
            {/* ////// */}
            {/* //////// */}
            <Route path="api-group" element={<ApiGroup />} />
            <Route path="api-group/create" element={<GroupApiForm />} />
            <Route path="api-group/:id" element={<GroupApiView />} />
            <Route path="/api-group/edit/:id" element={<GroupApiForm />} />
            {/* ////// */}
            <Route path="/clients" element={<ClientManagement />} />
            <Route path="/client/:id" element={<ClientDetails />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="plans" element={<Plans />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default RoutesPage;
