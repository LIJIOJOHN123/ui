import React, { useEffect, useState } from "react";
import { Form, Table, Pagination, Button, Spinner, Row, Col, Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  apiBatchingAction,
  retriggerBatchingAction,
} from "../../store/apiResponseManagement";
import ApiResponseSearchPopup from "./SearchInput";

const LOCAL_STORAGE_LIMIT_KEY = "apiResponseLimit";

const BatchTableRow = ({ item, navigate, dispatch, isExpanded, toggleExpand, selectedItems, toggleItemSelect }) => (
  <>
    <tr onClick={() => toggleExpand(item._id)} style={{ cursor: "pointer" }}>
      <td className="text-center align-middle">
        <input
          type="checkbox"
          checked={selectedItems.has(item._id)}
          onChange={() => toggleItemSelect(item._id)}
        />
      </td>
      <td className="text-center align-middle">
        <Button
          variant="link"
          className="p-0 text-primary"
          onClick={() => navigate(`/products/batch-details-view/${item._id}`)}
          aria-label={`View details for ${item._id}`}
        >
          <i className="bi bi-eye-fill"></i>
        </Button>
      </td>
      <td className="text-center align-middle">{item.batchId}</td>
      <td className="text-center align-middle">{item.job_id}</td>
      <td className="text-center align-middle">{item.backend_api_key_name}</td>
      <td className="text-center align-middle">{item.apiStatus}</td>
      <td className="text-center align-middle"></td>
    </tr>

    {isExpanded && (
      <tr>
        <td colSpan="8" className="text-center bg-light">
          <div className="p-3">
            <Table striped bordered size="sm" className="m-0">
              <tbody>
                <tr>
                  <td><strong>Pre validation status</strong></td>
                  <td>{item.preValidationStatus}</td>
                </tr>
                <tr>
                  <td><strong>Post validation status</strong></td>
                  <td>{item.postValidationStatus}</td>
                </tr>
                <tr>
                  <td><strong>WRM Report Status</strong></td>
                  <td>{item.wrmMinReportStatus}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </td>
      </tr>
    )}
  </>
);

function ApiResponse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const initialLimit =
    parseInt(localStorage.getItem(LOCAL_STORAGE_LIMIT_KEY), 10) || 25;
  const [limit, setLimit] = useState(initialLimit);

  const [searchQueries, setSearchQueries] = useState({});
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [selectedItems, setSelectedItems] = useState(new Set());
  
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [actionMessage, setActionMessage] = useState(""); // Message to be displayed on the modal

  const {
    data = [],
    count = 0,
    loading,
  } = useSelector((state) => state.apiResponseManagement);
  
  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(apiBatchingAction(page, limit, queryString));
  }, [dispatch, page, limit, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
    localStorage.setItem(LOCAL_STORAGE_LIMIT_KEY, value);
  };

  const handleRefresh = () => {
    dispatch(apiBatchingAction(page, limit, queryString));
  };

  const handleResetSearch = () => {
    setSearchQueries({});
  };

  const toggleExpand = (id) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id);
      } else {
        newExpandedRows.add(id);
      }
      return newExpandedRows;
    });
  };

  const toggleItemSelect = (id) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev);
      if (newSelectedItems.has(id)) {
        newSelectedItems.delete(id);
      } else {
        newSelectedItems.add(id);
      }
      return newSelectedItems;
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === data.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(data.map(item => item._id)));
    }
  };

  const handleActionOnSelected = (message) => {
    setActionMessage(message); // Set the action message for the modal
    setShowModal(true); // Show the modal
  };

  const handleConfirmAction = () => {
    selectedItems.forEach(itemId => {
      dispatch(retriggerBatchingAction(itemId, { message: actionMessage }));
    });
    setShowModal(false); // Close the modal after confirmation
    handleRefresh(); // Refresh the data after confirmation
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal without doing anything
    dispatch(apiBatchingAction(page, limit, queryString));
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100 py-4">
      <h2 className="text-center mb-4">API Responses</h2>
      <Row className="justify-content-between align-items-center mb-4">
        <Col xs="auto" className="d-flex align-items-center">
          <p className="mb-0 me-3">
            <strong>Total:</strong> {count}
          </p>

          <div className="d-flex align-items-center me-3">
            <label htmlFor="limit" className="me-2">
              Records per Page:
            </label>
            <Form.Select
              id="limit"
              className="form-select w-auto"
              value={limit}
              onChange={handleLimitChange}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Form.Select>
          </div>
        </Col>

        <Col xs="auto" className="d-flex align-items-center justify-content-end">
          <Button
            variant="primary"
            className="ms-3"
            onClick={() => handleActionOnSelected("prevalidation")}
            disabled={selectedItems.size === 0}
          >
            Prevalidation Reset
          </Button>
          <Button
            variant="primary"
            className="ms-3"
            onClick={() => handleActionOnSelected("postvalidation")}
            disabled={selectedItems.size === 0}
          >
            Post validation reset
          </Button>
          <Button
            variant="primary"
            className="ms-3"
            onClick={() => handleActionOnSelected("apitrigger")}
            disabled={selectedItems.size === 0}
          >
            Retrigger API
          </Button>
          <Button
            variant="primary"
            className="ms-3"
            onClick={() => handleActionOnSelected("regeneratereport")}
            disabled={selectedItems.size === 0}
          >
            Regenerate report
          </Button>
          <ApiResponseSearchPopup setSearchQueries={setSearchQueries} />
          <Button
            variant="primary"
            className="ms-2"
            onClick={handleResetSearch}
            aria-label="Reset search"
          >
            Reset
          </Button>
          <Button
            variant="primary"
            className="ms-3"
            onClick={handleRefresh}
            aria-label="Refresh data"
          >
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </Button>
        </Col>
      </Row>

      <div className="table-responsive" style={{ overflowX: 'auto' }}>
        <Table striped bordered hover size="sm" style={{ minWidth: '1000px' }}>
          <thead className="table-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedItems.size === data.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>View</th>
              <th>Batch id</th>
              <th>Job ID</th>
              <th>Key Name</th>
              <th>API Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <BatchTableRow
                  key={item._id}
                  item={item}
                  navigate={navigate}
                  dispatch={dispatch}
                  isExpanded={expandedRows.has(item._id)}
                  toggleExpand={toggleExpand}
                  selectedItems={selectedItems}
                  toggleItemSelect={toggleItemSelect}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
            <Pagination.Next
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
          </Pagination>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to perform the "{actionMessage}" action on the selected items?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ApiResponse;
