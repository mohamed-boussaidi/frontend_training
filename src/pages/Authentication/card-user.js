import React, { useState } from 'react'
import {
    Col,
    Card,
    UncontrolledTooltip,
    TabContent,
     TabPane,
      Nav,
    NavItem, NavLink, Row, Container
} from "reactstrap";
import CardSalle from 'components/collaborateur/CardSalle';
import CardProduct from 'components/collaborateur/CardProduct';
import CongeUser from 'components/collaborateur/CongeUser';
import TemplateUser from 'components/TemplateUser';
import CardExpense from 'components/collaborateur/CardExpense';



function CardUser(props){
    const [currentActiveTab, setCurrentActiveTab] = useState('1');


  
    // Toggle active state for Tab
    const toggle = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }
        return (
            <Container>
            <React.Fragment>
                <TemplateUser>
 
            <Nav tabs>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('1'); }}
                    >
                        Dashboard
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('2'); }}
                    >
                        Réservation
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('3'); }}
                    >
                        Matériels
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('4'); }}
                    >
                        Congé
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={() => { toggle('5'); }}
                    >
                        Note de frais
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
                        {currentActiveTab==="2"? <CardSalle />:<></>}
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                        {currentActiveTab==="3"? <CardProduct />:<></>}
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
                        <CardExpense />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
              

            </TemplateUser>

       
            </React.Fragment>
            
            
         </Container>
        );
}

export default CardUser;