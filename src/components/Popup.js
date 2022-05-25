import React, { useState } from "react";
import { Modal, Button,Col } from "react-bootstrap";

function Popup({visibility,closeAction,children,title}) {

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh"  , width: "800px !important" }}
      >

      </div>
      <Modal size="lg" show={visibility} onHide={closeAction}>
        <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
        
          <Col md="50">
          <Button variant="secondary" onClick={closeAction}>
            Fermer
          </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;