import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import CollaborateurService from "../../api/CollaborateurService";
import moment from "moment";
import ImageCropper from "../ImageCropper";
import {dataURLtoFile} from "../../utlis/functions";
import { useAlert } from 'react-alert'

const AddCollaborateur = (props) => {
    const alert = useAlert()

    const [blob, setBlob] = useState(null)
    const [inputImg, setInputImg] = useState('')
    const [cropend, setCropend] = useState(true)
    const getBlob = (blob) => {
        setBlob(blob)
    }



    const onInputChange = (e) => {
        // convert image file to base64 string
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            setInputImg(reader.result)
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
        setCropend(false)
    }

    const handleSubmitImage = (e) => {
        setCropend(true)

    }
    const RemoveImage = (e) => {
        setCropend(true)
        setBlob(null)
        setInputImg('')

    }

    const [selectedMultiCivilite, setSelectedMultiCivilite] = useState({label: props.data?props.data.sexe:null, value: props.data?props.data.sexe:null})

    function handleSelectedMultiCivilite(civilite) {
        setSelectedMultiCivilite(civilite)
    }

    const [selectedMultiContatType, setselectedMultiContatType] = useState({label: props.data?props.data.type_contrat:null, value: props.data?props.data.type_contrat:null})

    function handleSelectedMultiContatType(type_contrat) {
        setselectedMultiContatType(type_contrat)
    }

    const [selectedMultifonction, setselectedMultifonction] = useState({label: props.data?props.data.fonction:null, value: props.data?props.data.fonction:null})

    function handleMultiSelectedMultifonction(selectedMulti1) {
        setselectedMultifonction(selectedMulti1)
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

    async function addCollaborateurAction(event, values){
        var image=null
        if (blob) {
            let data = new FormData();
            var file = dataURLtoFile(blob,'image.jpeg');
            data.append('image', file);
            const response = await CollaborateurService.uploadImage(data)
            if (response.status === 200) {
                image = response.data.image
            }
        }
        if(props.data){
            try {
                values.id=props.data.id
                values.fonction=selectedMultifonction.value
                values.sexe=selectedMultiCivilite.value
                values.type_contrat=selectedMultiContatType.value
                values.image=image?image:props.data.image
                const response=await CollaborateurService.UpdateCollaborateurs(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success('Collaborateur a ete enregistré')

                }

            }catch (e) {
                alert.error('Erreur Collaborateur')

            }
        }else{
            try {
                values.fonction=selectedMultifonction.value
                values.sexe=selectedMultiCivilite.value
                values.type_contrat=selectedMultiContatType.value
                values.image=image?image:null
                const response=await CollaborateurService.addCollaborateurs(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success('Collaborateur a ete enregistré')

                }
            }catch (e) {
                alert.error('Erreur Collaborateur')

            }
        }
    }
    return (
        <AvForm className="needs-validation"
                onValidSubmit={(e, v) => {
                    addCollaborateurAction(e, v)
                }}
        >
            <div className="container" >


                {
                    !cropend && inputImg && (
                        <ImageCropper
                            getBlob={getBlob}
                            inputImg={inputImg}
                        />
                    )
                }
                <center>
                {blob && cropend && (
                    <div>
                        <img className="file-upload-image" src={blob} alt="your image"/>
                            <div class="image-title-wrap">
                                <button type="button" onClick={()=>RemoveImage()} className="btn btn-danger">Remove <i className="mdi mdi-cancel" /></button>
                            </div>
                    </div>
                    )}
                </center>
                <center>
                    {cropend && !inputImg && (
                        <div class="file-upload">
                            <div>
                                <div className="image-upload-wrap">
                                    <input className="file-upload-input" type="file" accept="image/*" onChange={onInputChange}/>
                                    <div className="drag-text">
                                        <h3>Faites glisser et déposez un fichier ou sélectionnez ajouter une image</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </center>
                {!cropend &&(
                    <div className={"row pt-3"}>
                        <div className={"col-8"}>

                        </div>
                        <div className="col-2">
                            <button className="btn btn-danger w-md waves-effect waves-light"
                                    type="submit"
                                    onClick={RemoveImage}>
                                Cancel <i className="mdi mdi-cancel" />
                            </button>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary w-md waves-effect waves-light"
                                    type="submit"
                                    onClick={handleSubmitImage}>
                                Crop <i className="mdi mdi-crop" />
                            </button>
                        </div>
                    </div>
                )
                }


            </div>
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
                            onChange={(e) => {
                                handleSelectedMultiCivilite(e)
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
                            name="email"
                            placeholder="Email"
                            type="text"
                            value={props.data?props.data.email:null}
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
                        <AvField
                            name={"cin"}
                            value={props.data?props.data.cin:null}
                            type="text"
                            className="form-control form-control-file"
                            data-buttonname="btn-secondary"
                        />
                    </div>
                </Col>

                <Col md="6">
                    <div className="mb-3">
                        <label
                            htmlFor="example-date-input"
                        >
                            Date de Naissance
                        </label>
                        <div className="col-md-13">
                            <AvField
                                name={'date_naissance'}
                                className="form-control"
                                type="date"
                                value={props.data?moment(props.data.date_naissance).format("YYYY-MM-DD") :null}
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
                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom04">Ville</Label>
                        <AvField
                            name="ville"
                            placeholder="Ville"
                            type="text"
                            value={props.data?props.data.ville:null}
                            errorMessage="SVP Entrez votre ville."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                        />
                    </div>
                </Col>
           
                    
                        <Col md="6">
                            <div className="mb-3">
                                <Label htmlFor="validationCustom04">Password</Label>
                                <AvField
                                    name="password"
                                    placeholder="password"
                                    type="text"
                                    errorMessage="SVP Entrez votre Password."
                                    className="form-control"
                                    validate={{ required: { value: true } }}
                                    id="validationCustom04"
                                />
                            </div>
                        </Col>
                    
               
            </Row>
            <h4 className="card-title" class="d-flex flex-column align-items-center my-2 bg-primary" >CONTRAT</h4>
            <Row>
                <Col md="6">
                    <div className="mb-3 templating-select select2-container">
                        <label className="control-label">Type de Contrat</label>
                        <Select
                            value={selectedMultiContatType}
                            onChange={(e) => {
                                handleSelectedMultiContatType(e)
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
                            onChange={(e) => {
                                handleMultiSelectedMultifonction(e)
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
                            <AvField
                                className="form-control"
                                type="date"
                                name={"date_entree"}
                                value={props.data?moment(props.data.date_entree).format("YYYY-MM-DD") :null}
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
                            <AvField
                                name={"date_sortie"}
                                className="form-control"
                                type="date"
                                value={props.data?moment(props.data.date_sortie).format("YYYY-MM-DD") :null}
                            />
                        </div>
                    </div>
                </Col>
            </Row>  
            <Col md="12">
                <div className="mb-3">
                    <Label htmlFor="validationCustom03">Departement</Label>
                    <AvField
                        name="departement"
                        placeholder="Departement"
                        type="text"
                        value={props.data?props.data.departement:null}
                        errorMessage="  SVP Entrez votre Departement."
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

export default withRouter(AddCollaborateur)
