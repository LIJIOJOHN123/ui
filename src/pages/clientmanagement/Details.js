import React, { Fragment, useEffect, useState } from 'react';
import { Badge, Button, Card, Table, Spinner, Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clientDetailsListAction } from '../../store/clientManagementSlice';
import moment from 'moment';

const ClientDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.clientManagement);
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({ backend_apikey: "", typeofuser: "", apikey: "" })
    const navigate = useNavigate();




    useEffect(() => {
        dispatch(clientDetailsListAction(id));
    }, [id, dispatch]);
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from event target
        setFormData((prevData) => ({
            ...prevData, // Spread the previous form data
            [name]: value // Update the specific field by name
        }));
    };


    useState(() => {
        setFormData({
            backend_apikey: data?.client?.backend_apikey,
            typeofuser: data?.client?.typeofuser
        })
    }, [data])

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form Data:', formData);
    };
    console.log(data)
    return (
        <Fragment>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h3>User Details</h3>
                <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
            </div>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Card.Title>{data?.client?.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{data?.client?.email}</Card.Subtitle>
                    <Card.Text>
                        <p>
                            <b>Client ID:</b> <Badge bg="secondary">{data?.client?._id}</Badge>
                        </p>
                        {/* <p>
                            <b>Status:</b> <Badge bg={data.status === "ACTIVE" ? "success" : "danger"}>{data.status}</Badge>
                        </p> */}
                        <p>
                            <b>Account Balance:</b> ₹{data?.client?.account_balance}
                        </p>
                        <p>
                            <b>Backend API Key:</b> {data?.client?.backend_apikey}
                        </p>
                        <p>
                            <b> API Key:</b> {data?.client?.apikey}
                        </p>
                        <p>
                            <b>Active Plan:</b> <Badge bg="success">{data?.plan?.name}</Badge>
                        </p>
                    </Card.Text>
                    <Button onClick={() => setEdit((prev) => !prev)} variant="primary" className='w-25'>Edit </Button>
                    {edit && (
                        <div className='mt-4'>
                            <h3>Edit user</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBackendApiKey">
                                    <Form.Label>Backend API Key</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Backend API Key"
                                        name="backend_apikey" // Use the field name to match the state key
                                        value={formData.backend_apikey} // Bind to state
                                        onChange={handleChange} // Update state on input change
                                    />
                                </Form.Group>

                                <Form.Group controlId="formTypeOfUser">
                                    <Form.Label>Type of User</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="typeofuser" // Use the field name to match the state key
                                        value={formData.typeofuser} // Bind to state
                                        onChange={handleChange} // Update state on selection change
                                    >
                                        <option value="">Select User Type</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </div>
                    )}
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title>Payment Details</Card.Title>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Amount </th>
                                <th>Payment Status</th>
                                <th>Plan Expires On</th>
                                <th>Total Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.payment?.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.orderId}</td>
                                    <td>₹{order.amount}</td>

                                    <td>
                                        <Badge bg={order.payment_status === 'PAID' ? 'success' : 'danger'}>
                                            {order.payment_status}
                                        </Badge>
                                    </td>
                                    <td>{moment(order.planExpireDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>{order.totalrequest}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Fragment>
    );
};

export default ClientDetails;
