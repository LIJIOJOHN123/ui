const USER = process.env.REACT_APP_Base_URL;
let WEB_BACKEND_API_URL = "http://localhost:3050/web/api/v1";

const backendAPIList = {
  // api management
  authManagement: `${USER}`,
  clientManagement: `${USER}/user`,
  apiManagement: `${WEB_BACKEND_API_URL}/api_management`,
  apiGroupManagement: `${WEB_BACKEND_API_URL}/api_group_management`,
  productManagement: `${WEB_BACKEND_API_URL}/product_management`,
  validations: `${WEB_BACKEND_API_URL}/prevalidation`,
  postValidations: `${WEB_BACKEND_API_URL}/postvalidation`,
  apiResponseManagement: `${WEB_BACKEND_API_URL}/api_response_management`,
  paymentManagement: `${WEB_BACKEND_API_URL}/payment`,
};
export default backendAPIList;
