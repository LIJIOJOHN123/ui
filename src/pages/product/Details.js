import { CSVLink } from "react-csv";
import { Check, Download, Search, Settings, Trash2 } from "lucide-react";
import { Button, Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apiListAction } from "../../store/apiManagementSlice";
import { getByIdAPIAction } from "../../store/productManagementSlice";
import {
  addAPIBatchingAction,
  batchListAction,
  uploadCSVFileAPIBatchingAction,
} from "../../store/apiResponseManagement";

function ProductView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [error, setError] = useState(false);
  const { dataById } = useSelector((state) => state.productManagement);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQueries, setSearchQueries] = useState({ productId: id });
  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  // const { data: apiData } = useSelector((state) => state.apiManagement);
  const {
    data: api,
    loading,
    batchList,
  } = useSelector((state) => state.apiResponseManagement);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState([]);

  const fields = dataById?.apiGroupId?.field_active
    ? dataById?.apiGroupId?.fields.flat() || []
    : dataById?.api?.map((item) => item?.apiId.fields).flat() || [];
  useEffect(() => {
    dispatch(getByIdAPIAction(id));
  }, [id]);
  useEffect(() => {
    dispatch(batchListAction(page, limit, queryString));
  }, [id, page, limit, queryString]);

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    dispatch(addAPIBatchingAction({ apiValue: formData, productId: id }));
    setFormData({});
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      alert("Please select a CSV file to upload.");
    }
  };

  // Handle file upload when the button is pressed
  const handleUpload = () => {
    // Check if a file has been selected
    if (!selectedFile) {
      alert("No CSV file selected. Please select a CSV file to upload.");
      return;
    }

    // Create FormData object only when the button is clicked
    const formData = new FormData();
    formData.append("file", selectedFile);

    // Dispatch the upload action with the FormData

    dispatch(uploadCSVFileAPIBatchingAction({ formData, apiGroupId: id }));

    alert("CSV file uploaded successfully!");
  };
  const downloadTextFile = (content, id) => {
    const data = JSON.stringify(content);
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${id}.json`;
    link.click();
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      <div style={{ fontSize: "14px" }}>
        <p className="fw-semibold" style={{ whiteSpace: "pre-line" }}>
          {`Place the URLs you wish to batch check in a CSV file with 1 URL or domain per row - placed in the first column.`}

          {`\nAdditional columns can be included such as a userID, transactionID, clickID, etc. Live results will appear on this page as the file is processed. \nYou will receive an email notice once the report has finished processing. All completed reports are saved for future reference and can be viewed below.`}
        </p>

        <CSVLink
          filename="sample_data.csv"
          style={{ fontSize: "14px", backgroundColor: "#5bb75b" }}
          className="text-decoration-underline border-0 p-1 rounded-2 text-decoration-none text-white"
          data={[]}
          // headers={headers}
          separator=","
        >
          Download Sample CSV Template
        </CSVLink>
        <hr className="border-2" />
      </div>
      {dataById && !loading && (
        <>
          <h4>Name: {dataById.name}</h4>
          <p>Description: {dataById.des}</p>

          {dataById.apiList && (
            <div>
              <h4>API Fields:</h4>
              {fields?.map((field, index) => (
                <p key={index}>{field}</p>
              ))}
            </div>
          )}

          <div>
            <h3>URL Risk Analysis - Batch Check CSV Files</h3>
            <Col md={6}>
              <Form>
                {fields?.map((field, index) => (
                  <Form.Group key={index} controlId={`field-${index}`}>
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
                ))}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </Form>
            </Col>

            <div className="mt-4">
              <input
                className="mt-5 border border-2 rounded-1 p-1 border-black"
                style={{ width: "60%" }}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
              />

              <div className="justify-content-center d-flex w-50 mt-3">
                <Button
                  variant="danger"
                  style={{ width: "150px", fontSize: "14px" }}
                  className="my-3"
                  onClick={handleUpload} // Optional if needed as a final confirmation
                >
                  Upload CSV Files
                </Button>
              </div>
            </div>

            <div className="my-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Summary of Batch Check with Reports</h5>
                <div className="d-flex align-items-center">
                  <div className="border border-1 d-flex align-items-center p-2">
                    <input
                      className="border-0 flex-grow-1 input-no-focus-border"
                      type="text"
                      placeholder="Search..."
                    />
                    <Search className="ml-2" />
                  </div>
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      backgroundColor: "red",
                      marginLeft: "10px",
                    }}
                    className="ml-5 d-flex justify-content-center align-items-center"
                  >
                    <Settings className="text-white" />
                  </div>
                </div>
              </div>
              <table className="table table-striped table-bordered mt-2">
                <thead className="thead-dark">
                  <tr>
                    <th className="text-center">View</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Batch id</th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Records</th>
                    {/* <th className="text-center">Job id</th>
                    <th className="text-center">Unque id</th> */}
                    {/* <th className="text-center">Overview</th> */}
                    {/* <th className="text-center">API name</th>
                    <th className="text-center">API status</th>
                    <th className="text-center">Download</th> */}
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    batchList &&
                    batchList?.map((item, i) => (
                      <tr key={i}>
                        <td className="text-center align-middle">
                          {" "}
                          <i
                            className="bi bi-eye-fill"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(
                                `/products/batch-deatils/${item._id}`
                              )
                            }
                          ></i>
                        </td>
                        <td className="text-center align-middle">
                          {item.createdAt}
                        </td>
                        {/* <td className="text-center align-middle">
                          <div
                            className="rounded-circle bg-primary text-white text-center"
                            style={{ width: "24px", height: "25px" }}
                          >
                            {item.numberofrequest}
                          </div>
                        </td> */}

                        <td className="text-center align-middle">{item._id}</td>
                        <td className="text-center align-middle">
                          {item.type}
                        </td>
                        <td className="text-center align-middle">
                          {item.records}
                        </td>
                        {/* <td className="text-center align-middle">{item.job_id}</td>
                        <td className="text-center align-middle">{item.unique_id}</td>
                        <td className="text-center align-middle">{item.backend_api_key_name}</td>
                        <td className="text-center align-middle">{item.apiStatus}</td> */}
                        {/* <td className="text-center align-middle">
                          <Check className="text-success" />
                        </td> */}
                        {/* <td className="text-center align-middle">
                          <Search className="text-primary" />
                        </td> */}
                        {/* <td className="text-center align-middle">
                          <Download onClick={()=>downloadTextFile(item.apiresponse,item.unique_id)} />
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductView;

// import React from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   apiBatchingAction,
//   getByIdAPIAction,
// } from "../../store/apiResponseManagement";
// import { useState } from "react";

// function BatchDeatils() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const table = ["Item", "name", "des"];

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(25);
//   const [searchQueries, setSearchQueries] = useState({});
//   const queryString = Object.entries(searchQueries)
//     .filter(([_, value]) => value !== "")
//     .map(([key, value]) => `${key}=${value}`)
//     .join("&");

//   console.log(queryString, "queryString");
//   useEffect(() => {
//     setSearchQueries({ batchId: id });
//     dispatch(apiBatchingAction(page, limit, queryString));
//   }, [id, page, limit, queryString]);
//   return (
//     <div className=" ">
//       <h2>Batch Deatils</h2>
//       <table>
//         <thead>
//           {table.map((item, i) => (
//             <tr key={i}>{item}</tr>
//           ))}
//         </thead>
//       </table>
//     </div>
//   );
// }

// export default BatchDeatils;
