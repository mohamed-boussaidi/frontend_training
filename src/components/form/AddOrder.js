import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";

import {withRouter} from "react-router-dom";
import ExpenseService from "../../api/ExpenseService";
import CollaborateurService from "../../api/CollaborateurService";

import moment from "moment";

const AddOrder = (props) => {
    const [users, setUsers] = useState([]);
    const [optionscollaborateur, setOptionsCollaborateur] = useState([]);
    const [loading, setLoading] = useState(true);


    const [selectedMultiTypeDepense, setselectedMultiTypeDepense] = useState({label: props.data?props.data.type_depense:null, value: props.data?props.data.type_depense:null})

    function handleSelectedMultiTypeDepense(type_depense) {
        setselectedMultiTypeDepense(type_depense)
    }
    const [selectedMultiCollaborateur, setselectedMultiCollaborateur] = useState({label: props.data?props.data.collaborateur_id:null, value: props.data?props.data.collaborateur_id:null})

    function handleSelectedCollaborateurMulti(collaborateur) {
        setselectedMultiCollaborateur(collaborateur)
    }


    const optionGroup1 = [
        {
            label: "Type De depense",
            options: [
                {label: "Hotel", value: "Hotel"},
                {label: "Taxi", value: "Taxi"},
                {label: "Dinner", value: "dinner"},
                {label: "Péage", value: "Péage"},
                {label: "Avion", value: "Avion"},
                {label: "Carburant", value: "Carburant"},
                {label: "Train", value: "Train"},
            ]
        },
    ]


    async function addExpenseAction(event, values){
        if(props.data){
            try {
                values.id=props.data.id
                values.type_depense=selectedMultiTypeDepense.value
                values.collaborateur_id=selectedMultiCollaborateur.value

                const response=await ExpenseService.UpdateExpense(values)
                if(response.status===200){
                    props.onRefresh()

                }

            }catch (e) {

            }
        }else{
            try {
                values.type_depense=selectedMultiTypeDepense.value
                values.collaborateur_id=selectedMultiCollaborateur.value
                values.status="pendding"

                const response=await ExpenseService.addExpense(values)
                if(response.status===200){
                    props.onRefresh()
                }
            }catch (e) {

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
                        addExpenseAction(e, v)
                    }}
            >
                <Row>
                <Col md="6">
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
                    <Col md="6">
                        <div className="mb-3 templating-select select2-container">
                            <label className="control-label">type de depense</label>
                            <Select
                                value={selectedMultiTypeDepense}
                                onChange={(e) => {
                                    handleSelectedMultiTypeDepense(e)
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
                                Date de demande
                            </label>
                            <div className="col-md-13">
                                <AvField
                                    className="form-control"
                                    type="date"
                                    name={"date_demande"}
                                    value={props.data?moment(props.data.date_demande).format("YYYY-MM-DD") :null}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Total TTC</Label>
                            <AvField
                                name="total_ttc"
                                placeholder="Total TTC"
                                type="text"
                                value={props.data?props.data.total_ttc:null}
                                errorMessage=" SVP Entrez le total TTC"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                            />
                        </div>
                    </Col>
                    </Row>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Client</Label>
                            <AvField
                                name="client"
                                placeholder="Client"
                                type="text"
                                value={props.data?props.data.client:null}
                                errorMessage=" SVP Entrez le client"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                            />
                        </div>
                    </Col>
                    <Row>
                 
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

export default withRouter(AddOrder)
