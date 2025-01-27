import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Spinner, Badge, Button, Pagination, Table, Dropdown, Alert, ProgressBar } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { Download } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clientActivePlanProductAction } from "../../store/apiResponseManagement";
import { wrmReportExportAction } from "../../store/wrmReportManagentSlice";
import AddInput from "./AddInput";
import Pricing from "../../components/Pricing";

const PaginationComponent = ({ totalPages, page, setPage }) => {
  return totalPages > 1 && (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={page === index + 1} onClick={() => setPage(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
      </Pagination>
    </div>
  );
};

const BatchTable = ({ batchList, reportLoading, reportData, selectedBatchId, handleBatchClick, headers }) => {
  const getProgressBarVariant = (percentage) => {
    if (percentage === 0) return "secondary";
    if (percentage === 100) return "success";
    return "purple";
  };

  const renderDownloadButton = (item) => {
    const isExporting = reportLoading && item._id === selectedBatchId;
    const isReadyForDownload = selectedBatchId === item._id && reportData?.length;

    return (
      <div className="d-flex justify-content-center">
        {isExporting ? (
          <Button variant="primary" size="sm" disabled>
            <Download className="me-2" /> Exporting...
          </Button>
        ) : isReadyForDownload ? (
          <CSVLink
            headers={headers}
            data={reportData}
            filename={`${item._id}.csv`}
            target="_blank"
            className="btn btn-outline-primary btn-sm d-flex align-items-center"
          >
            <Download className="me-2" /> Download
          </CSVLink>
        ) : (
          <Button variant="outline-primary" size="sm" onClick={() => handleBatchClick(item._id)}>
            Select to Download
          </Button>
        )}
      </div>
    );
  };

  return (
    <Table striped bordered hover responsive className="shadow-sm">
      <thead>
        <tr>
          <th className="text-center">Date</th>
          <th className="text-center">Batch ID</th>
          <th className="text-center">Type</th>
          <th className="text-center">Records</th>
          <th className="text-center">Status</th>
          <th className="text-center">Download</th>
        </tr>
      </thead>
      <tbody>
        {batchList.map((item) => {
          const percentage = item.totalapis && item.completedapis ? (item.completedapis / item.totalapis) * 100 : 0;
          const progressBarVariant = getProgressBarVariant(percentage);
          return (
            <tr key={item._id}>
              <td className="text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="text-center">{item._id}</td>
              <td className="text-center">
                <Badge bg="info">{item.type}</Badge>
              </td>
              <td className="text-center">{item.records}</td>
              <td className="text-center">
                <div className="d-flex align-items-center">
                  <ProgressBar
                    now={percentage}
                    label={`${percentage.toFixed(2)}%`}
                    style={{ width: "150px", height: "20px" }}
                    variant={progressBarVariant}
                    className="me-2"
                  />
                  <span>{percentage.toFixed(2)}%</span>
                </div>
              </td>
              <td className="text-center">{renderDownloadButton(item)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const ClientActivePlanProduct = ({ id }) => {
  const dispatch = useDispatch();

  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(() => parseInt(localStorage.getItem("batchListLimit"), 10) || 25);

  const { clientActivePlanProduct: data, loading, batchList, batchCount } = useSelector((state) => state.apiResponseManagement);
  const { data: reportData, loading: reportLoading, error: reportError } = useSelector((state) => state.wrmReport);

  const totalPages = Math.ceil(batchCount / limit);

  const headers = useMemo(() => {
    if (reportData?.length) {
      return Object.keys(reportData[0]).map((key) => ({ label: key, key }));
    }
    return [];
  }, [reportData]);

  useEffect(() => {
    dispatch(clientActivePlanProductAction(page, limit));
  }, [id, page, limit, dispatch]);

  useEffect(() => {
    localStorage.setItem("batchListLimit", limit);
  }, [limit]);

  const handleBatchClick = useCallback(async (batchId) => {
    setSelectedBatchId(batchId);
    try {
      dispatch(wrmReportExportAction(batchId));
    } catch (error) {
      console.error("Export failed:", error);
    }
  }, [dispatch]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="container-fluid px-4">
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {data?.productId ? (
            <AddInput id={data.productId} dataById={data.productInfo} />
          ) : (
            <Pricing />
          )}

          {batchList.length > 0 && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Batch List</h5>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" size="sm">
                    Limit: {limit}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[25, 50, 100].map((option) => (
                      <Dropdown.Item key={option} onClick={() => handleLimitChange(option)}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <BatchTable 
                batchList={batchList} 
                reportLoading={reportLoading} 
                reportData={reportData} 
                selectedBatchId={selectedBatchId} 
                handleBatchClick={handleBatchClick} 
                headers={headers} 
              />

              <PaginationComponent 
                totalPages={totalPages} 
                page={page} 
                setPage={setPage} 
              />

              {reportError && <Alert variant="danger">Error occurred while exporting data. Please try again.</Alert>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ClientActivePlanProduct;
