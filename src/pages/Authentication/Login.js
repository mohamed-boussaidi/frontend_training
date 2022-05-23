import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React, {useState} from "react"
import UserService from 'api/UserService';

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { withRouter, Link, Redirect } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"


// import images
import logoLightPng from "../../assets/images/logo-light.png"
import logoDark from "../../assets/images/spoc.png"

const Login = props => {
  const [errorMessage,setErrorMessage]=useState(null)

  function loginAction   (event, values) {

    UserService.login(values).then(reponse=>{
      const data =JSON.stringify({token:reponse.data.token,role:reponse.data.role})
      localStorage.setItem("authUser",data)
      props.history.push('/')
    }).catch(e=>{
      setErrorMessage("Invalid email or password !")

    })

  }



  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-5 mb-4">
                    <Link to="/" className="d-block auth-logo">
                      <img src={logoDark} alt="" height="70" className="auth-logo-dark" />
                      <img src={logoLightPng} alt="" height="30" className="auth-logo-light" />
                    </Link>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">Bienvenue !</h4>
                    <AvForm
                      className="form-horizontal mt-4"
                      onValidSubmit={(e, v) => {
                        loginAction(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value="admin@themesbrand.com"
                          className="form-control"
                          placeholder="Entrez votre email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Mot de passe"
                          value="123456"
                          type="password"
                          required
                          placeholder="Entrez votre mot de passe"
                        />
                      </div>
                      <div className={"col-12 text-center"}>
                        <b
                            className=" text-danger "
                        >
                          {errorMessage}
                        </b>
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>

                        <div className="col-6 text-end">
                          <button className="btn btn-primary w-md waves-effect waves-light" type="submit">connection</button>
                        </div>
                      </div>
                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock"></i> Mot de passe oublié?</Link>
                        </div>
                      </div>

                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                 Vous n&#39;avez pas de compte ?{" "}
                  <Link
                    to="register"
                    className="text-primary"
                  >
                    {" "}
                    Inscrivez-vous{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} SPOC
                  <span className="d-none d-sm-inline-block"> - Fabrique avec <i className="mdi mdi-heart text-danger"></i> ISLAM AMOR.</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}



export default withRouter(Login)