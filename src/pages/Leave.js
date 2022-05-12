import React, { useEffect } from "react"
import MetaTags from 'react-meta-tags';
import {AvField } from "availity-reactstrap-validation"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  FormGroup,
  Button,
  CardTitle,
} from "reactstrap"

import { connect } from "react-redux";
import Popup from "components/Popup";
import Select from 'react-select'
import { useState } from "react";


//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import {MDBDataTable} from "mdbreact";
import { AvForm } from "availity-reactstrap-validation";

const Leave = (props) => {
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Congés", link: "#" }
  ]
  const [selectedMulti1, setselectedMulti1] = useState(null)
  function handleMulti1(selectedMulti1) {
    setselectedMulti1(selectedMulti1)
  }
  const optionGroup1 = [
    {
      label: "Les Types",
      options: [
        { label: "Maladie", value: "Maladie" },
      ]
    },
  ]
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);
  const data = {
    columns: [
      {
        label: "Matricule",
        field: "name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Demandateur",
        field: "position",
        sort: "asc",
        width: 100,
      },
      {
        label: "Date début",
        field: "office",
        sort: "asc",
        width: 100,
      },
      {
        label: "Date fin",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "Nombre des jours",
        field: "date",
        sort: "asc",
        width: 100,
      },
      {
        label: "Type congé",
        field: "salary",
        sort: "asc",
        width: 100,

      },
      {
        label: "Validation RH",
        field: "salary",
        sort: "asc",
        width: 100,

      },
      {
        label: "Validation Manager",
        field: "salary",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "salary",
        sort: "asc",
        width: 100,
      },
    ],
   
  }

  useEffect(() => {
    props.setBreadcrumbItems('Gestion les congés', breadcrumbItems)
  })
  return (
    <React.Fragment>

      <MetaTags>
        <title>Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags>

      <Row>
        <Col className="col-12">
          <Card>
          <div className="text-end float-end pt-3 p-3 ">
              <button  className="btn btn-primary  w-md waves-effect waves-light" onClick={handleShow} type="submit">+</button>
            </div>
            <CardBody>
              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Popup visibility={openModal} closeAction={handleClose} title={"Demande de congé"} class="text-center" >
        <div>
              <AvForm className="needs-validation">
                <Row>
                <Col md="6">
                    <div className="mb-3">
                    <label
                  htmlFor="example-date-input"
                
                
                >
                 Date de Début
                    </label>
                <div className="col-md-13">
                  <input
                    className="form-control"
                    type="date"
                    defaultValue="2022-03-19"
                    id="example-date-input"
                  />
                </div>
                </div>
                  </Col>
                  <Col md="6">
                    <div className="mb-3">
                    <label
                  htmlFor="example-date-input"
                >
                 Date de Fin
                    </label>
                <div className="col-md-13">
                  <input
                    className="form-control"
                    type="date"
                    defaultValue="2022-03-19"
                    id="example-date-input"
                  />
                </div>
                </div>
                  </Col>
                  </Row>
                  <Row>
                  <Col md="6">
                  <div className="mb-3 templating-select select2-container">
                      <label className="control-label">Type de Congé</label>
                      <Select
                        value={selectedMulti1}
                        isMulti={true}
                        onChange={() => {
                          handleMulti1()
                        }}
                        options={optionGroup1}
                        classNamePrefix="select2-selection"
                        closeMenuOnSelect={false}
                      />
                    </div>
                  </Col>
                  <Col md="6">
                  <div className="mb-3">
                  <label className="form-lable">Justificatif</label>
                  <input type="file" className="form-control form-control-file" data-buttonname="btn-secondary" />
                  </div>
                  </Col>
                  </Row>
                  <Row>
                  <AvField
                  className="mb-3"
                  type="textarea"
                  label="Commentaire"
                  name="address"
                  id="address"
                  rows="5"
                  placeholder="Address"
                  errorMessage="This value is required."
                  validate={{
                    required: { value: true },
                    pattern: {
                      value: "^[0-9a-zA-Z]+$",
                      errorMessage: "Only Alphanumeric",
                    },
                  }}
                />
                  </Row>
                  <Col md="50">
                 <FormGroup className="mb-0">
                  <div>
                    <Button type="submit" color="primary" className="ms-1">
                     Envoyer la demande
                        </Button>
                    <Button type="reset" href="/formulaire" color="secondary">
                      Annuler
                        </Button>
                  </div>
                </FormGroup>
                 </Col>
                </AvForm>
                </div>
                </Popup>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Leave);
