import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { batchListAction } from "../../store/apiResponseManagement";
import BatchSearch from "./SearchInput";
import { BsEyeFill } from "react-icons/bs";
import { Download } from "lucide-react";
import { wrmReportExportAction } from "../../store/wrmReportManagentSlice";

const Batch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQueries, setSearchQueries] = useState({});
  const [headers, setHeaders] = useState([]);
  const {
    data,
    loading: reportLoading,
    error: reportError,
  } = useSelector((state) => state.wrmReport);
  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(batchListAction(page, limit, queryString));
  }, [dispatch, page, limit, queryString]);

  useEffect(() => {
    if (data?.length) {
      setHeaders(Object.keys(data[0]).map((key) => ({ label: key, key })));
    }
  }, [data]);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const handleBatchClick = async (batchId) => {
    setSelectedBatchId(batchId);
    try {
      await dispatch(wrmReportExportAction(batchId));
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const { batchList, count, loading } = useSelector(
    (state) => state.apiResponseManagement
  );

  const renderDownloadButton = (item) => {
    const isExporting = reportLoading && item._id === selectedBatchId;
    const isReadyForDownload = selectedBatchId === item._id && data?.length;

    return (
      <div className="d-flex justify-content-center">
        {isExporting ? (
          <Button variant="primary" size="sm" disabled>
            <Download className="me-2" />
            Exporting...
          </Button>
        ) : isReadyForDownload ? (
          <CSVLink
            headers={headers}
            data={data}
            filename={`${item._id}.csv`}
            target="_blank"
            className="btn btn-outline-primary btn-sm d-flex align-items-center"
          >
            <Download className="me-2" />
            Download
          </CSVLink>
        ) : (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleBatchClick(item._id)}
          >
            Select to Download
          </Button>
        )}
      </div>
    );
  };

  const renderPercentage = (item) => {
    const percentage = ((item.completedapis / item.totalapis) * 100).toFixed(2);
    let colorClass = "text-muted";

    if (percentage >= 90) {
      colorClass = "text-success"; 
    } else if (percentage >= 70) {
      colorClass = "text-warning"; 
    } else {
      colorClass = "text-danger";
    }

    return (
      <div className="d-flex align-items-center">
        <span className={`${colorClass} fw-bold`}>
          {percentage}%
        </span>
      </div>
    );
  };

  return (
    <Fragment>
      <h3 className="mb-4">Batch List</h3>
      <div className="d-flex align-items-center mb-4">
        <p className="mb-0 me-3">
          <strong>Total: {count}</strong>
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
        <BatchSearch setSearchQueries={setSearchQueries} />
      </div>
      
      <Card className="mb-4">
        <Card.Body>
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">View</th>
                <th scope="col">ID</th>
                <th scope="col">Type</th>
                <th scope="col">Number of Requests</th>
                <th scope="col">Total APIs</th>
                <th scope="col">Completed APIs</th>
                <th scope="col">Completed API Percentage</th> {/* New Column */}
                <th className="text-center">Download</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </td>
                </tr>
              ) : batchList.length > 0 ? (
                batchList.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <BsEyeFill
                        onClick={() => navigate(`/products/data/${item._id}`)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td>{item._id}</td>
                    <td>{item.type}</td>
                    <td>{item.records}</td>
                    <td>{item.totalapis}</td>
                    <td>{item.completedapis}</td>
                    <td>{renderPercentage(item)}</td> {/* Render Percentage */}
                    <td className="text-center">{renderDownloadButton(item)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No batches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Batch;
