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
  const { dataById,loading } = useSelector((state) => state.productManagement);

  useEffect(() => {
    dispatch(getByIdAPIAction(id));
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
            {dataById?.preValidation?.length >0 && <ValidationAccordion validationType="Pre" validations={dataById?.preValidation} />}
            {dataById?.postValidation?.length >0 && <ValidationAccordion validationType="Post" validations={dataById?.postValidation} />}
            <BatchList id={id}/>
   
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ProductView;