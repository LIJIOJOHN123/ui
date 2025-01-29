import React, { useEffect, useState } from "react";
import { Button, Pagination, Form, Table, Spinner, Row, Col, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchPopup from "./SearchInput";
import { wrmReportListAction } from "../../store/wrmReportManagentSlice";

const Report = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reportList: data, loading, reportCount: count } = useSelector((state) => state.wrmReport);
  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(wrmReportListAction(page, limit, queryString));
  }, [dispatch, page, limit, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const toggleRowSelect = (id) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const renderValue = (key, value) => {
    const jsonFormattedValue = JSON.stringify({ [key]: value }, null, 2);
  
    if (Array.isArray(value)) {
      return (
        <ListGroup>
          {value.map((item, index) => (
            <ListGroup.Item key={index} className="text-truncate">{JSON.stringify(item, null, 2)}</ListGroup.Item>
          ))}
        </ListGroup>
      );
    } else if (typeof value === 'number') {
      return <span className="text-muted">{value}</span>;
    } else if (typeof value === 'object' && value !== null) {
      return (
        <span className="text-truncate" style={{ maxWidth: '300px', display: 'inline-block' }}>
          {jsonFormattedValue}
        </span>
      );
    } else {
      return (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-${key}`}>{String(value)}</Tooltip>}
        >
          <span className="text-truncate" style={{ maxWidth: '300px', display: 'inline-block' }}>
            {String(value)}
          </span>
        </OverlayTrigger>
      );
    }
  };

  return (
    <div className="report-container" style={{ backgroundColor: "#f8f9fa", padding: "20px" }}>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>API List</h3>
            <div className="d-flex align-items-center mb-3 justify-content-end">
              <p className="mb-0 me-3">
                Total: <b>{count}</b>
              </p>
              <div className="d-flex align-items-center me-3">
                <label htmlFor="limit" className="me-2 mb-0">Records per Page:</label>
                <Form.Select
                  id="limit"
                  value={limit}
                  onChange={handleLimitChange}
                  aria-label="Select records per page"
                  className="w-auto"
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Form.Select>
              </div>
              <SearchPopup data={data} setSearchQueries={setSearchQueries} />
            </div>
          </div>
          <div className="sidebar">
            {/* <Button variant="primary" onClick={() => navigate("/api-list/create")}>Add API</Button> */}
            {/* <div className="mt-3">
              <Button variant="danger" disabled={selectedRows.size === 0}>Delete Selected</Button>
            </div> */}
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={() => {
                    if (selectedRows.size === data.length) {
                      setSelectedRows(new Set());
                    } else {
                      setSelectedRows(new Set(data.map(item => item._id)));
                    }
                  }} />
                </th>
                <th>Created at</th>
                <th>Batch id</th>
                <th>Job id</th>
                <th>Callback status</th>
                <th>Email status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <>
                    <tr key={item._id} onClick={() => toggleRowExpand(item._id)}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(item._id)}
                          onChange={() => toggleRowSelect(item._id)}
                        />
                      </td>
                      <td>{item.createdAt}</td>
                      <td>{item.batchId}</td>
                      <td>{item.job_id}</td>
                      <td>{item.clientReportSendToUrlStatus}</td>
                      <td>{item.clientReportSendToEmailStatus}</td>
                    </tr>
                    {expandedRow === item._id && (
                      <tr key={`${item._id}-expanded`}>
                        <td colSpan="6" className="text-muted">
                          <div>
                            {Object.keys(item).map((key) => (
                              <Row key={key} className="mb-3" style={{maxWidth:"800px"}}>
                                <Col md={5} className="fw-bold">
                                  {key}:
                                </Col>
                                <Col md={7}>{renderValue(key, item[key])}</Col>
                              </Row>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No APIs found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {count > limit && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev disabled={page === 1} onClick={() => handlePageChange(page - 1)} />
                {totalPages <= 5
                  ? [...Array(totalPages).keys()].map((num) => (
                      <Pagination.Item
                        key={num}
                        active={page === num + 1}
                        onClick={() => handlePageChange(num + 1)}
                      >
                        {num + 1}
                      </Pagination.Item>
                    ))
                  : <></>}
                <Pagination.Next disabled={page === totalPages} onClick={() => handlePageChange(page + 1)} />
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Report;
