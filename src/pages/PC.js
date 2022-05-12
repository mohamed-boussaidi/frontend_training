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

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import {MDBDataTable} from "mdbreact";

const Hall = (props) => {
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "PC", link: "#" }
  ]

  const data = {
    columns: [
      {
        label: "N°Série",
        field: "name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Marque",
        field: "position",
        sort: "asc",
        width: 100,
      },
      {
        label: "Modèle",
        field: "office",
        sort: "asc",
        width: 100,
      },
      {
        label: "Matricule",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "utilisateur",
        field: "date",
        sort: "asc",
        width: 100,
      },
      {
        label: "statut",
        field: "salary",
        sort: "asc",
        width: 100,

      },
      {
        label: "Email",
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
    props.setBreadcrumbItems('Gestion les salles', breadcrumbItems)
  })
  return (
    <React.Fragment>

      <MetaTags>
        <title>Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags>

      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>

              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Hall);
