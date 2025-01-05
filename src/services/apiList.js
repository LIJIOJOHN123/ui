const USER_SERVICE_API = process.env.REACT_APP_USER_SERVICE_API;
const WEB_SERVICE_API = process.env.REACT_APP_WEB_SERVICE_API;

const backendAPIList = {
  // api management
  authManagement: `${USER_SERVICE_API}`,
  clientManagement: `${USER_SERVICE_API}/user`,
  apiManagement: `${WEB_SERVICE_API}/api_management`,
  apiGroupManagement: `${WEB_SERVICE_API}/api_group_management`,
  productManagement: `${WEB_SERVICE_API}/product_management`,
  validations: `${WEB_SERVICE_API}/prevalidation`,
  postValidations: `${WEB_SERVICE_API}/postvalidation`,
  apiResponseManagement: `${WEB_SERVICE_API}/api_response_management`,
  paymentManagement: `${WEB_SERVICE_API}/payment`,
  planManagement:`${WEB_SERVICE_API}/plan`,
  transactionManagement:`${USER_SERVICE_API}/transaction`,
  wrmReportManagement:`${WEB_SERVICE_API}/wrmreport`
};
export default backendAPIList;
