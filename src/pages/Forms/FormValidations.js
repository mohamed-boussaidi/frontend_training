import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  Label,
  Input,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const FormValidations = (props) => {
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Forms", link: "#" },
    { title: "Form Validation", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Form Validation', breadcrumbItems)
  })


  const [fnm, setfnm] = useState(false)
  const [lnm, setlnm] = useState(false)
  const [unm, setunm] = useState(false)
  const [city, setcity] = useState(false)
  const [stateV, setstateV] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    var fnm = document.getElementById("validationTooltip01").value
    var lnm = document.getElementById("validationTooltip02").value
    var unm = document.getElementById("validationTooltipUsername").value
    var city = document.getElementById("validationTooltip03").value
    var stateV = document.getElementById("validationTooltip04").value

    if (fnm === "") {
      setfnm(false)
    } else {
      setfnm(true)
    }

    if (lnm === "") {
      setlnm(false)
    } else {
      setlnm(true)
    }

    if (unm === "") {
      setunm(false)
    } else {
      setunm(true)
    }

    if (city === "") {
      setcity(false)
    } else {
      setcity(true)
    }

    if (stateV === "") {
      setstateV(false)
    } else {
      setstateV(true)
    }

    var d1 = document.getElementsByName("validate")

    document.getElementById("tooltipForm").classList.add("was-validated")

    for (var i = 0; i < d1.length; i++) {
      d1[i].style.display = "block"
    }
  }

  //for change tooltip display propery
  function changeHandeler(event, eleId) {
    if (event.target.value !== "")
      document.getElementById(eleId).style.display = "none"
    else document.getElementById(eleId).style.display = "block"
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Form Validation | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags>

      <Row>
        <Col xl="12" md={12}>
          <Card>
            <CardBody>
              <h4 className="card-title">React Validation - Normal</h4>
              <p className="card-title-desc">
                Provide valuable, actionable feedback to your users with
                HTML5 form validation–available in all our supported
                browsers.
                  </p>
              <AvForm className="needs-validation">
                <Row>
                  <Col md="6">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom01">First name</Label>
                      <AvField
                        name="firstname"
                        placeholder="First name"
                        type="text"
                        errorMessage="Enter First Name"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom01"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom02">Last name</Label>
                      <AvField
                        name="lastname"
                        placeholder="Last name"
                        type="text"
                        errorMessage="Enter Last name"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom02"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom03">City</Label>
                      <AvField
                        name="city"
                        placeholder="City"
                        type="text"
                        errorMessage=" Please provide a valid city."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom04">State</Label>
                      <AvField
                        name="state"
                        placeholder="State"
                        type="text"
                        errorMessage="Please provide a valid state."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom04"
                      />
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom05">Zip</Label>
                      <AvField
                        name="zip"
                        placeholder="Zip Code"
                        type="text"
                        errorMessage=" Please provide a valid zip."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom05"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck"
                    required />
                  <label className="form-check-label" htmlFor="invalidCheck">
                    Agree to terms and conditions
                                        </label>
                  <div className="invalid-feedback">
                    You must agree before submitting.
                                        </div>
                </div>
                <Button color="primary" type="submit">
                  Submit form
                    </Button>
              </AvForm>
            </CardBody>
          </Card>
        </Col>

      </Row>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(FormValidations);