import React, { Fragment, useEffect, useState } from "react";
import { Card, Form, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  transactionListAction
} from "../../store/transactionSlice";
import TransactionSearchPopup from "./TransactionSearchPopup";
import moment from "moment";

const Transaction = () => {
  const dispatch = useDispatch();
  const { data, count } = useSelector((state) => state.transaction);
  const { user: userData } = useSelector((state) => state.auth);

  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(transactionListAction(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const totalPages = Math.ceil(count / limit);

  return (
    <Fragment>
      <h3 className="mb-4">Client Usage Tracker</h3>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <p className="mb-0 me-3">
            Total Transactions: <b>{count}</b>
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
          <TransactionSearchPopup setSearchQueries={setSearchQueries} />
        </div>

        {userData.role === "USER" && (
          <Card className="d-flex justify-content-center align-items-center p-3 shadow-sm">
            <p className="mb-0">
              <strong>Balance:</strong> <span className="fw-bold">{userData.account_balance}</span>
            </p>
          </Card>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">JOB ID</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>{moment(item.createdAt).format('MMMM Do YYYY')}</td>
                <td>{item.type}</td>
                <td>{item.job_id}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        {totalPages > 1 && (
               <div className="d-flex justify-content-center mt-4">
                 <Pagination>
                   <Pagination.Prev
                     disabled={page === 1}
                     onClick={() => setPage(page - 1)}
                   />
       
                   {/* Show pages dynamically based on the total page count */}
                   {totalPages <= 5 ? (
                     // If there are 5 or fewer pages, display all pages
                     [...Array(totalPages).keys()].map((num) => (
                       <Pagination.Item
                         key={num}
                         active={page === num + 1}
                         onClick={() => setPage(num + 1)}
                       >
                         {num + 1}
                       </Pagination.Item>
                     ))
                   ) : (
                     <>
                       {/* Show first page */}
                       <Pagination.Item
                         key={1}
                         active={page === 1}
                         onClick={() => setPage(1)}
                       >
                         1
                       </Pagination.Item>
       
                       {/* Show ellipsis if there is a gap between the first and the middle pages */}
                       {page > 3 && <Pagination.Ellipsis disabled />}
       
                       {/* Show middle pages, but limit the visible pages (3 pages before or after the current page) */}
                       {[...Array(3).keys()].map((i) => {
                         const pageNum = page + i - 1;
                         if (pageNum > 1 && pageNum < totalPages - 1) {
                           return (
                             <Pagination.Item
                               key={pageNum}
                               active={page === pageNum}
                               onClick={() => setPage(pageNum)}
                             >
                               {pageNum}
                             </Pagination.Item>
                           );
                         }
                         return null;
                       })}
       
                       {/* Show ellipsis if there is a gap between the middle pages and the last page */}
                       {page < totalPages - 3 && <Pagination.Ellipsis disabled />}
       
                       {/* Show last page */}
                       <Pagination.Item
                         key={totalPages}
                         active={page === totalPages}
                         onClick={() => setPage(totalPages)}
                       >
                         {totalPages}
                       </Pagination.Item>
                     </>
                   )}
       
                   <Pagination.Next
                     disabled={page === totalPages}
                     onClick={() => setPage(page + 1)}
                   />
                 </Pagination>
               </div>
             )}
      </div>
    </Fragment>
  );
};

export default Transaction;
