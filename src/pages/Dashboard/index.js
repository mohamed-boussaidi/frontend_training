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

const Dashboard = (props) => {
  const [statCollaborateurs, setStatCollaborateurs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState(null);

  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Tableau de bord", link: "#" }
  ]
  const  getStatCollaborateurs=async ()=>{
    const response = await CollaborateurService.StatCollaborateurs()
      if(response.status===200){
        setStatCollaborateurs(response.data.nbr_collaborateurs)
      }
  }


  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      getStatCollaborateurs();
    }, 5000);

    setReports([
      { title: "Utilisateurs", iconClass: "account-group", total: statCollaborateurs?statCollaborateurs:0, average: "+11%", badgecolor: "info" },
      { title: "Demande conge", iconClass: "bag-suitcase-outline", total: "$46,782", average: "-29%", badgecolor: "danger" },
      { title: "demande matériel", iconClass: "cellphone-link", total: "$15.9", average: "0%", badgecolor: "warning" },
      { title: "demande note de frais", iconClass: "cash-check", total: "1890", average: "+89%", badgecolor: "info" }
        ])
    setLoading(false)
    props.setBreadcrumbItems('Tableau de bord' , breadcrumbItems)
    return () => clearTimeout(timer);

  }, [])


    return (
      <React.Fragment>
  
        <MetaTags>
          <title>Dashboard | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>
  
        {/*mimi widgets */}
        {loading ?<></>:<Miniwidget reports={reports} />}
  
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