import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";

import {withRouter} from "react-router-dom";
import ProductService from "../../api/ProductService";

import moment from "moment";

const AddProduct = (props) => {
    
    const [selectedMultiTypeProduct, setselectedMultiTypeProduct] = useState({label: props.data?props.data.type:null, value: props.data?props.data.type:null})
    function handleSelectedMultiTypeProduct(type) {
        setselectedMultiTypeProduct(type)
    }
    const optionGroup1 = [
        {
            label: "Type De materiel",
            options: [
                {label: "PC", value: "PC"},
                {label: "Smartphone", value: "Smartphone"},
                {label: "Tablette", value: "Tablette"},
                {label: "Ipade", value: "Ipade"},
            ]
        },
    ]
    async function addProductAction(event, values){
        if(props.data){
            try {
                values.id=props.data.id
                values.type=selectedMultiTypeProduct.value
                const response=await ProductService.UpdateProduct(values)
                if(response.status===200){
                    props.onRefresh()

                }

            }catch (e) {

            }
        }else{
            try {
             
                values.type=selectedMultiTypeProduct.value
                const response=await ProductService.addproduct(values)
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
                        addProductAction(e, v)
                    }}
            >
                <h4 className="card-title" class="d-flex flex-column align-items-center my-2 bg-primary" >Ajouter un matériel </h4>
             
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
                            <Label htmlFor="validationCustom01">Modèle</Label>
                            <AvField
                                name="modele"
                                placeholder="Nombre du jours"
                                type="text"
                                value={props.data?props.data.modele:null}
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
                            <label className="control-label">type</label>
                            <Select
                                value={selectedMultiTypeProduct}
                                onChange={(e) => {
                                    handleSelectedMultiTypeProduct(e)
                                }}
                                options={optionGroup1}
                                classNamePrefix="select2-selection"
                                closeMenuOnSelect={false}
                            />
                        </div>
    
                    </Col>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Prix</Label>
                            <AvField
                                name="prix"
                                placeholder="Nombre du jours"
                                type="text"
                                value={props.data?props.data.prix:null}
                                errorMessage=" SVP Entrez votre Nombre du jours"
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

export default withRouter(AddProduct)
