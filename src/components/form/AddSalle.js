import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";

import {withRouter} from "react-router-dom";
import SalleService from "../../api/SalleService";
import ImageCropper from "../ImageCropper";
import {dataURLtoFile, join_String_save,array_to_select_options_list} from "../../utlis/functions";
import { useAlert } from 'react-alert'
import moment from "moment";

const AddSalle = (props) => {
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
    
    const [selectedMultiEquipements, setselectedMultiEquipements] = useState(props.data?array_to_select_options_list(props.data.equipements.split(",")):null)
    function handleSelectedMultiEquipements(equipements) {
        setselectedMultiEquipements(equipements)
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
                values.equipements=join_String_save(selectedMultiEquipements)

                const response=await SalleService.UpdateSalle(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success('Salle a été modifier avec succés')
                 

                }

            }catch (e) {
                alert.error('Erreur modification')

            }
        }else{
            try {
            
                values.image=image?image:null
                values.equipements=join_String_save(selectedMultiEquipements)

                const response=await SalleService.addSalle(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success('Salle a été ajouter avec succés')
                 

                }

            }catch (e) {
                alert.error('Erreur Salle')

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
                                <Row>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Nom</Label>
                            <AvField
                                name="nom_du_salle"
                                placeholder="nom du salle"
                                type="text"
                                value={props.data?props.data.nom_du_salle:null}
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
                            <label className="control-label">Equipements</label>
                            <Select
                                value={selectedMultiEquipements}
                                onChange={(e) => {
                                    handleSelectedMultiEquipements(e)
                                }}
                                isMulti
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
