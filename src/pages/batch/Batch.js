import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { batchListAction } from "../../store/apiResponseManagement";
import { updateTransactionAction } from "../../store/transactionSlice";
import BatchSearch from "./SearchInput";
import { BsEyeFill } from "react-icons/bs";
import { Download } from "lucide-react";

const Batch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQueries, setSearchQueries] = useState({});
  const [reportLoading, setReportLoading] = useState(false);
  const [data, setData] = useState([]);
  const headers = [{ label: "ID", key: "_id" }, { label: "Type", key: "type" }]; // Example headers

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(batchListAction(page, limit, queryString));
  }, [dispatch, page, limit, queryString]);

  const handleButton = (id, data) => {
    dispatch(updateTransactionAction(id, data));
  };

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const handleBatchClick = (batchId) => {
    setReportLoading(true);
    setSelectedBatchId(batchId);
    // Simulate fetching data
    setTimeout(() => {
      setData([{ _id: batchId, type: "Example Data" }]);
      setReportLoading(false);
    }, 2000);
  };

  const { batchList, count } = useSelector(
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

  return (
    <Fragment>
      <h3>Batch list</h3>
      <div className="d-flex align-items-center mb-4">
        <p className="mb-0 me-3">
          Total: <strong>{count}</strong>
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">View</th>
            <th scope="col">ID</th>
            <th scope="col">Type</th>
            <th scope="col">Number of Requests</th>
            <th scope="col">API Group ID</th>
            <th className="text-center">Download</th>
          </tr>
        </thead>
        <tbody>
          {batchList?.map((item) => (
            <tr key={item._id}>
              <td>
                <BsEyeFill
                  onClick={() =>
                    navigate(`/products/data/${item._id}`)
                  }
                />
              </td>
              <td>{item._id}</td>
              <td>{item.type}</td>
              <td>{item.records}</td>
              <td>{item.apiGroupId}</td>
              <td className="text-center">{renderDownloadButton(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Batch;
