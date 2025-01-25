import { CSVLink } from "react-csv";
import { Button, Col, Form, Card, Row, Alert } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAPIFormBatchingAction,
  uploadCSVAPIBatchingAction,
} from "../../store/apiResponseManagement";
import { getByIdAPIAction } from "../../store/productManagementSlice";
import BatchList from "./BatchList";

function AddInput({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getByIdAPIAction(id));
  }, [id, dispatch]);

  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { dataById, loading } = useSelector((state) => state.productManagement);
  const { data: api } = useSelector((state) => state.apiResponseManagement);

  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(); 

  const fields = dataById?.apiGroupId?.field_active
    ? dataById?.apiGroupId?.fields.flat() || []
    : dataById?.api?.map((item) => item?.fields).flat() || [];

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addAPIFormBatchingAction({ apiValue: formData }, id));
      setFormData({});
      setSuccessMessage("Batch API submitted successfully!");
      setErrorMessage(null);
      setSelectedFile(null);
    } catch (err) {
      setErrorMessage("Failed to submit the batch. Please try again.");
      setSuccessMessage(null);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setErrorMessage("Please select a CSV file to upload.");
      setSuccessMessage(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setErrorMessage("No CSV file selected. Please select a CSV file to upload.");
      setSuccessMessage(null);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    dispatch(uploadCSVAPIBatchingAction({ formData }));

    setFormData({});
    setSuccessMessage("CSV file uploaded successfully!");
    setErrorMessage(null);
    setSelectedFile(null);
    fileInputRef.current.value = "";
  };

  const downloadCsvFile = (headers, data, filename) => {
    const convertToCSV = (headers, data) => {
      const headerRow = headers.join(",");
      const rows = data.map((item) => `"${item}"`).join(","); 
      return [headerRow, rows].join("\n"); 
    };

    const csvContent = convertToCSV(headers, data);

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" }); 
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`; 
    link.click();
  };
  return (
    <div className="container mt-5">
      {loading && <p>Loading...</p>}
      <Card className="shadow-lg border-light p-1">
        <Card.Body>
          <div style={{ fontSize: "14px" }}>
            <p className="fw-semibold" style={{ whiteSpace: "pre-line" }}>
              {`Place the URLs you wish to batch check in a CSV file with 1 URL or domain per row - placed in the first column.`}
              {`\nAdditional columns can be included such as a userID, transactionID, clickID, etc. Live results will appear on this page as the file is processed. \nYou will receive an email notice once the report has finished processing. All completed reports are saved for future reference and can be viewed below.`}
            </p>
            <CSVLink
              filename="sample_data.csv"
              style={{
                fontSize: "14px",
                backgroundColor: "#5bb75b",
                padding: "8px 16px",
                borderRadius: "5px",
                color: "#fff",
                textDecoration: "none",
              }}
              className="text-decoration-underline"
              onClick={() =>
                downloadCsvFile(fields, [], `${dataById._id}_template`)
              }
              data={[]} 
              separator=","
            >
              Download Sample CSV Template
            </CSVLink>
            <hr className="border-2" />
          </div>

          {dataById && !loading && (
            <>
              {dataById.apiList && (
                <div>
                  <h5>API Fields:</h5>
                  <ul>
                    {fields?.map((field, index) => (
                      <li key={index}>{field}</li>
                    ))}
                  </ul>
                </div>
              )}

              <h3 className="mt-4 mb-3">
                URL Risk Analysis - Batch Check CSV Files
              </h3>

              {successMessage && (
                <Alert variant="success" className="mb-3">
                  {successMessage}
                </Alert>
              )}

              {errorMessage && (
                <Alert variant="danger" className="mb-3">
                  {errorMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  {fields?.map((field, index) => (
                    <Col md={6} key={index} className="mb-3">
                      <Form.Group controlId={`field-${index}`}>
                        <Form.Label className="m-0">{field}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={`Enter ${field}`}
                          name={field}
                          value={formData[field] || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
                <div className="text-center mt-4">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>

              <div className="mt-4">
                <Form.Label className="d-block mb-2">Upload CSV File</Form.Label>
                <input
                  ref={fileInputRef}
                  className="form-control-file mb-3"
                  style={{ width: "100%" }}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                />

                <div className="text-center">
                  <Button
                    variant="danger"
                    style={{ width: "200px" }}
                    onClick={handleUpload}
                  >
                    Upload CSV File
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card.Body>
        <BatchList id={id} />
      </Card>
    </div>
  );
}

export default AddInput;
