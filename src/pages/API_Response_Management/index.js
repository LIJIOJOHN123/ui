import { Check, Download, Search, Settings, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "react-bootstrap";

function BatchEnrichment() {
  return (
    
      <div >
        <h3>URL Risk Analysis - Batch Check CSV Files</h3>
        <div style={{ fontSize: "14px" }}>
          <p className="fw-semibold" style={{ whiteSpace: "pre-line" }}>
            {`Place the URLs you wish to batch check in a CSV file with 1 URL or domain per row - placed in the first column.`}

            {`\nAdditional columns can be included such as a userID, transactionID, clickID, etc. Live results will appear on this page as the file is processed. \nYou will receive an email notice once the report has finished processing. All completed reports are saved for future reference and can be viewed below.`}
          </p>
          <Button
            style={{ fontSize: "14px", backgroundColor: "#5bb75b" }}
            className="text-decoration-underline border-0"
          >
            Download Sample CSV Template
          </Button>
          <hr className="border-2" />
        </div>

        <div>
          <div
            style={{
              backgroundColor: "#e8f7ff",
              width: "60%",
              borderLeft: "5px solid #3babf4",
              padding: "10px", // Increased padding for better spacing
            }}
            className="rounded-1"
          >
            <div
              className="h-100"
              style={{ width: "10px", backgroundColor: "#3babf4" }}
            />
            <span className="fw-bold" style={{ color: "#3babf4" }}>
              NEW Feature:{" "}
            </span>
            <span className="fw-medium text-black">
              Bulk validation APIs are now live! Automatically process CSV files
              or large lists directly from your platform.
            </span>
            <span className="fw-semibold" style={{ color: "#3babf4" }}>
              {" "}
              View documentation
            </span>
          </div>
        </div>

        <div className="mt-4 ">
          <input
            className="mt-5 border border-2 rounded-1 p-1 border-black"
            style={{ width: "60%" }}
            type="file"
          />
        </div>

        <div className=" justify-content-center  d-flex w-50 mt-3">
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
                className="ml-5 d-flex justify-content-center align-items-center  "
              >
                <Settings className="text-white" />
              </div>
            </div>
          </div>
          <table className="table table-striped table-bordered mt-2">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center">
                  Records
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Overview
                </th>
                <th scope="col" className="text-center">
                  Download
                </th>
                <th scope="col" className="text-center">
                  View Results
                </th>
                <th scope="col" className="text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center align-middle">Example Name 1</td>
                <td className=" justify-content-center d-flex">
                  <div
                    className="rounded-circle bg-primary text-white text-center"
                    style={{ width: "24px", height: "25px" }}
                  >
                    4
                  </div>
                </td>
                <td className="text-center align-middle">2024-08-17</td>
                <td className="text-center align-middle">
                  <span className="badge badge-success">
                    <Check className="text-success" />
                  </span>
                </td>
                <td className="text-center align-middle">
                  <Search className="ml-2 text-primary" />
                </td>
                <td className="text-center text-primary align-middle">
                  <Download />
                </td>
                <td
                  className="text-center align-middle"
                  style={{ width: "300px" }}
                >
                  <Button
                    variant="secondary"
                    className="btn   btn-sm"
                    style={{ width: "60%" }}
                  >
                    View Enriched Report
                  </Button>
                </td>
                <td>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "red",
                    }}
                    className=" text-center  mx-auto"
                  >
                    <Trash2 className="text-white" />
                  </div>
                </td>
              </tr>

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

  );
}

export default BatchEnrichment;
