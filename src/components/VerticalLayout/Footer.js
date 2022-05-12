import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col sm={12}>
              © {new Date().getFullYear()} SPOC <span className="d-none d-sm-inline-block"> - Fabriquer avec <i className="mdi mdi-heart text-danger"></i> Par Islem.</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
