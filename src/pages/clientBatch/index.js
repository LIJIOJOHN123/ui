import React, { useEffect, } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { apiBatchClientAction } from "../../store/apiResponseManagement";
import AddInput from "./AddInput";
import Pricing from "../../components/Pricing";

const ClientBatch = () => {
  const dispatch = useDispatch();
  const {
    data = [],
    loading,
  } = useSelector((state) => state.apiResponseManagement);
  useEffect(() => {
    dispatch(apiBatchClientAction());
  }, [])

  return (
    <div className="container-fluid px-4">
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      ): <>
      {data?.productId ?<AddInput id={data.productId} />:<Pricing/>}
    </>}
      
    </div>
  );
};

export default ClientBatch;

