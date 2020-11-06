import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { FormGroup, Row, Col, Button } from "reactstrap";
import NumericInput from "react-numeric-input";
import "../FarmFieldForm/FarmFieldForm.css";

export default function MyVerticallyCenteredModal(props) {
  const [smallBucket, setSmallBucket] = useState(0);
  const [mediumBucket, setMediumBucket] = useState(0);
  const [largeBucket, setLargeBucket] = useState(0);
  const handleSmall = (value) => {
    setSmallBucket(value);
  };

  const handleMed = (value) => {
    setMediumBucket(value);
  };

  const handleLarge = (value) => {
    setLargeBucket(value);
  };

  function purchaseTicket(element) {
    Axios("api/farm-field-tickets", {
      method: "post",
      data: {
        ticketTimeSlot: "2020-05-25T04:36:54.172Z",
        smallBucket: smallBucket,
        mediumBucket: mediumBucket,
        largeBucket: largeBucket,
        farmFieldId: element.id,
      },

      withCredentials: true,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
          Select Your Bucket Size and Amount!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="form1">
          <h3>Bucket Sizes:</h3>
          <Row form>
            <Col md={4}>
              <FormGroup className="formGroup">Small:</FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <div className="buttonGroup">
                  <NumericInput
                    mobile
                    min={0}
                    max={20}
                    onChange={(value) => handleSmall(value)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup className="formGroup">Medium:</FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <div className="buttonGroup">
                  <NumericInput
                    mobile
                    min={0}
                    max={20}
                    onChange={(value) => handleMed(value)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup className="formGroup">Large:</FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <div className="buttonGroup">
                  <NumericInput
                    mobile
                    size={20}
                    min={0}
                    max={20}
                    onChange={(value) => handleLarge(value)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          outline
          color="primary"
          onClick={() => purchaseTicket(props.element)}
        >
          Purchase
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
