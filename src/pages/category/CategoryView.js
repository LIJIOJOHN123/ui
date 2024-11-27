import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletecategoryAction,
  getByIdAPIAction,
} from "../../store/categorySlice";
import { deleteAPIGroupAction } from "../../store/groupSlice";

const CategoryView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { dataById, loading } = useSelector((state) => state.category);
  const { status } = useSelector((state) => state.groupApi);
  useEffect(() => {
    dispatch(getByIdAPIAction(id));
  }, [id]);
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
            <h3>Products</h3>
            <Button
              onClick={() => navigate(`/api-group/create/${id}`)}
              variant="primary"
              className="fw-bold"
            >
              Add Client
            </Button>
          </div>
          {/* {count} */}
          <Row className="mt-4">
            {dataById.length &&
              dataById.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="bg-info p-2 rounded-3 h-100">
                    <div
                      onClick={() =>
                        navigate(
                          `/category/api-group?id=${id}&clientId=${item.clientId}`
                        )
                      }
                    >
                      <h6>{item.name}</h6>
                      <p className="line-clamp">{item.des}</p>
                      <p className="line-clamp">{item._id}</p>
                    </div>
                    <div className="mt-3 " style={{ zIndex: 10 }}>
                      <Button
                        onClick={() => dispatch(deleteAPIGroupAction(item._id))}
                      >
                        DeleteLLL
                      </Button>
                      {/* <Button
                        onClick={() => navigate(`/category/edit/${item._id}`)}
                      >
                        Edit
                      </Button> */}
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default CategoryView;
