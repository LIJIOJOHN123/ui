import React from "react";
import { Accordion, Table, Badge } from "react-bootstrap";

const ValidationAccordion = ({ validationType, validations }) => {
  return (
    <Accordion className="mt-3 w-100">
      <Accordion.Item eventKey={validationType === 'Pre' ? "1" : "2"}>
        <Accordion.Header>{validationType} Validation</Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {validations?.map((validation) => (
                <tr key={validation._id}>
                  <td>{validation.name}</td>
                  <td>{validation.des}</td>
                  <td>
                    <Badge
                      bg={validation.status === "ACTIVE" ? "success" : "danger"}
                    >
                      {validation.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ValidationAccordion;
