import React, { useEffect } from "react"
import { Button, Card, CardBody, Col, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"

import Select from 'react-select'
import { useState } from "react";
import ProductService from "../../api/ProductService";

 const CardProduct = props =>{
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMulti3, setselectedMulti3] = useState(null)
  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3)
  }
  const optionGroup2 = [
    {
      label: "Materiel informatique",
      options: [
        { label: "Portable", value: "Portable" },
        { label: "Pc", value: "PC" },
      ]
    },
  ]
  async function  getProducts(){
    setLoading(true)
    const response = await ProductService.Products()
      if(response.status===200){
        setProducts(response.data)
        setLoading(false)
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
            <div className="text-end float-end pt-3 p-4 "></div>
    <h1 className="text-center text-primary my-5">Les Matériels</h1>

    <div className="container">
      <div className="row">
      {products ? products.map((item,index)=>
        <div className="col-md-4" key={index}>

        <div className="col-md-4" key={index}>
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img"  src={process.env.REACT_APP_URL_IMAGES_PRODUCTS+item.image} alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">{item.nom}</h5>
            <div className="row">
<div className="col-10"><h5>Type</h5></div><div className="card-title col-2 ">{item.type}</div>
<div className="col-10"><h5>Modéle</h5></div><div className="card-title col-2 ">{item.modele}</div>
<div className="col-10"><h5>Prix</h5></div><div className="card-title col-2 ">{item.prix}</div>
</div>
           
            <a  className="btn btn-primary" >Commander</a>
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
            </CardBody>
          </Card>
         </Col>
         </Row>

    </>
  );
};
export default CardProduct;