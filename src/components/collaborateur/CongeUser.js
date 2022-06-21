import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState} from "react";
import {useAlert} from 'react-alert'
import CongeService from "../../api/CongeService";


const CongeUser = (props) => {
    const alert = useAlert()

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([])


    const [selectedMultiCongeType, setselectedMultiCongeType] = useState(props.data ? {
        label: props.data.type_conge,
        value: props.data.type_conge
    } : null)

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


    async function addCongeAction(event, values) {
        if (handleValidation()) {
            try {
                const userData = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")) : null
                values.type_conge = selectedMultiCongeType.value
                values.status = "pendding"
                values.collaborateur_id = userData.data.id
                const response = await CongeService.addConges(values)
                if (response.status === 200) {
                    alert.success('Demande de conge a ete enregistré')
                }
            } catch (e) {
                alert.error('Error , Demande de conge')
            }
        }
    }


    function handleValidation() {
        let errors = [];
        let formIsValid = true;

        if (!selectedMultiCongeType) {
            formIsValid = false;
            errors["selectedMultiCongeType"] = "SVP Entrez le type de Congé";
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
                                            addCongeAction(e, v)
                                        }}
                                >
                                    <h4 className="card-title"
                                        className="d-flex flex-column align-items-center my-2 bg-primary">Passer
                                        une demande de congé </h4>

                                    <Row>
                                        <Col md="6">
                                            <div className="mb-3">
                                                <Label htmlFor="validationCustom01">Nombre du jours</Label>
                                                <AvField
                                                    name="nbr_jrs"
                                                    placeholder="Nombre du jours"
                                                    type="number"
                                                    value={props.data ? props.data.nbr_jrs : null}
                                                    errorMessage=" SVP Entrez votre Nombre du jours"
                                                    className="form-control"
                                                    validate={{required: {value: true}}}
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
                                                <span className="text-danger">{errors['selectedMultiCongeType']}</span>

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
                                                        errorMessage=" SVP Entrez le Date du début"
                                                        validate={{required: {value: true}}}
                                                        id="validationCustom01"
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
                                                        errorMessage=" SVP Entrez le Date de fin"
                                                        validate={{required: {value: true}}}
                                                        id="validationCustom01"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Col md="50">

                                        <FormGroup className="mb-5 ">
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

export default CongeUser;
