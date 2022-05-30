import React, { useEffect, useState } from "react"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from 'react-select'
import { connect } from "react-redux";
import Calender from "components/Calender/Calender";
import {
    Row,
    Col,
    Button,
    FormGroup,
    Label,
  } from "reactstrap"
const AddReservation = (props) =>{

    const breadcrumbItems = [
        { title: "SPOC", link: "#" },
        { title: "Forumlaire", link: "#" },
      ]
      const [selectedMulti1, setselectedMulti1] = useState(null)
      function handleMulti1(selectedMulti1) {
        setselectedMulti1(selectedMulti1)
      }
      const optionGroup1 = [
        {
          label: "Materiel Dispo",
          options: [
            { label: "Ecran", value: "Ecran" },
            { label: "PC", value: "PC" },
          ]
        },
      ]

    

    


return(
    <div>
    <AvForm className="needs-validation">
      <Row>
        <Col md="6">
          <div className="mb-3">
            <Label htmlFor="validationCustom01">Nom du l'événement</Label>
            <AvField
              name="firstname"
              placeholder="Nom"
              type="text"
              errorMessage=" SVP Entrez votre nom"
              className="form-control"
              validate={{ required: { value: true } }}
              id="validationCustom01"
            />
          </div>
        </Col>
        <Col md="6">
          <div className="mb-3">
            <Label htmlFor="validationCustom02">Nombre des personnes</Label>
            <AvField
            className="mb-3"
            name="number"
            placeholder="Enter Only number"
            type="number"
            errorMessage="Enter Only Number"
            validate={{
            required: { value: true },
            pattern: {
            value: "^[0-9]+$",
            errorMessage: "Only Numbers",
            },
             }}
            />
          </div>
        </Col>
      </Row>
      <Row>
      <Col md="6">
          <div className="mb-3">
          <label
        htmlFor="example-date-input"
      
      
      >
       Date De Réservation
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
        <div className="mb-3 templating-select select2-container">
            <label className="control-label">Matériel Disponible</label>
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
        </Row>
        <Row>
        <Col md="6">
          <div className="mb-3">
          <label
        htmlFor="example-time-input"
      >
        Heure Début
          </label>
      <div className="col-md-15">
        <input
          className="form-control"
          type="time"
          defaultValue="09:00:00"
          id="example-time-input"
        />
      </div>
      
          </div>
        </Col>
        
        <Col md="6">
        <label
        htmlFor="example-time-input"
      >
        Heure Fin
          </label>
      <div className="col-md-15">
        <input
          className="form-control"
          type="time"
          defaultValue="09:00:00"
          id="example-time-input"
        />
          </div>
        </Col>
        </Row>
        <Col md="50">
       <FormGroup className="mb-0">
        <div>
          <Button type="submit" color="primary" className="ms-1">
            Enregistrer
              </Button>
          <Button type="reset" href="/formulaire" color="secondary">
            Annuler
              </Button>
        </div>
      </FormGroup>
       </Col>
        </AvForm>
        </div>)
};
export default AddReservation;