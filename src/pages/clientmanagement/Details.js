import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Badge, Button, Card, Form, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clientDetailsListAction, editActivePaymentDetailsAction, editClientDetailsAction } from '../../store/clientManagementSlice';

const ClientDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.clientManagement);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        backend_apikey: "",
        typeofuser: "",
        apikey: "",
        website: ""
    });
    const [showModal, setShowModal] = useState(false);  // State to manage modal visibility
    const [planData, setPlanData] = useState({
        planName: "",
        planExpireDate: "",
        balance: "",  // Add balance field
        currentlyActivePlan: false // This is for the switch toggle
    });

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clientDetailsListAction(id));
    }, [id, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setFormData({
            backend_apikey: data?.client?.backend_apikey,
            typeofuser: data?.client?.typeofuser,
            apikey: data?.client?.apikey,
            website: data?.client?.website
        });

        // Set initial values for plan data
        setPlanData({

            planExpireDate: moment(data?.ActivePayment?.planExpireDate).format("YYYY-MM-DD"),
            balance: data?.ActivePayment?.balance || "",
            currentlyActivePlan: data?.ActivePayment?.currentlyActivePlan || false, // Assuming plan data contains isActive
        });
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editClientDetailsAction(id, formData));

        setEdit(false);
        dispatch(clientDetailsListAction(id));
        console.log('Form Data:', formData);
    };

    const handlePlanChange = (e) => {
        const { name, value, checked, type } = e.target;
        // If it's a checkbox/switch, handle the checked property
        setPlanData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handlePlanSubmit = (e) => {
        e.preventDefault();
        dispatch(editActivePaymentDetailsAction(data?.ActivePayment?._id, planData));
        console.log('Updated Plan Data:', planData);
        dispatch(clientDetailsListAction(id));
        setShowModal(false);  // Close modal after submit
    };
    console.log(data);
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
                        <p>
                            <b>Account Balance:</b> ₹{data?.client?.account_balance}
                        </p>
                        <p>
                            <b>Backend API Key:</b> {data?.client?.backend_apikey}
                        </p>
                        <p>
                            <b>API Key:</b> {data?.client?.apikey}
                        </p>
                        <p>
                            <b>Active Plan:</b> <Badge bg="success">{data?.plan?.name}</Badge>
                        </p>
                    </Card.Text>
                    <Button onClick={() => setEdit((prev) => !prev)} variant="primary" className='w-25'>Edit </Button>
                    {edit && (
                        <div className='mt-4'>
                            <h3>Edit User</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBackendApiKey">
                                    <Form.Label>Backend API Key</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Backend API Key"
                                        name="backend_apikey"
                                        value={formData.backend_apikey}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formApiKey">
                                    <Form.Label>API Key</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter API Key"
                                        name="apikey"
                                        value={formData.apikey}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formWebsite">
                                    <Form.Label>Domain</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Domain URL"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formTypeOfUser">
                                    <Form.Label>Type of User</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="typeofuser"
                                        value={formData.typeofuser}
                                        onChange={handleChange}
                                    >
                                        <option disabled value="">Select User Type</option>
                                        <option value="INTERNAL">Internal</option>
                                        <option value="USER">User</option>
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

            {/* Payment Details Section */}
            <Card className="shadow-sm">
                <Card.Body>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Card.Title>Payment Details</Card.Title>
                        {data?.ActivePayment &&
                            <Button variant="primary" onClick={() => setShowModal(true)}>Edit Plan</Button>

                        }
                    </div>
                    <Table className='mt-4' striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Payment Status</th>
                                <th>Plan Expires On</th>
                                <th>Total Request</th>
                                <th>Balanace</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.payment?.map((order, index) => (
                                <tr key={index}>
                                    <td>{moment(order.createdAt).format('MM/DD/YYYY')}</td>
                                    <td>{order.orderId}</td>
                                    <td>₹{order.amount}</td>

                                    <td>
                                        <Badge bg={order.payment_status === 'PAID' ? 'success' : 'danger'}>
                                            {order.payment_status}
                                        </Badge>
                                    </td>
                                    <td>{moment(order.planExpireDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>{order.totalrequest}</td>
                                    <td>{order.balance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Modal for Editing Plan */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePlanSubmit}>
                        <Form.Group controlId="formBalance">
                            <Form.Label>Balance</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Balance"
                                name="balance"
                                value={planData.balance}
                                onChange={handlePlanChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCurrentlyActivePlan">
                            <Form.Label>Currently Active Plan</Form.Label>
                            <Form.Switch
                                name="currentlyActivePlan"
                                checked={planData.currentlyActivePlan}
                                onChange={handlePlanChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPlanExpireDate">
                            <Form.Label>Plan Expiry Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="planExpireDate"
                                value={planData.planExpireDate}
                                onChange={handlePlanChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Plan
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default ClientDetails;
