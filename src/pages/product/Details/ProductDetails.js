import React from "react";
import { Button, Form } from "react-bootstrap";
import { Search, Settings } from "lucide-react";

const ProductDetails = ({ dataById, navigate, id }) => {
  return (
    <div>
      <div className="d-flex justify-content-end">
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
    </div>
  );
};

export default ProductDetails;

