import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from 'react-bootstrap';
import { getByIdClientAction } from '../../store/clientManagementSlice';

const ClientDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.clientManagement.dataById);

    React.useEffect(() => {
        dispatch(getByIdClientAction(id));
    }, [id, dispatch]);

    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h3>User Details</h3>
                <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
            </div>
            
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{data.email}</Card.Subtitle>
                    <Card.Text>
                        <p>
                            <b>Role:</b> <Badge bg="secondary">{data.role}</Badge>
                        </p>
                        <p>
                            <b>Status:</b> <Badge bg={data.status === "ACTIVE" ? "success" : "danger"}>{data.status}</Badge>
                        </p>
                        <p>
                            <b>Account Balance:</b> ₹{data?.client?.account_balance}
                        </p>
                        <p>
                            <b>Backend API Key:</b> {data?.client?.backend_apikey}
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

export default ClientDetails;
