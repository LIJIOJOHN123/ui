import { Check, Download, Search, Settings, Trash2 } from "lucide-react";
import { Button, Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apiListAction } from "../../store/apiSlice";
import { getByIdAPIAction } from "../../store/groupSlice";
import {
  addAPIBatchingAction,
  apiBatchingAction,
} from "../../store/api_Batching";

function GroupApiView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [error, setError] = useState(false);
  const { dataById } = useSelector((state) => state.groupApi);
  const { data: apiData } = useSelector((state) => state.apiList);
  const {
    data: api,
    status,
    loading,
  } = useSelector((state) => state.apiBatching);
  const [formData, setFormData] = useState({});

  const fields =
    dataById?.apiList?.map((item) => item.apiId.fields).flat() || [];

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id)).catch(() => setError(true));
      dispatch(apiBatchingAction()).catch(() => setError(true));
    }

    if (status === "done") {
      dispatch(apiBatchingAction()).catch(() => setError(true));
    }
  }, [id, status, dispatch]);

  useEffect(() => {
    if (!apiData.length && !loading) {
      dispatch(apiListAction()).catch(() => setError(true));
    }
  }, [apiData, loading, dispatch]);

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addAPIBatchingAction({ apiValue: formData, apiGroupId: id }));

    // Reset formData to an empty object
    setFormData({});
  };

  return (
    <div>
      {loading && <p>Loading...</p>}

      {dataById && !loading && (
        <>
          <h4>Name: {dataById.name}</h4>
          <p>Description: {dataById.des}</p>

          {dataById.apiList && (
            <div>
              <h4>API Fields:</h4>
              {fields.map((field, index) => (
                <p key={index}>{field}</p>
              ))}
            </div>
          )}

          <div>
            <h3>URL Risk Analysis - Batch Check CSV Files</h3>
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                {fields.map((field, index) => (
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
                  {!loading &&
                    api &&
                    api.map((item, i) => (
                      <tr key={i}>
                        <td className="text-center align-middle">2024-08-17</td>
                        <td className="text-center align-middle">
                          <div
                            className="rounded-circle bg-primary text-white text-center"
                            style={{ width: "24px", height: "25px" }}
                          >
                            {/* {item.numberofrequest} */}
                          </div>
                        </td>
                        <td className="text-center align-middle">{item._id}</td>
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

export default GroupApiView;