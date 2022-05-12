import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState} from "react";
import {withRouter} from "react-router-dom";

const AddCollaborateur = (props) => {


    const [selectedMultiCivilite, setSelectedMultiCivilite] = useState(props.civilite)

    function handleSelectedMultiCivilite(civilite) {
        setSelectedMultiCivilite(civilite)
    }

    const [selectedMultiContatType, setselectedMultiContatType] = useState(props.type_contrat)

    function handleSelectedMultiContatType(type_contrat) {
        setselectedMultiContatType(type_contrat)
    }

    const [selectedMultifonction, setselectedMultifonction] = useState(props.fonction)

    function handleMultiSelectedMultifonction(selectedMulti1) {
        setselectedMultifonction(selectedMulti1)
    }

    const [selectedMultiPole, setselectedMultiPole] = useState(props.pole)

    function handleSelectedMultiPole(selectedMulti4) {
        setselectedMultiPole(selectedMulti4)
    }

    const [selectedMultiImmeuble, setselectedMultiImmeuble] = useState(props.immeuble)

    function handleMultiImmeuble(immeuble) {
        setselectedMultiImmeuble(immeuble)
    }

    const optionGroup1 = [
        {
            label: "Type De Contrat",
            options: [
                {label: "CDI", value: "CDI"},
                {label: "CDD", value: "CDD"},
                {label: "Alternance", value: "Alternance"},

            ]
        },
    ]
    const optionGroup2 = [
        {
            label: "Civilité",
            options: [
                {label: "M.", value: "M"},
                {label: "Mlle", value: "Mlle"},
                {label: "Mme", value: "Mme"},

            ]
        },
    ]
    const optionGroup3 = [
        {
            label: "Fonction",
            options: [
                {label: "Développeur", value: "Développeur"},
                {label: "Data Analyste", value: "Data Analyste"},
                {label: "Commercial", value: "Commercial"},

            ]
        },
    ]
    const optionGroup4 = [
        {
            label: "Pole",
            options: [
                {label: "Développeur", value: "Développeur"},
                {label: "Support technique", value: "Support technique"},
                {label: "Equipe RH", value: "Equipe RH"},

            ]
        },
    ]
    const optionGroup5 = [
        {
            label: "Immeuble",
            options: [
                {label: "France", value: "France"},
                {label: "Hi tech Center", value: "Hi tech Center"},
                {label: "Tunis", value: "Tunis"},

            ]
        },
    ]

    return (
        <AvForm className="needs-validation">
            <h4 className="card-title" class="d-flex flex-column align-items-center my-2 bg-primary" >COORDONNEES </h4>
            <Row>
                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom01">Matricule</Label>
                        <AvField
                            name="matricule"
                            placeholder="Matricule"
                            type="text"
                            value={props.data?props.data.matricule:null}
                            errorMessage=" SVP Entrez votre matricule"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                        />
                    </div>
                </Col>
                <Col md="6">
                    <div className="mb-3 templating-select select2-container">
                        <label className="control-label">Sexe</label>
                        <Select
                            value={selectedMultiCivilite}
                            onChange={() => {
                                handleSelectedMultiCivilite()
                            }}
                            options={optionGroup2}
                            classNamePrefix="select2-selection"
                            closeMenuOnSelect={false}
                        />
                    </div>

                </Col>
            </Row>
            <Row>
                <Row>
                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom03">Nom</Label>
                        <AvField
                            name="nom"
                            placeholder="Nom"
                            type="text"
                            value={props.data?props.data.nom:null}
                            errorMessage=" SVP Entrez votre Pays."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                        />
                    </div>
                </Col>
                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom04">Prénom</Label>
                        <AvField
                            name="prenom"
                            placeholder="Télephone"
                            type="text"
                            value={props.data?props.data.prenom:null}
                            errorMessage="SVP Entrez votre Prenom."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                        />
                    </div>
                </Col>
                </Row>
                <Row>
                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom05">Télephone</Label>
                        <AvField
                            name="telephone"
                            placeholder="Tél"
                            type="text"
                            value={props.data?props.data.telephone:null}
                            errorMessage=" SVP Entrez votre Tél."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                        />
                    </div>
                </Col>
            
                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom02">E-Mail</Label>
                        <AvField
                            name="e_mail"
                            placeholder="Email"
                            type="text"
                            value={props.data?props.data.e_mail:null}
                            errorMessage="SVP Entrez votre Email"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                        />
                    </div>
                </Col>
</Row>
            </Row>
            <Row>
                <Col md="6">
                    <div className="mb-3">
                        <label className="form-lable">Carte d'identité</label>
                        <input type="number" className="form-control form-control-file" data-buttonname="btn-secondary" />
                    </div>
                </Col>

                <Col md="6">
                    <div className="mb-3">
                        <label
                            htmlFor="example-date-input"
                        >
                            Date de  Naissance
                        </label>
                        <div className="col-md-13">
                            <input
                                name={'date_naissance'}
                                className="form-control"
                                type="date"
                                value={props.data?props.data.date_naissance:null}
                                id="example-date-input"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom03">Adresse</Label>
                        <AvField
                            name="adresse"
                            placeholder="Adresse"
                            type="text"
                            value={props.data?props.data.adresse:null}
                            errorMessage=" SVP Entrez votre Adresse."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                        />
                    </div>
                </Col>

                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom04">Code Postal</Label>
                        <AvField
                            name="code_postale"
                            placeholder="Code Postal"
                            type="text"
                            value={props.data?props.data.code_postale:null}
                            errorMessage="SVP Entrez votre Code Postal."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                        />
                    </div>
                </Col>
                <Row>
                <Col md="12">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom04">Password</Label>
                        <AvField
                            name="password"
                            placeholder="password"
                            type="text"
                            value={props.data?props.data.code_postale:null}
                            errorMessage="SVP Entrez votre Code Postal."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                        />
                    </div>
                </Col>
                </Row>
            </Row>
            <h4 className="card-title" class="d-flex flex-column align-items-center my-2 bg-primary" >CONTRAT</h4>
            <Row>
                <Col md="6">
                    <div className="mb-3 templating-select select2-container">
                        <label className="control-label">Type de Contrat</label>
                        <Select
                            value={selectedMultiContatType}
                            onChange={() => {
                                handleSelectedMultiContatType()
                            }}
                            options={optionGroup1}
                            classNamePrefix="select2-selection"
                            closeMenuOnSelect={false}
                        />
                    </div>

                </Col>
                <Col md="6">
                    <div className="mb-3 templating-select select2-container">
                        <label className="control-label">Fonction</label>
                        <Select
                            value={selectedMultifonction}
                            onChange={() => {
                                handleMultiSelectedMultifonction()
                            }}
                            options={optionGroup3}
                            classNamePrefix="select2-selection"
                            closeMenuOnSelect={false}
                        />
                    </div>

                </Col>
                <Col md="6">
                    <div className="mb-3">
                        <label
                            htmlFor="example-date-input"


                        >
                            Date d'entree
                        </label>
                        <div className="col-md-13">
                            <input
                                className="form-control"
                                type="date"
                                defaultValue="2019-08-19"
                                id="example-date-input"
                            />
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="mb-3">
                        <label
                            htmlFor="example-date-input"
                        >
                            Date de Sortie
                        </label>
                        <div className="col-md-13">
                            <input
                                className="form-control"
                                type="date"
                                defaultValue="2019-08-19"
                                id="example-date-input"
                            />
                        </div>
                    </div>
                </Col>
            </Row>  
            <Col md="12">
                <div className="mb-3">
                    <Label htmlFor="validationCustom03">Departement</Label>
                    <AvField
                        name="city"
                        placeholder="Email "
                        type="text"
                        errorMessage="  SVP Entrez votre Email."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                    />
                </div>
            </Col>
            <Col md="50">

                <FormGroup className="mb-0">
                    <div>
                        <Button type="submit" color="primary" className="ms-1">
                            Enregistrer
                        </Button>{" "}
                        <Button type="reset" color="secondary" href="/user">
                            Annuler
                        </Button>
                    </div>
                </FormGroup>
            </Col>

        </AvForm>
    )
}

export default withRouter(AddCollaborateur)
