import React , {useEffect} from "react"
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux";
import {
  Row,
  Col,
} from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings";
import EmailSent from "./Forfaits";

import RecentActivity from "./recent-activity";


//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import ChartsAppex from "pages/Charts/charts-appex";
import CollaborateurService from "api/CollaborateurService";
import { useState } from "react";
import Loading from "../../components/Loading";
import ReservationService from "../../api/ReservationService";
import OrderService from "../../api/OrderService";
import ExpenseService from "../../api/ExpenseService";

const Dashboard = (props) => {
  const [collaborateur, setCollaborateur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState(null);
  const [order, setOrder] = useState(null);
  const [reservation, setReservation] = useState(null);

  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Tableau de bord", link: "#" }
  ]



  useEffect(() => {
    setLoading(true)
    CollaborateurService.StatCollaborateurs().then(response=>{
      if(response.status===200){
        setCollaborateur(
            { title: "Collaborateurs", iconClass: "account", total: (response.data.nbr?response.data.nbr:0), average: "0%", badgecolor: "warning" },
        )
      }
    })
    ReservationService.allreservationstat().then(response=>{
      if(response.status===200){
        setReservation(
            { title: "Reservation Salle", iconClass: "table-chair", total: (response.data.nbr?response.data.nbr:0), average: "0%", badgecolor: "warning" },
        )
      }
    })
    ExpenseService.expensestat().then(response=>{
      if(response.status===200){
        setExpense(
            { title: "Demande de note de frais", iconClass: "cash-check", total: (response.data.nbr?response.data.nbr:0), average: "0%", badgecolor: "warning" },
        )
      }
    })
    OrderService.allOrderstat().then(response=>{
      if(response.status===200){
        setOrder(
            { title: "Demande de Commande", iconClass: "calendar", total: (response.data.nbr?response.data.nbr:0), average: "0%", badgecolor: "warning" },
        )
        setLoading(false)

      }
    })
    props.setBreadcrumbItems('Tableau de bord' , breadcrumbItems)
  }, [])


    return (
      <React.Fragment>
  
        <MetaTags>
          <title>Dashboard | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>
  
        {/*mimi widgets */}
        {loading || !collaborateur || !expense || !order || !reservation ?
            <Loading/>
            :<Miniwidget reports={[reservation,collaborateur,order,expense]} />}
  
        <Row>
          <Col xl="3">
            {/* Monthly Earnings */}
            <MonthlyEarnings />
          </Col>
  
          <Col xl="9">
            {/* Email sent */}
           <ChartsAppex />
          </Col>
  
        </Row>
        <Row>
          <Col xl="7">
            {/* Email sent */}
            <EmailSent />
          </Col>
          <Col xl="5">
            {/* materiel */}
            <RecentActivity />
          </Col>
        </Row>
  
       
  
      </React.Fragment>
    )
  
}

export default connect(null, { setBreadcrumbItems })(Dashboard);