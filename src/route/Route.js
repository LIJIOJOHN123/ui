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
import Form from "../pages/API_Management/Form";
import ApiList from "../pages/API_Management/List";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RestePassword from "../pages/auth/RestePassword";
// import APIResponseManagement from "../pages/API_Response_Management";
import Dashboard from "../pages/dashboard/Dashboard";
import Documentation from "../pages/documentation/Documentation";
import ApiGroup from "../pages/product/List";
import GroupApiForm from "../pages/product/Form";
import PrivateRoute from "../pages/layout/ProctedRoutes";
import Plans from "../pages/plans/Plans";
import Settings from "../pages/settings/Settings";
import ProductDetails from "../pages/product/Details";
import ApiListView from "../pages/API_Management/Details";
import ClientManagement from "../pages/clientmanagement/List";
import ClientDetails from "../pages/clientmanagement/Details";
import Transaction from "../pages/transaction/Transaction";
import Batch from "../pages/batch/Batch";
import APIGroupDetails from "../pages/API_Group_Management/Details";
import APIGroupList from "../pages/API_Group_Management/List";
import APIGroupForm from "../pages/API_Group_Management/Form";
import PlanList from "../pages/plan/List";
import PlanForm from "../pages/plan/PlanForm";

import PostValidationList from "../pages/post-validation/List";
import PostValidationForm from "../pages/post-validation/Form";
import PreValidationList from "../pages/pre-validation/List";
import ValidationForm from "../pages/pre-validation/Form";
import BatchDeatils from "../pages/batch/BatchDeatils";
import BatchView from "../pages/batch/BatchView";
import ApiResponse from "../pages/api-response/List";
import AddInput from "../pages/product/AddInput";
import ClientDataDetails from "../pages/product/ClientDataDetails";

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

        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<RestePassword />} />
        </Route>

        <Route path="/">
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="batch-enrichment" element={<APIResponseManagement />} /> */}
            {/* //////// */}
            <Route path="api-list" element={<ApiList />} />
            <Route path="api-list/:id" element={<ApiListView />} />
            <Route path="api-list/create" element={<Form />} />
            <Route path="api-list/edit/:id" element={<Form />} />
            {/* ////// */}
            {/* //////// */}
            <Route path="pre-validation" element={<PreValidationList />} />
            <Route path="pre-validation/:id" element={<ApiListView />} />
            <Route path="pre-validation/create" element={<ValidationForm />} />
            <Route
              path="pre-validation/edit/:id"
              element={<ValidationForm />}
            />
            <Route path="post-validation" element={<PostValidationList />} />
            {/* <Route path="post-validation/:id" element={<ApiListView />} /> */}
            <Route
              path="post-validation/create"
              element={<PostValidationForm />}
            />
            <Route
              path="post-validation/edit/:id"
              element={<PostValidationForm />}
            />
            {/* ////// */}
            {/* //////// */}
            <Route path="products" element={<ApiGroup />} />
            <Route path="products/create" element={<GroupApiForm />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="products/edit/:id" element={<GroupApiForm />} />
            <Route path="product/addbatch/:id" element={<AddInput />} />
            {/* ////// */}\{/* ////// */}
            <Route path="plan" element={<PlanList />} />
            <Route path="plan/create" element={<PlanForm />} />
            <Route path="plan/edit/:id" element={<PlanForm />} />
            <Route path="plan/:id" element={<PlanList />} />
            {/* ////// */}
            {/* //////// */}
            <Route path="api-groups" element={<APIGroupList />} />
            <Route path="api-groups/create" element={<APIGroupForm />} />
            <Route path="api-groups/:id" element={<APIGroupDetails />} />
            <Route path="api-groups/edit/:id" element={<APIGroupForm />} />
            {/* ////// */}
            <Route path="api-response" element={<ApiResponse />} />
            {/* ////// */}
            <Route path="clients" element={<ClientManagement />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="batch" element={<Batch />} />
            <Route path="client/:id" element={<ClientDetails />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="plans" element={<Plans />} />
            <Route path="settings" element={<Settings />} />
            <Route
              path="products/batch-deatils/:id"
              element={<BatchDeatils />}
            />
            <Route
              path="products/data/:id"
              element={<ClientDataDetails />}
            />
            <Route
              path="products/batch-details-view/:id"
              element={<BatchView />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default RoutesPage;
