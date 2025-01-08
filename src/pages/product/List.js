import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteproductAction,
  productAction,
} from "../../store/productManagementSlice";
import ProductSearchPopup from "./SearchInput";
import ConfirmationModal from "../../utils/ConfirmationModal ";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector(
    (state) => state.productManagement
  );

  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [apiToDelete, setApiToDelete] = useState({ id: null, name: "" });

  const ClientData = useSelector((state) => state.clientManagement.data);
  let ProductData = [];

  if (ClientData && data) {
    ProductData = data.map((item) => {
      const client = ClientData.find(
        (client) => client.clientId._id === item.clientId
      );
      return {
        ...item,
        clientName: client?.name ?? "Unknown Client", // Add the client's name
      };
    });
  }

  // Log the resulting `ProductData` array to verify

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(productAction(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const handleDelete = () => {
    if (apiToDelete.id) {
      dispatch(deleteproductAction(apiToDelete.id));
    }
    setShowDeleteModal(false);
    setApiToDelete({ id: null, name: "" });
  };

  const openDeleteModal = (id, name) => {
    setApiToDelete({ id, name });
    setShowDeleteModal(true);
  };

  return (
    <div className="container-fluid py-4">
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Products</h3>
          <Button
            onClick={() => navigate("/products/create")}
            variant="primary"
            className="fw-bold"
          >
            Add a product
          </Button>
        </div>
        <div className="d-flex align-items-center mb-4">
          <p className="mb-0 me-3">
            Total: <b>{count}</b>
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
          <ProductSearchPopup setSearchQueries={setSearchQueries} />
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Client Name</th>
              <th>Number of preValidation</th>
              <th>Number of postValidation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            ) : ProductData.length > 0 ? (
              ProductData.map((item, i) => (
                <tr key={i}>
                  <td>{(page - 1) * limit + i + 1}</td>
                  <td
                    className="text-truncate"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/products/${item._id}`)}
                  >
                    {item.name}
                  </td>
                  <td className="line-clamp">{item.clientName}</td>
                  <td className="line-clamp">{item.preValidation.length}</td>
                  <td className="line-clamp">{item.postValidation.length}</td>

                  <td>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openDeleteModal(item._id, item.name)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => navigate(`/products/edit/${item._id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

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
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={apiToDelete.name}
      />
    </div>
  );
}

export default Product;
