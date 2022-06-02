import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";
import ExpenseService from "../../api/ExpenseService";
import moment from "moment";
import { useAlert } from 'react-alert'

const CardExpense = (props) => {
    const [loading, setLoading] = useState(true);
    const alert = useAlert()
    const [selectedMultiTypeDepense, setselectedMultiTypeDepense] = useState({label: props.data?props.data.type_depense:null, value: props.data?props.data.type_depense:null})

    function handleSelectedMultiTypeDepense(type_depense) {
        setselectedMultiTypeDepense(type_depense)
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
     
            try {
                const userData  = localStorage.getItem("authUser")?JSON.parse(localStorage.getItem("authUser")):null
                values.type_depense=selectedMultiTypeDepense.value
                values.status="pendding"
                values.collaborateur_id=userData.data.id
                const response=await ExpenseService.addExpense(values)
                if(response.status===200){
                    alert.success('Demande de note de frais a ete enregistré')
                }
            }catch (e) {
                alert.error('Error , Demande de conge')
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
                        addExpenseAction(e, v)
                    }}
            >
                <h4 className="card-title" class="d-flex flex-column align-items-center my-2 bg-primary" >Passer une demande note de frais </h4>
                <Row>
                    <Col md="6">
                        <div className="mb-3 templating-select select2-container">
                            <label className="control-label">type de depense</label>
                            <Select
                                value={selectedMultiTypeDepense}
                                onChange={(e) => {
                                    handleSelectedMultiTypeDepense(e)
                                }}
                                options={optionGroup1}n
                                classNamePrefix="select2-selection"
                                closeMenuOnSelect={false}
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

export default CardExpense;
