import { Check, Download, Search, Settings, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getByIdAPIAction } from "../../store/apiSlice";
import {
  addAPIBatchingAction,
  apiBatchingAction,
} from "../../store/api_Batching";

function ApiListView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dataById, loading } = useSelector((state) => state.apiList);
  const { data: api, loading: apiloading,status } = useSelector(
    (state) => state.apiBatching
  );
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  console.log(api.length);
  const isLoading = loading || apiloading;

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
      dispatch(apiBatchingAction());
    }
    if (status === "done") {
        dispatch(apiBatchingAction())
      }
    }, [id, status, dispatch]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAPIBatchingAction({ apiValue: formData, apiGroupId: id }));
    setFormData({});
    dispatch(apiBatchingAction());
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {dataById && !loading && (
        <>
          <h4>Name: {dataById.name}</h4>
          <p>Description: {dataById.des}</p>

          {dataById.apiList && (
            <div>
              <h4>API Fields:</h4>
              {dataById.fields?.map((field, index) => (
                <p key={index}>{field}</p>
              ))}
            </div>
          )}

          <div>
            <h3>URL Risk Analysis - Batch Check CSV Files</h3>
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                {dataById.fields?.map((field, index) => (
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>

            <div className="mt-4">
              <input
                className="mt-5 border border-2 rounded-1 p-1 border-black"
                style={{ width: "60%" }}
                type="file"
                onChange={handleFileChange}
              />
            </div>

            <div className="justify-content-center d-flex w-50 mt-3">
              <Button
                variant="danger"
                style={{ width: "150px", fontSize: "14px" }}
                className="my-3"
              >
                Upload CSV Files
              </Button>
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
                    className="ml-5 d-flex justify-content-center align-items-center"
                    style={{
                      width: "45px",
                      height: "45px",
                      backgroundColor: "red",
                      marginLeft: "10px",
                    }}
                  >
                    <Settings className="text-white" />
                  </div>
                </div>
              </div>

              <table className="table table-striped table-bordered mt-2">
                <thead className="thead-dark">
                  <tr>
                    <th className="text-center">Date</th>
                    <th className="text-center">Records</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Overview</th>
                    <th className="text-center">Download</th>
                    <th className="text-center">View Results</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {api?.map((item, i) => (
                    <tr key={i}>
                      <td className="text-center align-middle">
                        {new Date().toISOString().slice(0, 10)}
                      </td>
                      <td className="text-center align-middle">
                        <div
                          className="rounded-circle bg-primary text-white text-center"
                          style={{ width: "24px", height: "25px" }}
                        >
                          {/* Example Record Number */}
                          {item.numberOfRequests || "0"}
                        </div>
                      </td>
                      <td className="text-center align-middle">
                        {item.name || "N/A"}
                      </td>
                      <td className="text-center align-middle">
                        <Check className="text-success" />
                      </td>
                      <td className="text-center align-middle">
                        <Search className="text-primary" />
                      </td>
                      <td className="text-center align-middle">
                        <Download />
                      </td>
                      <td className="text-center align-middle">
                        <Button
                          variant="secondary"
                          className="btn btn-sm"
                          style={{ width: "60%" }}
                        >
                          View Enriched Report
                        </Button>
                      </td>
                      <td className="text-center align-middle">
                        <div
                          className="text-center mx-auto"
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "red",
                          }}
                        >
                          <Trash2 className="text-white" />
                        </div>
                      </td>
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

export default ApiListView;