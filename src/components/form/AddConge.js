import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";

import {withRouter} from "react-router-dom";
import CongeService from "../../api/CongeService";
import CollaborateurService from "../../api/CollaborateurService";
import { useAlert } from 'react-alert'

import moment from "moment";

const AddConge = (props) => {
    const alert = useAlert() 
    const [users, setUsers] = useState([]);
    const [optionscollaborateur, setOptionsCollaborateur] = useState([]);
    const [loading, setLoading] = useState(true);


    const [selectedMultiCongeType, setselectedMultiCongeType] = useState({label: props.data?props.data.type_conge:null, value: props.data?props.data.type_conge:null})

    function handleSelectedMultiCongeType(type_conge) {
        setselectedMultiCongeType(type_conge)
    }
    const [selectedMultiCollaborateur, setselectedMultiCollaborateur] = useState({label: props.data?props.data.collaborateur_id:null, value: props.data?props.data.collaborateur_id:null})

    function handleSelectedCollaborateurMulti(collaborateur) {
        setselectedMultiCollaborateur(collaborateur)
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
                values.id=props.data.id
                values.type_conge=selectedMultiCongeType.value
                values.collaborateur_id=selectedMultiCollaborateur.value

                const response=await CongeService.UpdateConges(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success(' Conge a été modifier avec succés')

                }

            }catch (e) {
                alert.error('Erreur modification')

            }
        }else{
            try {
                values.type_conge=selectedMultiCongeType.value
                values.collaborateur_id=selectedMultiCollaborateur.value
                values.status="pendding"

                const response=await CongeService.addConges(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success('Demande Conge a été enregistrer avec succés')

                }

            }catch (e) {
                alert.error('Erreur enregistrement')

            }
        }
    }


    async function  getUsersOptions(){
        var options=[]

        const response = await CollaborateurService.getAllCollaborateurs()

          if(response.status===200){
            response.data.map((item,index)=>{
                options.push({label: item.nom+""+item.prenom, value: item.id})
            })

          }
          setOptionsCollaborateur(options)


      }


      useEffect( () => {
        setLoading(true)
        getUsersOptions()
        setLoading(false)
      }, [])



      if(loading){
        return <loading></loading>
      }else{

        return (
            <AvForm className="needs-validation"
                    onValidSubmit={(e, v) => {
                        addCongeAction(e, v)
                    }}
            >
                <Row>
                <Col md="12">
                        <div className="mb-3 templating-select select2-container">
                            <label className="control-label">Collaborateur</label>
                            <Select
                                value={selectedMultiCollaborateur}
                                onChange={(e) => {
                                    handleSelectedCollaborateurMulti(e)
                                }}
                                options={[
                                    {
                                        label: "Collaborateur",
                                        options: optionscollaborateur
                                    },
                                ]}
                                classNamePrefix="select2-selection"
                                closeMenuOnSelect={false}
                            />
                        </div>
    
                    </Col>
                </Row>
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
                  
                
                <Col md="50">
    
                    <FormGroup className="mb-0">
                        <div>
                            <Button type="submit" color="primary" className="ms-1">
                                {props.data?"Mise a jour":"Ajouter"}
                            </Button>
                            <Button type="reset" color="secondary" href="/user">
                                Annuler
                            </Button>
                        </div>
                    </FormGroup>
                </Col>
    
            </AvForm>
        )
      }

}

export default withRouter(AddConge)
