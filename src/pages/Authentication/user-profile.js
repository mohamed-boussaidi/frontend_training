import React, { useEffect ,useState } from 'react';
import { Row ,Col} from "reactstrap";

import MetaTags from 'react-meta-tags';

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

//Import Components
import CardUser from "./card-user";

import { useLocation } from 'react-router-dom'


const PagesDirectory = (props) => {
    const location = useLocation()
  const { selecedTab } = location.state?location.state:"1"

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Pages", link: "#" },
        { title: "Directory", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems()
    },[])

    return (
        <React.Fragment>
            <Col lg={12} className={"p-0"}>
            <CardUser selecedTab={selecedTab}/>           
            </Col>
            <MetaTags>
                <title>Directory | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
            </MetaTags>
            <Row>
        <Col lg={12}>
        </Col>



      </Row>
           
        </React.Fragment>
    );
}

export default connect(null, { setBreadcrumbItems })(PagesDirectory);