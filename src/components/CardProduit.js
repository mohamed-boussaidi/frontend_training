import React from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"
import { MultiSelect } from "react-multi-select-component";

import Select from 'react-select'
import { useState } from "react";


 const CardProduit = props =>{
  
  return ( 
    <>
   <Row>
    <Col xl="12"  className="container">
          <Card>
            <CardBody>
            <div className="text-end float-end pt-3 p-4 "></div>
    <h1 className="text-center text-primary my-5">Les matériels</h1>

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
                 <h5 class="card-title" center>Salle mauris</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="/formulaire" class="btn btn-primary">Réserver</a>
                   </div>
                 </div> 
                </div> <div className="col-md-4">
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
    </>
  );
};
export default CardProduit;