import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getByIdAPIAction } from "../../store/apiManagementSlice";
import { apiBatchingAction } from "../../store/apiResponseManagement";
import { Card, Badge, Button } from "react-bootstrap";

function ApiListView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataById, loading } = useSelector((state) => state.apiManagement);

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
      dispatch(apiBatchingAction());
    }
  }, [id, dispatch]);

  return (
    <div className="bg-body-secondary w-100 vh-100 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        <h3 className="text-decoration-underline">API Details</h3>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{dataById.apiname}</Card.Title>
              <Card.Text>
                <p>
                  <b>Description:</b> {dataById.des}
                </p>
                <p>
                  <b>Backend API Key Name:</b> {dataById.backend_api_key_name}
                </p>
                <p>
                  <b>Fields:</b>{" "}
                  {dataById.fields.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index < dataById.fields.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p>
                  <b>Standard Pricing:</b> Rs.{dataById.pricing}
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
}

export default ApiListView;

