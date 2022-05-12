import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';

import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  CardTitle,
  FormGroup,
  Label,
  Input,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from 'react-select'
import { connect } from "react-redux";
import Calender from "components/Calender/Calender";
import Popup from "components/Popup";
//Import Action to copy breadcrumb items from local state to redux state

const Formulaire = (props) => {
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
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);

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
        <title>Formulaire</title>
      </MetaTags>

      <Row>
        <Col xl="12"  className="container">
          <Card>
            <CardBody>
              <h4 className="card-title" class="d-flex flex-column align-items-center my-2  bg-primary" >Salle de reunion </h4>
                <Row>
                  <Col xl="12">
                    <div className="mb-3">
                    <div class="text-center">
                    <img src="https://www.createur-entreprise.net/wp-content/uploads/2021/04/salle-reunion.png" 
                     class="img-fluid" alt="..." /></div>
                    </div>
                  </Col>
                  </Row>
                  <Col md="12">
                  <div className="table-responsive">
                       <Table className="table mb-0">    
                  <tbody>
                    <tr>
                      <th scope="row">Nom du salle</th>
                      <td>Salle mauris</td>
                      <th scope="row">Adresse</th>
                      <td>France</td>
                    </tr>
                    <tr>
                      <th scope="row">Nombre du place</th>
                      <td>10</td>
                      <th scope="row">Equipements</th>
                      <td>PC</td>
                    </tr>
                  </tbody>  
                    </Table>
                 </div>
                 </Col>
                 <Row>
                 <Col md="50">
               
               <a href="#" class="btn btn-primary ml-50"   onClick={handleShow} >Reserver</a>
             
                 </Col>
                 </Row>
                 <h4 className="card-title"  style={{paddingTop:"px"}} class="d-flex flex-column align-items-center my-2 bg-primary">planning</h4>
            <Col><Calender /></Col>
            </CardBody>
           </Card>
          </Col>
         </Row>
         <Popup visibility={openModal} closeAction={handleClose} title={"Réserver une salle"} class="text-center" >
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
                  </div>
                  </Popup>
        </React.Fragment>
        
  );
};

export default connect(null)(Formulaire);