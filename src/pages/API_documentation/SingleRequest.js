import React, { useState } from "react";
import { Card, Tabs, Tab, Container } from "react-bootstrap";

const SingleRequest = () => {
  const [key, setKey] = useState("curl");

  const examples = {
    curl: `curl -X POST \
-H "api-key: YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d '{"website": "https://chargebackzero.com/"}' \
https://validxapi.chargebackzero.com/web/api/v1/api_response_management/singlerequst`,

    javascript: `fetch('https://validxapi.chargebackzero.com/web/api/v1/api_response_management/singlerequst', {
  method: 'POST',
  headers: {
    'api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ website: 'https://chargebackzero.com/' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,

    python: `import requests

url = "https://validxapi.chargebackzero.com/web/api/v1/api_response_management/singlerequst"
headers = {
    "api-key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {"website": "https://chargebackzero.com/"}
response = requests.post(url, headers=headers, json=data)
print(response.json())`,

    node: `const fetch = require('node-fetch');

const url = 'https://validxapi.chargebackzero.com/web/api/v1/api_response_management/singlerequst';
const headers = {
  'api-key': 'YOUR_API_KEY',
  'Content-Type': 'application/json'
};
const body = JSON.stringify({ website: 'https://chargebackzero.com/' });

fetch(url, { method: 'POST', headers: headers, body: body })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
  };

  return (
    <Container className="mt-5" style={{ backgroundColor: "#121212", color: "#f8f9fa", minHeight: "50vh", padding: "2rem", borderRadius: "8px" }}>
      <Card className="shadow-lg rounded-4" style={{ backgroundColor: "#1e1e1e", border: "none" }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold fs-3" style={{ color: "#f8f9fa" }}>Single batch processing</Card.Title>
          <Card.Text className="text-muted text-center" style={{ color: "#b0b0b0" }}>
            Easily integrate our API using the examples below.
          </Card.Text>
          <Tabs
            id="api-examples-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            justify
            style={{ borderBottom: "1px solid #444" }}
          >
            <Tab eventKey="curl" title="cURL">
              <pre className="bg-dark text-light p-3 rounded-3" style={{ overflowX: "auto" }}>
                <code>{examples.curl}</code>
              </pre>
            </Tab>
            <Tab eventKey="javascript" title="JavaScript">
              <pre className="bg-dark text-light p-3 rounded-3" style={{ overflowX: "auto" }}>
                <code>{examples.javascript}</code>
              </pre>
            </Tab>
            <Tab eventKey="python" title="Python">
              <pre className="bg-dark text-light p-3 rounded-3" style={{ overflowX: "auto" }}>
                <code>{examples.python}</code>
              </pre>
            </Tab>
            <Tab eventKey="node" title="Node.js">
              <pre className="bg-dark text-light p-3 rounded-3" style={{ overflowX: "auto" }}>
                <code>{examples.node}</code>
              </pre>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleRequest;
