import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";

import {withRouter} from "react-router-dom";
import CongeService from "../../api/CongeService";

import moment from "moment";

const CongeUser = (props) => {

    const [Conges, setConges] = useState([]);
    
    const [loading, setLoading] = useState(true);


    const [selectedMultiCongeType, setselectedMultiCongeType] = useState({label: props.data?props.data.type_conge:null, value: props.data?props.data.type_conge:null})

    function handleSelectedMultiCongeType(type_conge) {
        setselectedMultiCongeType(type_conge)
    }
   


    const optionGroup1 = [
        {
            label: "Type De Conge",
            options: [
                {label: "Congé payé", value: "Congé payé"},
                {label: "Congé sans solde", value: "Congé sans solde"},
                {label: "Congé annuel", value: "Congé annuel"},
                {label: "Congé d'examen", value: "Congé d'examen"},
                {label: "Congé maternité", value: "Congé maternité"},
            ]
        },
    ]


    async function addCongeAction(event, values){
        if(props.data){
            try {
                const userData  = localStorage.getItem("authUser")?JSON.parse(localStorage.getItem("authUser")):null
                values.type_conge=selectedMultiCongeType.value
                values.status="pendding"
                values.collaborateur_id=userData.data.id
                const response=await CongeService.addConges(values)
                if(response.status===200){
                    props.onRefresh()
                }
            }catch (e) {

            }
        }
    }


   

      useEffect( () => {
        setLoading(true)
        setLoading(false)
      }, [])



      if(loading){
        return <loading></loading>
      }else{

        return (
            <div className="container pt-5 pb-5 ">
            <Col xl="12"  className="container">
            <AvForm className="needs-validation"
                    onValidSubmit={(e, v) => {
                        addCongeAction(e, v)
                    }}
            >
                <h4 className="card-title" class="d-flex flex-column align-items-center my-2 bg-primary" >Passer une demande de congé </h4>
                
                <Row>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Nombre du jours</Label>
                            <AvField
                                name="nbr_jrs"
                                placeholder="Nombre du jours"
                                type="text"
                                value={props.data?props.data.nbr_jrs:null}
                                errorMessage=" SVP Entrez votre Nombre du jours"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                            />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="mb-3 templating-select select2-container">
                            <label className="control-label">type de congé</label>
                            <Select
                                value={selectedMultiCongeType}
                                onChange={(e) => {
                                    handleSelectedMultiCongeType(e)
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
                                htmlFor="example-date-input"
                            >
                                Date du début
                            </label>
                            <div className="col-md-13">
                                <AvField
                                    className="form-control"
                                    type="date"
                                    name={"date_debut"}
                                    value={props.data?moment(props.data.date_debut).format("YYYY-MM-DD") :null}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="mb-3">
                            <label
                                htmlFor="example-date-input"
                            >
                                Date de fin
                            </label>
                            <div className="col-md-13">
                                <AvField
                                    name={"date_fin"}
                                    className="form-control"
                                    type="date"
                                    value={props.data?moment(props.data.date_fin).format("YYYY-MM-DD") :null}
                                />
                            </div>
                        </div>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="12">
                        <div className="mb-3">
                            <label
                                htmlFor="example-date-input"
                            >
                                Date de demande
                                
                            </label>
                            <div className="col-md-13">
                                <AvField
                                    name={"date_demande"}
                                    className="form-control"
                                    type="date"
                                    value={props.data?moment(props.data.date_demande).format("YYYY-MM-DD") :null}
                                />
                            </div>
                        </div>
                    </Col>
                  </Row>
                
                <Col md="50">
    
                    <FormGroup className="mb-0">
                        <div>
                            <Button type="submit" color="primary" className="ms-1">
                                Ajouter
                            </Button>
                          
                        </div>
                    </FormGroup>
                </Col>
    
            </AvForm>
            </Col>
            </div>
        )
      }

}

export default CongeUser;
