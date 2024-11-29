import React from 'react';
const AddProduct = () => {
  return ( 
    <>
    I am from product 
    </>
   );
}
 
export default AddProduct;
// import React, { useEffect } from "react";
// import { Button, Col, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   getByIdAPIAction,
// } from "../../store/apiGroupManagementSlice";
// import { deleteAPIGroupAction } from "../../store/productManagementSlice";

// const CategoryView = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { dataById = [], loading } = useSelector((state) => state.apiGroupManagement);
//   useEffect(() => {
//     dispatch(getByIdAPIAction(id));
//   }, [id]);
//   return (
//     <div>
//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center mt-5">
//           <div className="spinner-grow" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div className="d-flex justify-content-between align-items-center">
//             <h3>Products</h3>
//             <Button
//               onClick={() => navigate(`/api-group/create/${id}`)}
//               variant="primary"
//               className="fw-bold"
//             >
//               Add Product
//             </Button>
//           </div>
//           {/* {count} */}
//           <Row className="mt-4">
//             {dataById.length &&
//               dataById.map((item, i) => (
//                 <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
//                   <div className="bg-info p-2 rounded-3 h-100">
//                     <div
//                     // onClick={() => navigate(`/category/${item._id}`)}
//                     >
//                       <h6>{item.name}</h6>
//                       <p className="line-clamp">{item.des}</p>
//                     </div>
//                     <div className="mt-3 " style={{ zIndex: 10 }}>
//                       <Button
//                         onClick={() => dispatch(deleteAPIGroupAction(item._id))}
//                       >
//                         Delete
//                       </Button>
//                       {/* <Button
//                         onClick={() => navigate(`/category/edit/${item._id}`)}
//                       >
//                         Edit
//                       </Button> */}
//                     </div>
//                   </div>
//                 </Col>
//               ))}
//           </Row>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryView;
