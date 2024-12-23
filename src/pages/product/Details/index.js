import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Card, Row, Col, Button } from "react-bootstrap";
import { getByIdAPIAction } from "../../../store/productManagementSlice";
import { batchListAction } from "../../../store/apiResponseManagement";
import ProductDetails from "./ProductDetails";
import ApiGroupInfo from "./ApiGroupInfo";
import BatchList from "./BatchList";
import ValidationAccordion from "./ValidationAccordion";

const ProductView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { dataById } = useSelector((state) => state.productManagement);
  const { batchList, loading } = useSelector((state) => state.apiResponseManagement);


  useEffect(() => {
    dispatch(getByIdAPIAction(id));
    dispatch(batchListAction(1, 25, `productId=${id}`));
  }, [id, dispatch]);

 



  return (
    <div className="container-fluid px-4">
      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      )}
      {dataById && !loading && (
        <Card className="mt-4 shadow-lg border-light w-100">
          <Card.Body className="w-100">
            <ProductDetails dataById={dataById} navigate={navigate} id={id} />
            <ApiGroupInfo dataById={dataById} />
            <ValidationAccordion validationType="Pre" validations={dataById?.preValidation} />
            <ValidationAccordion validationType="Post" validations={dataById?.postValidation} />
            <BatchList batchList={batchList}/>
   
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ProductView;

