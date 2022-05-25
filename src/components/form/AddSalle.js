import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";

import {withRouter} from "react-router-dom";
import SalleService from "../../api/SalleService";
import ImageCropper from "../ImageCropper";
import {dataURLtoFile} from "../../utlis/functions";

import moment from "moment";

const AddSalle = (props) => {
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
    
    const [selectedMultiEquipements, setselectedMultiEquipements] = useState({label: props.data?props.data.equipements:null, value: props.data?props.data.equipements:null})
    function handleSelectedMultiEquipements(equipements) {
        setselectedMultiEquipements(equipements)
    }
    const [selectedMultiVille, setselectedMultiVille] = useState({label: props.data?props.data.ville:null, value: props.data?props.data.ville:null})
    function handleSelectedMultiVille(ville) {
        setselectedMultiVille(ville)
    }
    const optionGroup1 = [
        {
            label: "Les equipements",
            options: [
                {label: "PC", value: "PC"},
                {label: "Tv", value: "Tv"},
                {label: "Projecteur", value: "Projecteur"},
                {label: "Tableau", value: "Tableau"},
            ]
        },
    ]
    const optionGroup2 = [
        {
            label: "Ville",
            options: [
                {label: "Tunis", value: "Tunis"},
                {label: "Paris", value: "Paris"},
                {label: "Mauris", value: "Mauris"},
               
            ]
        },
    ]
    async function addSalleAction(event, values){
        var image=null
        if (blob) {
            let data = new FormData();
            var file = dataURLtoFile(blob,'image.jpeg');
            data.append('image', file);
            const response = await SalleService.uploadImage(data)
            if (response.status === 200) {
                image = response.data.image
            }
        }

        if(props.data){
            try {
                values.id=props.data.id
                values.image=image?image:props.data.image
                const response=await SalleService.UpdateSalle(values)
                if(response.status===200){
                    props.onRefresh()

                }

            }catch (e) {

            }
        }else{
            try {
            
                values.image=image?image:null
                const response=await SalleService.addSalle(values)
                if(response.status===200){
                    props.onRefresh()
                }
            }catch (e) {

            }
        }
    }

     
        return (
            <AvForm className="needs-validation"
                    onValidSubmit={(e, v) => {
                        addSalleAction(e, v)
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
                
                <h4 className="card-title" class="d-flex flex-column align-items-center my-2 bg-primary center"  >Ajouter Salle</h4>
                <Row>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Nom</Label>
                            <AvField
                                name="nom"
                                placeholder="Nombre du jours"
                                type="text"
                                value={props.data?props.data.nom:null}
                                errorMessage=" SVP Entrez votre Nombre du jours"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                            />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Adresse</Label>
                            <AvField
                                name="adresse"
                                placeholder="Adresse"
                                type="text"
                                value={props.data?props.data.adresse:null}
                                errorMessage=" SVP Entrez l'adresse du salle"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                            />
                        </div>
                    </Col>
                   
                </Row>
                
                <Row>
                <Col md="6">
                        <div className="mb-3 templating-select select2-container">
                            <label className="control-label">Equipements</label>
                            <Select
                                value={selectedMultiEquipements}
                                onChange={(e) => {
                                    handleSelectedMultiEquipements(e)
                                }}
                                options={optionGroup1}
                                classNamePrefix="select2-selection"
                                closeMenuOnSelect={false}
                            />
                        </div>
    
                    </Col>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Nombre du place</Label>
                            <AvField
                                name="nbr_place"
                                placeholder="Nombre du place"
                                type="text"
                                value={props.data?props.data.nbr_place:null}
                                errorMessage=" SVP Entrez votre Nombre du jours"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                            />
                        </div>
                    </Col>
                   
                </Row>
                <Row>
                <Col md="6">
                       <div className="mb-3 templating-select select2-container">
                            <label className="control-label">Ville</label>
                            <Select
                                value={selectedMultiVille}
                                onChange={(e) => {
                                    handleSelectedMultiVille(e)
                                }}
                                options={optionGroup2}
                                classNamePrefix="select2-selection"
                                closeMenuOnSelect={false}
                            />
                        </div>
    
                    </Col>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Etage</Label>
                            <AvField
                                name="etage"
                                placeholder="Etage"
                                type="text"
                                value={props.data?props.data.nbr_place:null}
                                errorMessage=" SVP Entrez l'etage"
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

export default withRouter(AddSalle)
