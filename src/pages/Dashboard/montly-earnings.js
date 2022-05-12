import PieChart from "pages/AllCharts/C3charts/piechart";
import React from "react"
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap"
import DonutChart from '../AllCharts/DonutChart';

const MonthlyEarnings = props => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Les Salles De Reunion</CardTitle>

                    <Row className="text-center mt-4">
                        <div className="col-6">
                            <h5 className="font-size-20">%56</h5>
                            <p className="text-muted">Salle Réserve</p>
                        </div>
                        <div className="col-6">
                            <h5 className="font-size-20">%23</h5>
                            <p className="text-muted">Salle Disponible</p>
                        </div>
                    </Row>
                    <div dir="ltr">
                        <PieChart />
                    </div>

                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default MonthlyEarnings
