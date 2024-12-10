import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getByIdAPIAction } from "../../store/apiResponseManagement";

function BatchView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataById } = useSelector((state) => state.apiResponseManagement);

  useEffect(() => {
    dispatch(getByIdAPIAction(id));
  }, [dispatch, id]);

  if (!dataById) {
    return (
      <div className="text-center">
        <h2>Batch Details</h2>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Batch Details</h2>
      <div className="card p-3 shadow-sm">
        <div className="mb-3">
          <strong>Job ID:</strong> <span>{dataById.job_id}</span>
        </div>
        <div className="mb-3">
          <strong>API Type:</strong> <span>{dataById.apiType}</span>
        </div>
        <div className="mb-3">
          <strong>Key Name:</strong>{" "}
          <span>{dataById.backend_api_key_name}</span>
        </div>
        <div className="mb-3">
          <strong>Pricing:</strong> <span>{dataById.pricing}</span>
        </div>
        <div className="mb-3">
          <strong>Status:</strong> <span>{dataById.apiStatus}</span>
        </div>
      </div>
    </div>
  );
}

export default BatchView;
