import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";

const HelpPage = () => {
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={12}>
            <h2>Help & Support</h2>
            <p>
              If you have any questions or need assistance, you've come to the
              right place!
            </p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            <Card>
              <Card.Header>Submit a Request</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Describe your issue"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HelpPage;
