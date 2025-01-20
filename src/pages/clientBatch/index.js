import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiBatchClientAction } from "../../store/apiResponseManagement";
import AddInput from "./AddInput";
import BatchList from "./BatchList";

const ClientBatch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [headers, setHeaders] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(() => {
    return parseInt(localStorage.getItem("batchListLimit"), 10) || 25;
  });


  const {
    data = [],
    count = 0,
    loading,
  } = useSelector((state) => state.apiResponseManagement);
  useEffect(() => {
    dispatch(apiBatchClientAction());
  }, [])


  return (
    <div className="container-fluid px-4">
      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      )}
      {data?.product?._id && !loading && (
        <>
          <AddInput id={data.product._id} />
         
        </>

      )}
    </div>
  );
};

export default ClientBatch;

