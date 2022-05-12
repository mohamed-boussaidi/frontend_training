import React from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"
import { MultiSelect } from "react-multi-select-component";

import Select from 'react-select'
import { useState } from "react";
import Popup from './Popup';

 const Cards = props =>{
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);
  const [selectedMulti3, setselectedMulti3] = useState(null)
  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3)
  }
  const optionGroup2 = [
    {
      label: "Materiel informatique",
      options: [
        { label: "Portable", value: "Portable" },
        { label: "Pc", value: "PC" },
      ]
    },
  ]
  return (
    <>
   <Row>
    <Col xl="12"  className="container">
          <Card>
            <CardBody>
            <div className="text-end float-end pt-3 p-4 ">
            <button  className="btn btn-primary  w-md waves-effect waves-light" onClick={handleShow} type="submit">+</button></div>
    <h1 className="text-center text-primary my-5">RESERVATION DES SALLES</h1>

    <div className="container">
      <div className="row">
      
            <div className="col-md-4">
              <div class="card">
               <img src="https://www.createur-entreprise.net/wp-content/uploads/2021/04/salle-reunion.png" class="card-img-top" alt="..." />
                 <div class="card-body">
                  <h5 class="card-title" center>Salle mauris</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="/formulaire" class="btn btn-primary">Réserver</a>
                      <i className="mdi mdi-close-thick"></i>
                      <i className="mdi mdi-border-color"></i>
                      <i className="mdi mdi-clipboard-edit-outline"></i>
                      <i className="mdi mdi-close-circle-outline"></i>
                      <i className="mdi mdi-cog-outline"></i>

                   </div>
                 </div> 
                </div>
                
                <div className="col-md-4">
              <div class="card">
               <img src="https://www.createur-entreprise.net/wp-content/uploads/2021/04/salle-reunion.png" class="card-img-top" alt="..." />
                 <div class="card-body">
                 <h5 class="card-title" center>Salle mauris</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="/formulaire" class="btn btn-primary">Réserver</a>
                   </div>
                 </div> 
                </div>
                <div className="col-md-4">
              <div class="card">
               <img src="https://www.createur-entreprise.net/wp-content/uploads/2021/04/salle-reunion.png" class="card-img-top" alt="..." />
                 <div class="card-body">
                  <h5 class="card-title">Salle mauris</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="/formulaire" class="btn btn-primary">Réserver</a>
                   </div>
                 </div> 
                </div>
               </div>
             </div>
            </CardBody>
          </Card>
         </Col>
         </Row>
         <Popup visibility={openModal} closeAction={handleClose} title={"Ajouter une salle"} class="text-center" >
        <div>
              <AvForm className="needs-validation">
                <Row>
                  <Col md="6">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom01">Nom du salle</Label>
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
                      <Label htmlFor="validationCustom02">Adresse</Label>
                      <AvField
                        name="lastname"
                        placeholder="Adresse"
                        type="text"
                        errorMessage="SVP Entrez votre Prénom"
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom02"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div className="mb-3">
                      <Label htmlFor="validationCustom03">Nombre de place</Label>
                      <AvField
                        name="city"
                        placeholder="Nombre de place"
                        type="text"
                        errorMessage=" SVP Entrez votre Pays."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                  <div className="mb-3 templating-select select2-container">
                      <label className="control-label">Equipement</label>
                      <Select
                        value={selectedMulti3}
                        isMulti={true}
                        onChange={() => {
                          handleMulti3()
                        }}
                        options={optionGroup2}
                        classNamePrefix="select2-selection"
                        closeMenuOnSelect={false}
                      />
                    </div>

                  </Col>
                  <div className="mb-3">
                  <label className="form-lable">L'image du salle </label>
                  <input type="file" className="form-control form-control-file" data-buttonname="btn-secondary" />
                </div>
                  <FormGroup className="mb-0">
                  <div>
                    <Button type="submit" color="primary" className="ms-1">
                      Enregistrer
                        </Button>{" "}
                    <Button type="reset" color="secondary">
                      Annuler
                        </Button>
                  </div>
                </FormGroup>
                  </Row>
                  </AvForm>
                  </div>
                  </Popup>
    </>
  );
};
export default Cards;