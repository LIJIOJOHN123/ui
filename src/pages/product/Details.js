import { Search, Settings } from "lucide-react";
import { Button, Card, Form, Col, Row, Badge, Accordion, Table, Spinner } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getByIdAPIAction } from "../../store/productManagementSlice";
import { batchListAction } from "../../store/apiResponseManagement";

function ProductView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { dataById } = useSelector((state) => state.productManagement);
  const { batchList, loading } = useSelector((state) => state.apiResponseManagement);

  useEffect(() => {
    dispatch(getByIdAPIAction(id));
    dispatch(batchListAction(1, 25, `productId=${id}`));
  }, [id, dispatch]);

  return (
    <div className="container-fluid px-4">
      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      )}

      {dataById && !loading && (
        <Card className="mt-4 shadow-lg border-light w-100">
          <Card.Body className="w-100">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-center w-100">
                <h4 className="font-weight-bold">Product Details and batch summary</h4>
              </div>
              <Button
                variant="primary"
                onClick={() => navigate(`/product/addbatch/${id}`)}
                className="my-3 px-4 py-2 rounded-pill shadow-sm btn-lg"
                style={{ backgroundColor: "#007bff", border: "none", fontSize: "16px", whiteSpace: "nowrap" }}
              >
                Add Batch
              </Button>
            </div>

            <div className="mt-5">
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

              {/* Client & API Details Section */}
              <div className="mt-5">


                {/* API Group Information Card */}
                <Card className="mb-4 w-100">
                  <Card.Header>API Group Information</Card.Header>
                  <Card.Body>
                    <h5>{dataById?.apiGroupId?.name}</h5>
                    <p>{dataById?.apiGroupId?.description}</p>
                    <p><strong>Fields:</strong> {dataById?.apiGroupId?.fields?.join(", ")}</p>
                    <p><strong>API Type:</strong> {dataById?.apiGroupId?.api_type}</p>
                    <p><strong>Status:</strong> <Badge bg={dataById?.apiGroupId?.status === "ACTIVE" ? "success" : "danger"}>{dataById?.apiGroupId?.status}</Badge></p>
                  </Card.Body>
                </Card>

                {/* APIs Associated with Client */}
                <h4 className="mb-3">APIs Associated with this product</h4>
                <Row>
                  {dataById.api && dataById.api.length > 0 ? (
                    dataById.api.map((api) => (
                      <Col xs={12} md={6} lg={4} key={api._id} className="mb-4">
                        <Card>
                          <Card.Body>
                            <Card.Title>{api.apiId.apiname}</Card.Title>
                            <Card.Text>{api.apiId.des}</Card.Text>
                            <p><strong>Status:</strong> <Badge bg={api.status === "ACTIVE" ? "success" : "danger"}>{api.status}</Badge></p>
                            <p><strong>Pricing:</strong> ${api.apiId.pricing}</p>
                            <Button variant="info" onClick={() => navigate(`/api/details/${api.apiId._id}`)}>
                              View API Details
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <p>No APIs found.</p>
                    </Col>
                  )}
                </Row>
                  
                {/* Pre-Validation Accordion */}
                <Accordion className="mt-3 w-100">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Pre-Validation</Accordion.Header>
                    <Accordion.Body>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataById?.preValidation?.map((validation) => (
                            <tr key={validation._id}>
                              <td>{validation.name}</td>
                              <td>{validation.des}</td>
                              <td>
                                <Badge bg={validation.status === 'ACTIVE' ? 'success' : 'danger'}>{validation.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* Post-Validation Accordion */}
                <Accordion className="mt-3 w-100">
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Post-Validation</Accordion.Header>
                    <Accordion.Body>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataById?.postValidation?.map((validation) => (
                            <tr key={validation._id}>
                              <td>{validation.name}</td>
                              <td>{validation.des}</td>
                              <td>
                                <Badge bg={validation.status === 'ACTIVE' ? 'success' : 'danger'}>{validation.status}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                {/* Batch List Table */}
                <h5 className="mt-4">Batch List</h5>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="text-center">View</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">Batch ID</th>
                      <th className="text-center">Type</th>
                      <th className="text-center">Records</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchList?.map((item) => (
                      <tr key={item._id}>
                        <td className="text-center">
                          <i
                            className="bi bi-eye-fill"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/products/batch-deatils/${item._id}`)}
                          ></i>
                        </td>
                        <td className="text-center">{item.createdAt}</td>
                        <td className="text-center">{item._id}</td>
                        <td className="text-center">{item.type}</td>
                        <td className="text-center">{item.records}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default ProductView;
