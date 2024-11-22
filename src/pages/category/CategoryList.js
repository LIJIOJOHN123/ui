import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  categoryAction,
  deletecategoryAction,
} from "../../store/categorySlice";

function CategoryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(categoryAction());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Category</h3>
            <Button
              onClick={() => navigate("/category/create")}
              variant="primary"
              className="fw-bold"
            >
              Add Category
            </Button>
          </div>
          {count}
          <Row className="mt-4">
            {data &&
              data.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="bg-info p-2 rounded-3 h-100">
                    <div onClick={() => navigate(`/category/${item._id}`)}>
                      <h6>{item.category_name}</h6>
                      <p className="line-clamp">{item.description}</p>
                      <b>
                        $
                        {item.fields.map((field, i) => (
                          <p key={i}>{field}</p>
                        ))}
                      </b>
                    </div>
                    <div className="mt-3 " style={{ zIndex: 10 }}>
                      <Button
                        onClick={() => dispatch(deletecategoryAction(item._id))}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => navigate(`/category/edit/${item._id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
