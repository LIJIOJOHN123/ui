import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import SingleRequest from "./SingleRequest";
import BatchRequest from "./BatchRequest";

const ApiIntroduction = () => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col >
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h1 className="text-center mb-4">API Introduction</h1>
              <p>
                Welcome to the API Introduction document. This guide will help you
                understand how to interact with our API effectively and
                efficiently. Our API is designed to provide seamless integration
                for developers, offering robust features and flexibility.
              </p>
              <h3>Key Features:</h3>
              <ul>
                <li>RESTful architecture</li>
                <li>JSON format for request and response</li>
                <li>Secure authentication via API keys</li>
                <li>Detailed documentation and error handling</li>
              </ul>
              <h3>Getting Started:</h3>
              <p>
                To begin using the API, follow these steps:
              </p>
              <ol>
                <li>Obtain your API key from the developer portal.</li>
                <li>Read through the endpoint documentation to understand the available features.</li>
                <li>Test the API using tools like Postman or curl.</li>
              </ol>
              <h3>Single Request Processing API</h3>
              <div style={{maxWidth: "870px", margin:"auto" }}>

              <SingleRequest/>
              <BatchRequest/>
              </div>
              <h3 className="mt-5">API Response</h3>
              <p>
                When making an API request, you can choose one of the following methods for receiving the response:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong> After a successful request, we can send the response directly to your registered email address. This method allows you to receive the result in a convenient, offline format.
                </li>
                <li>
                  <strong>Callback URL:</strong> You can provide a callback URL when making the request, and once the processing is complete, the response will be sent to that URL. This is useful for real-time integrations where you need to handle the data programmatically as soon as it's ready.
                </li>
                <li>
                  <strong>Download from Our Website:</strong> You can also download the response directly from our website. After the request is processed, a download link will be available in your user dashboard. This is ideal for handling large amounts of data or when you need to process the data manually.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApiIntroduction;
