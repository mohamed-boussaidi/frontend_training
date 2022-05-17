import React, { useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation"
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  Label,
  Input,
} from "reactstrap"

import { connect } from "react-redux";
import Select from 'react-select'

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import Popup from "components/Popup";
import CongeService from "../api/CongeService";
import AddConge from "../components/form/AddConge";
import moment from "moment";
import MaterialTable from "material-table";

const Conge = (props) => {
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Conges", link: "#" }
  ]
  const [conges, setConges] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [conge, setConge] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () =>
  {
    setOpenModal(false)
    setConge(null)
  }
  const handleShow = () => setOpenModal(true);
  const columns= [
    {
      title: "Demandateur",
      field: "Demandateur",
      sort: "asc",
      width: 100,
      render :rowData => <b>{rowData.collaborateur.nom+" "+rowData.collaborateur.prenom}</b>

    },
  
    {
      render: rowData => <div> {moment(rowData.date_naissance).format("YYYY-MM-DD")}</div>,
      title: "Date de demande",
      field: "date_demande",
      sort: "asc",
      width: 100,

    },
    
    {
      render: rowData => <div> {moment(rowData.date_entree).format("YYYY-MM-DD")}</div>,
      title: "Date de debut",
      field: "date_debut",
      sort: "asc",
      width: 100,

    },
    {
      render: rowData => <div> {moment(rowData.date_sortie).format("YYYY-MM-DD")}</div>,
      title: "Date de fin",
      field: "date_fin",
      sort: "asc",
      width: 100,

    },
    {
      title: "Nombre de jours",
      field: "nbr_jrs",
      sort: "asc",
      width: 100,

    },
    {
      title: "Type de congé",
      field: "type_conge",
      sort: "asc",
      width: 100,

    },
    {
      title: "Status",
      field: "status",
      sort: "asc",
      width: 100,
      render:rowData=> <span className={rowData.status==="pendding"?"badge bg-warning ":rowData.status==="accepted"?"badge bg-success":"badge bg-danger" }> <h5>{rowData.status}</h5></span>

    },
  ]

  async function AcceptConge(id){
    const response = await CongeService.AcceptConge(id)
    if(response.status===200){
      onRefresh()
        }
  }
  async function RefuseConge(id){
    const response = await CongeService.RefuseConge(id)
    if(response.status===200){
      onRefresh()

    }
  }

  async function activateEditPopup(id){
    const response = await CongeService.getConge(id)
    if(response.status===200){
      setConge(response.data)
      handleShow()
    }
  }
  const actions = [
    {
      icon: 'check',
      tooltip: 'Accepter Conge',
      onClick: (event, rowData) => AcceptConge(rowData.id)
    },
    {
      icon: 'clear',
      tooltip: 'Refuser Conge',
      onClick: (event, rowData) => RefuseConge(rowData.id)
    },
    {
      icon: 'edit',
      tooltip: 'Edit Conge',
      onClick: (event, rowData) => activateEditPopup(rowData.id)
    },

  ]
  async function  getConges(){
    setLoading(true)
    const response = await CongeService.getAllConges()
      if(response.status===200){
        setConges(response.data)
        setLoading(false)
      }
  }
  function onRefresh(){
    getConges()
    handleClose()
  }

  useEffect( () => {
    getConges()
    props.setBreadcrumbItems('Gestion des conges', breadcrumbItems)
  }, [])
  return (
    <React.Fragment>
      <Row>
        <Col className="col-12">
          <Card>
            <div className="text-end float-end pt-3 p-3 ">
              <button  className="btn btn-primary  w-md waves-effect waves-light"
                       onClick={handleShow} type="submit">
                <i className="mdi mdi-account-plus"></i>
              </button>
            </div>
            <CardBody>
              <MaterialTable
                  title={"Conges"}
                  columns={columns}
                  data={conges}
                  actions={actions}
                  isLoading={loading}
                  editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setLoading(true)
                          setTimeout(() => {
                            CongeService.deleteConges(oldData.id).then(response => {
                              if (response.status === 200 || response.status === 201) {
                                getConges()
                                setLoading(false)
                              }
                            }).catch(response => {
                            })
                            resolve();
                          }, 1000)
                        }),
                  }}
                  options={{
                    actionsColumnIndex: -1,
                    exportButton: true
                  }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Popup visibility={openModal}
             closeAction={handleClose}
             title={"Ajouter Congé"}
             class="text-center"
      >
    <AddConge data={conge}
                      onRefresh={onRefresh}>
    </AddConge>
      </Popup>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Conge);
