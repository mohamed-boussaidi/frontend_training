import React, { useEffect } from "react"
import MetaTags from 'react-meta-tags';

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"
import { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation"
import { connect } from "react-redux";
import Popup from "components/Popup";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import {MDBDataTable} from "mdbreact";

const Expensereport = (props) => {
    const breadcrumbItems = [
      { title: "SPOC", link: "#" },
      { title: "Notes de frais", link: "#" }
    ]
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);
    const handleShow = () => setOpenModal(true);
    
  const data = {
    columns: [
      {
        label: "Demandateur",
        field: "position",
        sort: "asc",
        width: 270,
      },
      {
        label: "Date demande",
        field: "Date demande",
        sort: "asc",
        width: 200,
      },
      {
        label: "Type de dépense",
        field: "type_de_depense",
        sort: "asc",
        width: 100,
      },
      {
        label: "Total TTC",
        field: "salary",
        sort: "asc",
        width: 100,
      },
 
      {
        label: "Client",
        field: "salary",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "salary",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "salary",
        sort: "asc",
        width: 100,
      },
    ],
  }

  useEffect(() => {
    props.setBreadcrumbItems('Gestion les notes de frais', breadcrumbItems)
  })
  return (
    <React.Fragment>

      <MetaTags>
        <title>Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags>

      <Row>
        <Col className="col-12">
          <Card>
          <div className="text-end float-end pt-3 p-3 ">
              <button  className="btn btn-primary  w-md waves-effect waves-light" onClick={handleShow} type="submit">+</button>
            </div>
            <CardBody>

              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Expensereport);
