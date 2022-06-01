import React, { useEffect } from "react"
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"

import Select from 'react-select'
import { useState } from "react";
import SalleService from "../../api/SalleService";
import Loading from "../Loading";

 const CardSalle = props =>{
  const [salles, setSalles] = useState(null);
  const [loading, setLoading] = useState(false);

  async function  getSalles(){
    setLoading(true)
    const response = await SalleService.Salles()
      if(response.status===200){
        setSalles(response.data)
        setLoading(false)
      }
  }
  function onRefresh(){
    getSalles()
  }

  useEffect( () => {
    getSalles()
  }, [])
  return (
    <>
   <Row>
    <Col xl="12"  className="container">
          <Card>
            <CardBody>
    <h1 className="text-center text-primary my-5">RESERVATION DES SALLES</h1>
                {
                    loading
                        ?
                        <Loading/>
                        :
                        <div className="container">
                            <div className="row">
                                {salles ? salles.map((item, index) =>
                                        <div className="col-md-4" key={index}>

                                            <div className="col-md-4" key={index}>
                                                <div className="card" style={{width: "18rem"}}>
                                                    <img className="card-img"
                                                         src={process.env.REACT_APP_URL_IMAGES_SALLES + item.image}
                                                         alt="Card image cap"/>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.nom_du_salle}</h5>
                                                        <div className="row">
                                                            <div className="col-10"><h5>Nombre du place:</h5></div>
                                                            <div className="card-title col-2 ">{item.nbr_place}</div>
                                                        </div>
                                                        <h5 className="card-title">{item.nom_du_salle}</h5>
                                                        <a href={"/calendarsalles/" + item.id}
                                                           className="btn btn-primary">Réservation</a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                    :
                                    <></>
                                }


                            </div>
                        </div>
                }
            </CardBody>
          </Card>
         </Col>
         </Row>

    </>
  );
};
export default CardSalle;