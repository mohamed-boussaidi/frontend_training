import React ,{useEffect} from 'react';
import {
    Col,
    Row,
    Card,
    CardBody,
} from "reactstrap";

import MetaTags from 'react-meta-tags';

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

// import apexChart
import StackedBarChart from "../AllCharts/apex/stackedbarchart";

const ChartsAppex = (props) => {
    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Charts", link: "#" },
        { title: "Apex Charts", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Apex Charts', breadcrumbItems)
    })

    return (
        <React.Fragment>

            <MetaTags>
                <title>Apex Charts | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
            </MetaTags>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <h4 className="card-title mb-4">Les Notes De Frais "Accepter"</h4>
                            <Row className="text-center mt-4">
                                <Col sm="4">
                                    <h5 className="mb-0 font-size-20">%</h5>
                                    <p className="text-muted">Accepter</p>
                                </Col>
                                <Col sm="4">
                                    <h5 className="mb-0 font-size-20">%</h5>
                                    <p className="text-muted">Refuser</p>
                                </Col>
                                <Col sm="4">
                                    <h5 className="mb-0 font-size-20">%</h5>
                                    <p className="text-muted">Encours...</p>
                                </Col>
                            </Row>

                            <div dir="ltr">
                                <StackedBarChart />
                            </div>

                        </CardBody>
                    </Card>
                </Col>

            </Row>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(ChartsAppex);