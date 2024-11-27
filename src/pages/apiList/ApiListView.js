import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getByIdAPIAction } from "../../store/apiSlice";
import { apiBatchingAction } from "../../store/api_Batching";

function ApiListView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dataById, loading } = useSelector((state) => state.apiList);

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
      dispatch(apiBatchingAction());
    }
  }, [id, dispatch]);

  return (
    <div className="bg-body-secondary w-100 vh-100">
      {loading && <p>Loading...</p>}

      <div className="d-flex justify-content-between  mb-4">
        <h3 className="text-decoration-underline">Api Details</h3>
        <p className="m-2 rounded-3 bg-dark text-white p-1">
          Daily Usage: <b>{dataById.dailyUsageCount}</b>
        </p>
      </div>

      <div className="mt-4">
        <p>
          Api Name: <b>{dataById.apiname}</b>
        </p>
        <p>
          Description: <b>{dataById.des}</b>
        </p>
        <p>
          Backend Api Key Name: <b>{dataById.backend_api_key_name}</b>
        </p>
        <p>
          Fields:{" "}
          <b>
            {dataById?.fields?.map((item, index) => (
              <span key={index}>
                {item}
                {index < dataById.fields.length - 1 ? ", " : ""}
              </span>
            ))}
          </b>
        </p>
        <p>
          Standard Pricing: <b>{dataById.pricing}</b>
        </p>
      </div>
    </div>
  );
}

export default ApiListView;
