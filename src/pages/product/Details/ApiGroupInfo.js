import React from "react";
import { Card, Badge } from "react-bootstrap";

const ApiGroupInfo = ({ dataById }) => {
  const { apiGroupId } = dataById || {};

  if (!apiGroupId) return null; // Handle case when no data is available

  const { name, description} = apiGroupId;

  return (
    <Card className="mb-4 shadow-lg rounded">
      <Card.Header className="bg-info text-white">
        <h4>Product Information</h4>
      </Card.Header>
      <Card.Body>
        <h5 className="mb-3">{name}</h5>
        <p className="text-muted">{description}</p>      
      </Card.Body>
    </Card>
  );
};

export default ApiGroupInfo;
