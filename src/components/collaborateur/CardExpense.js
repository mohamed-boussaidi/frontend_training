import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import ExpenseService from "../../api/ExpenseService";
import DepenseService from "../../api/DepenseService";
import {useAlert} from 'react-alert'

const CardExpense = (props) => {
    const alert = useAlert()

    const [optionstypedepense, setOptionstypedepense] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([])
    const [selectedMultiTypeDepense, setselectedMultiTypeDepense] = useState(props.data ? {
        label: props.data.type_depense_id,
        value: props.data.type_depense_id
    } : null)

    function handleSelectedMultiTypeDepense(type_depense) {
        setselectedMultiTypeDepense(type_depense)
    }


    async function addExpenseAction(event, values) {
        if (handleValidation()) {

            try {
                const userData = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")) : null
                values.type_depense_id = selectedMultiTypeDepense.value
                values.status = "pendding"
                values.collaborateur_id = userData.data.id
                const response = await ExpenseService.addExpense(values)
                if (response.status === 200) {
                    alert.success('Demande de note de frais a ete enregistré')
                }
            } catch (e) {
                alert.error('Error , Demande note de frais ')
            }
        }
    }

    async function getTypeDepenseOptions() {
        var options = []

        const response = await DepenseService.Depenses()

        if (response.status === 200) {
            response.data.map((item, index) => {
                options.push({label: item.nom, value: item.id})
            })

        }
        setOptionstypedepense(options)


    }

    useEffect(() => {
        setLoading(true)
        getTypeDepenseOptions()
        setLoading(false)
    }, [])

    function handleValidation() {
        let errors = [];
        let formIsValid = true;

        if (!selectedMultiTypeDepense) {
            formIsValid = false;
            errors["selectedMultiTypeDepense"] = "SVP Entrez le type de Depense";
        }
        setErrors(errors);
        return formIsValid;
    }



        return (
            <>
                {
                    loading
                        ?
                        <loading></loading>
                        :
                        <div className="container pt-5 pb-5 ">
                            <Col xl="12" className="container">
                                <AvForm className="needs-validation"
                                        onValidSubmit={(e, v) => {
                                            addExpenseAction(e, v)
                                        }}
                                >
                                    <h4 className="card-title"
                                        className="d-flex flex-column align-items-center my-2 bg-primary">Passer une
                                        demande note de frais </h4>
                                    <Row>
                                        <Col md="12">
                                            <div className="mb-3 templating-select select2-container">
                                                <label className="control-label">type de depense</label>
                                                <Select
                                                    value={selectedMultiTypeDepense}
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
                                                <span
                                                    className="text-danger">{errors['selectedMultiTypeDepense']}</span>

                                            </div>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <div className="mb-3">
                                                <Label htmlFor="validationCustom01">Client</Label>
                                                <AvField
                                                    name="client"
                                                    placeholder="Client"
                                                    type="text"
                                                    errorMessage=" SVP Entrez le client"
                                                    className="form-control"
                                                    validate={{required: {value: true}}}
                                                    id="validationCustom01"
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-3">
                                                <Label htmlFor="validationCustom01">Total TTC</Label>
                                                <AvField
                                                    name="total_ttc"
                                                    placeholder="Total TTC"
                                                    type="text"
                                                    errorMessage=" SVP Entrez le total TTC"
                                                    className="form-control"
                                                    validate={{required: {value: true}}}
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

                }

            </>
        )

}

export default CardExpense;
