import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";

import {withRouter} from "react-router-dom";
import ExpenseService from "../../api/ExpenseService";
import CollaborateurService from "../../api/CollaborateurService";
import DepenseService from "../../api/DepenseService";

import { useAlert } from 'react-alert'

import moment from "moment";

const AddExpense = (props) => {
    const alert = useAlert() 
    const [users, setUsers] = useState([]);
    const [optionscollaborateur, setOptionsCollaborateur] = useState([]);
    const [optionstypedepense, setOptionstypedepense] = useState([]);
    const [loading, setLoading] = useState(true);


    const [selectedMultiTypeDepense, setselectedMultiTypeDepense] = useState(props.data?props.data.type_depense_id:null)

    function handleSelectedMultiTypeDepense(type_depense) {
        setselectedMultiTypeDepense(type_depense.value)
    }
    const [selectedMultiCollaborateur, setselectedMultiCollaborateur] = useState( props.data?props.data.collaborateur_id:null)

    function handleSelectedCollaborateurMulti(collaborateur) {
        setselectedMultiCollaborateur(collaborateur.value)
    }


  


    async function addExpenseAction(event, values){
        if(props.data){
            try {
                values.id=props.data.id
                values.type_depense_id=selectedMultiTypeDepense
                values.collaborateur_id=selectedMultiCollaborateur

                const response=await ExpenseService.UpdateExpense(values)
                if(response.status===200){
                    props.onRefresh()
                 alert.success('Note de frais a ete modifier')
    
                }

            }catch (e) {
                alert.error('Erreur note de frais')

            }
        }else{
            try {
                values.type_depense_id=selectedMultiTypeDepense
                values.collaborateur_id=selectedMultiCollaborateur
                values.status="pendding"

                const response=await ExpenseService.addExpense(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success('Demande note de frais a été enregistré')
                }
            }catch (e) {
                alert.error('Erreur note de frais')
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

      async function  getTypeDepenseOptions(){
        var options=[]

        const response = await DepenseService.Depenses()

          if(response.status===200){
            response.data.map((item,index)=>{
                options.push({label: item.nom, value: item.id})
            })

          }
          setOptionstypedepense(options)


      }


      useEffect( () => {
        setLoading(true)
        getUsersOptions()
        getTypeDepenseOptions()
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
                                value={optionscollaborateur.filter(obj => obj.value === selectedMultiCollaborateur)}
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
                                value={optionstypedepense.filter(obj => obj.value === selectedMultiTypeDepense)}
                                onChange={(e) => {
                                    handleSelectedMultiTypeDepense(e)
                                }}
                                options={[
                                    {
                                        label: "TypeDepense",
                                        options: optionstypedepense
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

export default withRouter(AddExpense)
