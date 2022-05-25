import React, { useState } from 'react'
import {
    Col,
    Card,
    UncontrolledTooltip,
    TabContent,
     TabPane,
      Nav,
    NavItem, NavLink, Row
} from "reactstrap";
import { Link } from "react-router-dom";
import Cards from 'components/Cards';
import CardProduit from 'components/CardProduit';
import CongeUser from 'components/CongeUser';
import ExportUser from 'components/form/ExportUser';


function CardUser(props){
    const [currentActiveTab, setCurrentActiveTab] = useState('1');
  
    // Toggle active state for Tab
    const toggle = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }
        return (
            <React.Fragment>
            {
                    props.users.map((user, key) =>
                        <Col xl="12" md="12" key={key}>
                            <Card className="directory-card">
                                <div>
                                    <div className="directory-bg text-center">
                                        <div className="directory-overlay">
                                            <img className="rounded-circle avatar-lg img-thumbnail" src={user.imgUrl} alt="Generic placeholder" />
                                        </div>
                                    </div>

                                    <div className="directory-content text-center p-4">
                                        <p className=" mt-4">{user.designation}</p>
                                        <h5 className="font-size-16">{user.name}</h5>

                                        <p className="text-muted">{user.desc}</p>

                                        <ul className="social-links list-inline mb-0 mt-4">
                                            {
                                                user.socials.map((social, key) =>
                                                    <React.Fragment key={key}>
                                                        <li className="list-inline-item">
                                                            <Link title="" className={"tooltips btn-" + social.colorclass} id={social.title + user.id} to={social.link}><i className={social.icon}></i></Link>
                                                            <UncontrolledTooltip placement="top" target={social.title + user.id}>
                                                                {social.title}
                                                            </UncontrolledTooltip>
                                                        </li>{" "}
                                                    </React.Fragment>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <Nav tabs>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('1'); }}
                    >
                        Tab1
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('2'); }}
                    >
                        Tab2
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('3'); }}
                    >
                        Tab3
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('4'); }}
                    >
                        Tab4
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('5'); }}
                    >
                        Tab5
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                      <h1>islem</h1>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                        <Cards />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <CardProduit />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row>
                        <Col sm="12">
                            <CongeUser />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="5">
                    <Row>
                        <Col sm="12">
                            <ExportUser />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
                            </Card>
                        </Col>
                    )
                }
            </React.Fragment>
        );
}

export default CardUser;