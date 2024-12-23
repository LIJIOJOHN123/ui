import { Download } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wrmReportExportAction } from "../../../store/wrmReportManagentSlice";

const BatchList = ({ batchList }) => {
  const [headers, setHeaders] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const { data, loading: reportLoading, error: reportError } = useSelector((state) => state.wrmReport);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Helper function to format the date
  const formatDate = (date) => new Date(date).toLocaleDateString();

  // Handle batch selection
  const handleBatchClick = async(batchId) => {
    setSelectedBatchId(batchId);
    try {
        await dispatch(wrmReportExportAction(batchId));
      } catch (error) {
        console.error("Export failed:", error);
      }
  };

  // Update headers when data changes
  useEffect(() => {
    if (data?.length) {
      setHeaders(Object.keys(data[0]).map((key) => ({ label: key, key })));
    }
  }, [data]);

  // Handle export logic
  const handleExport = useCallback(async (batchId) => {
    // if (!batchId) return;

    // try {
    //   await dispatch(wrmReportExportAction(batchId));
    // } catch (error) {
    //   console.error("Export failed:", error);
    // }
  }, [dispatch]);

  // Render Export or Download button
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
            <Download className="me-2" onClick={() => handleExport(item._id)} />
            Download
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
    <div>
      <h5 className="mt-4">Batch List</h5>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-light">
          <tr>
            <th className="text-center">View</th>
            <th className="text-center">Date</th>
            <th className="text-center">Batch ID</th>
            <th className="text-center">Type</th>
            <th className="text-center">Records</th>
            <th className="text-center">Download</th>
          </tr>
        </thead>
        <tbody>
          {batchList?.map((item) => (
            <tr key={item._id} className="hoverable-row">
              <td className="text-center">
                <i
                  className="bi bi-eye-fill text-primary"
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={() => navigate(`/products/client-details/${item._id}`)}
                ></i>
              </td>
              <td className="text-center">{formatDate(item.createdAt)}</td>
              <td className="text-center">{item._id}</td>
              <td className="text-center">
                <Badge pill bg="info">
                  {item.type}
                </Badge>
              </td>
              <td className="text-center">{item.records}</td>
              <td className="text-center">
                {renderDownloadButton(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {reportError && (
        <div className="alert alert-danger mt-4" role="alert">
          Error occurred while exporting data. Please try again.
        </div>
      )}
    </div>
  );
};

export default BatchList;
