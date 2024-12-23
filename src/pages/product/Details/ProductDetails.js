import React from "react";
import { Button, Form } from "react-bootstrap";
import { Search, Settings } from "lucide-react";

const ProductDetails = ({ dataById, navigate, id }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="font-weight-bold"> {dataById.name}</h5>
        <div className="d-flex align-items-center">
          <div className="border rounded p-2 d-flex align-items-center">
            <Form.Control type="text" placeholder="Search..." className="border-0" />
            <Search className="ml-2 text-muted" />
          </div>
          <Settings className="ml-3 text-muted" />
        </div>
      </div>
      <Button
        variant="primary"
        onClick={() => navigate(`/product/addbatch/${id}`)}
        className="my-3 px-4 py-2 rounded-pill shadow-sm btn-lg"
        style={{
          backgroundColor: "#007bff",
          border: "none",
          fontSize: "16px",
          whiteSpace: "nowrap",
        }}
      >
        Add Batch
      </Button>
    </div>
  );
};

export default ProductDetails;
