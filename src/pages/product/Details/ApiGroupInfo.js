import React from "react";
import { Card, Badge } from "react-bootstrap";

const ApiGroupInfo = ({ dataById }) => {
  return (
    <Card className="mb-4 w-100">
      <Card.Header>API Group Information</Card.Header>
      <Card.Body>
        <h5>{dataById?.apiGroupId?.name}</h5>
        <p>{dataById?.apiGroupId?.description}</p>
        <p><strong>Fields:</strong> {dataById?.apiGroupId?.fields?.join(", ")}</p>
        <p><strong>API Type:</strong> {dataById?.apiGroupId?.api_type}</p>
        <p><strong>Status:</strong> 
          <Badge bg={dataById?.apiGroupId?.status === "ACTIVE" ? "success" : "danger"}>
            {dataById?.apiGroupId?.status}
          </Badge>
        </p>
      </Card.Body>
    </Card>
  );
};

export default ApiGroupInfo;
