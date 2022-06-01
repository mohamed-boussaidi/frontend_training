import React, { useEffect } from "react"
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"

import Select from 'react-select'
import { useState } from "react";
import ProductService from "../../api/ProductService";
import Loading from "../Loading";
import {Toast} from "react-bootstrap";
import OrderService from "../../api/OrderService";
import { useAlert } from 'react-alert'

 const CardProduct = props =>{
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
     const [show, setShow] = useState([]);
     const alert = useAlert()


     async function  getProducts(){
      setLoading(true)
         var arrayshow =[]
    const response = await ProductService.Products()
      if(response.status===200){
        setProducts(response.data)
          response.data.map((item,index)=>{
              arrayshow[index]=false
          })
          setShow(arrayshow)
          setLoading(false)
      }
  }
  async function  addOrder(id){
      setLoading(true)
      const userData  = localStorage.getItem("authUser")?JSON.parse(localStorage.getItem("authUser")):null
      const products=[id]
    const response = await OrderService.addorder({collaborateur_id:userData.data.id,products:products})
      if(response.status===200){
          onRefresh()
          alert.success('Votre commnade a ete enregistré')
      }else {
          alert.error('Error , Votre commnade')
      }
  }


  function onRefresh(){
    getProducts()
  }

  useEffect( () => {
    getProducts()

  }, [])
  return (
    <>
   <Row>
    <Col xl="12"  className="container">
          <Card>
              <CardBody>
    <h1 className="text-center text-primary my-5">Les Matériels</h1>

                                {
                                    loading
                                        ?
                                        <Loading/>
                                        :
                                        <div className="container">
                                            <div className="row">
                                                {products ? products.map((item, index) =>
                                                <div className="col-md-4" key={index}>

                                                    <div className="col-md-4" key={index}>
                                                        <div className="card" style={{width: "18rem"}}>
                                                            <img className="card-img"
                                                                 src={process.env.REACT_APP_URL_IMAGES_PRODUCTS + item.image}
                                                                 alt="Card image cap"/>
                                                            <div className="card-body">
                                                                <h5 className="card-title"><b>{item.nom}</b></h5>
                                                                <div className="row">
                                                                    <div className="col-6"><h5>Type :</h5></div>
                                                                    <div className="card-title col-6 ">{item.type}</div>
                                                                    <div className="col-6"><h5>Modéle :</h5></div>
                                                                    <div
                                                                        className="card-title col-6 ">{item.modele}</div>
                                                                    <div className="col-6"><h5>Prix :</h5></div>
                                                                    <div className="card-title col-6 ">{item.prix}</div>
                                                                </div>

                                                                <>

                                                                <Col xs={6}>
                                                                    <Button onClick={() => {
                                                                        show[index] = true;
                                                                        setShow([...show])}
                                                                    }>Commander</Button>
                                                                </Col>
                                                                    <div className="float-right">

                                                                        <Toast onClose={() => {
                                                                            show[index] = false;
                                                                            setShow([...show])}
                                                                        } show={show[index]} delay={3000} autohide>
                                                                            <Toast.Header>
                                                                                <img
                                                                                    src="holder.js/20x20?text=%20"
                                                                                    className="rounded me-2"
                                                                                    alt=""
                                                                                />
                                                                                <strong className="me-auto">Confirmation</strong>
                                                                            </Toast.Header>
                                                                            <Toast.Body>voulez vous commander ce matriél<br/>
                                                                                <Button type={"button"} onClick={()=>addOrder(item.id)} >Oui</Button>
                                                                            </Toast.Body>
                                                                        </Toast>
                                                                    </div>
                                                                </>
                                                </div>
                                                    </div>
                                                </div>
                                                </div>
                                                )
                                                    :
                                                    <></>
                                                }
                                            </div>
                                        </div>

                                }
              </CardBody>

          </Card>
         </Col>
         </Row>

    </>
  );
};
export default CardProduct;