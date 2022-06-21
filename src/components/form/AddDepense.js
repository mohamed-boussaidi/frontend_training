import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import React, {useState,useEffect} from "react";

import {withRouter} from "react-router-dom";
import DepenseService from "../../api/DepenseService";
import { useAlert } from 'react-alert'

const AddDepense = (props) => {
    const alert = useAlert()
    const [loading, setLoading] = useState(true);


    async function addDepenseAction(event, values){

            if(props.data){
            try {
                values.id=props.data.id
                const response=await DepenseService.UpdateDepense(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success(' Conge a été modifier avec succés')

                }

            }catch (e) {
                alert.error('Erreur modification')

            }
        }else{
            try {
               
                values.status="pendding"
                const response=await DepenseService.adddepense(values)
                if(response.status===200){
                    props.onRefresh()
                    alert.success(' Conge a été ajouter avec succés')

                }

            }catch (e) {
                alert.error('Erreur enregistrement')

            }
        }
    }


    async function  getDepenseOptions(){
        var options=[]

        const response = await DepenseService.Depenses()

          if(response.status===200){
            response.data.map((item,index)=>{
                options.push({label: item.nom+""+item.prenom, value: item.id})
            })

          }
          getDepenseOptions(options)


      }


      useEffect( () => {
        setLoading(true)
        getDepenseOptions()
        setLoading(false)
      }, [])



      if(loading){
        return <loading></loading>
      }else{

        return (
            <AvForm className="needs-validation"
                    onValidSubmit={(e, v) => {
                        addDepenseAction(e, v)
                    }}
            >
                <Row>
                <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom03">Nom</Label>
                        <AvField
                            name="nom"
                            placeholder="Nom"
                            type="text"
                            value={props.data?props.data.nom:null}
                            errorMessage=" SVP Entrez le nom du type de deponse ."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
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

export default withRouter(AddDepense)
