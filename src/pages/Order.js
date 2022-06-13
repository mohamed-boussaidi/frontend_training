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
import OrderService from "../api/OrderService";

import { connect } from "react-redux";
import Select from 'react-select'
import AddOrder from "../components/form/AddOrder";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import Popup from "components/Popup";
import moment from "moment";
import {getProductListFromArray} from "../utlis/functions";
import MaterialTable from "material-table";

const orders = (props) => {
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Note de frais", link: "#" }
  ]
  const [orders, setOrders ] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () =>
  {
    setOpenModal(false)
    setOrder(null)
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
      render: rowData => <div> {moment(rowData.created_at).format("YYYY-MM-DD")}</div>,
      title: "Date de demande",
      field: "created_at",
      sort: "asc",
      width: 100,

    },
    {
      title: "Produits",
      field: "products",
      sort: "asc",
      width: 100,
      render: rowData => <div> {getProductListFromArray(rowData.products)}</div>,

    },
    {
      title: "Status",
      field: "status",
      sort: "asc",
      width: 100,
      render:rowData=> <span className={rowData.status==="pendding"?"badge bg-warning ":rowData.status==="accepted"?"badge bg-success":"badge bg-danger" }> <h5>{rowData.status==="pendding"?"En cours... ":rowData.status==="accepted"?"Accepter":"Refuser" }</h5></span>

    },
  ]

  async function acceptOrder(id){
    const response = await OrderService.acceptorder(id)
    if(response.status===200){
      onRefresh()
        }
  }
  async function rejectOrder(id){
    const response = await OrderService.rejectorder(id)
    if(response.status===200){
      onRefresh()

    }
  }

  async function activateEditPopup(id){
    const response = await OrderService.getorder(id)
    if(response.status===200){
      setOrder(response.data)
      handleShow()
    }
  }
  const actions = [
    {
      icon: 'check',
      tooltip: 'Accepter matériel',
      onClick: (event, rowData) => acceptOrder(rowData.id)
    },
    {
      icon: 'clear',
      tooltip: 'Refuser matériel',
      onClick: (event, rowData) => rejectOrder(rowData.id)
    },
    {
      icon: 'edit',
      tooltip: 'Modifier matériel',
      onClick: (event, rowData) => activateEditPopup(rowData.id)
    },

  ]
  async function  getOrders(){
    setLoading(true)
    const response = await OrderService.orders()
      if(response.status===200){
        setOrders(response.data)
        setLoading(false)
      }
  }
  function onRefresh(){
    getOrders()
    handleClose()
  }

  useEffect( () => {
    getOrders()
    props.setBreadcrumbItems('Gestion des demandes materiels', breadcrumbItems)
  }, [])
  return (
    <React.Fragment>
      <Row>
        <Col className="col-12">
          <Card>
            <div className="text-end float-end pt-3 p-3 ">
              <button  className="btn btn-primary  w-md waves-effect waves-light"
                       onClick={handleShow} type="submit">
               <b>+ Ajouter</b>
              </button>
            </div>
            <CardBody>
              <MaterialTable
                  title={"Expenses"}
                  columns={columns}
                  data={orders}
                  actions={actions}
                  isLoading={loading}
                  editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setLoading(true)
                          setTimeout(() => {
                            OrderService.deleteorder(oldData.id).then(response => {
                              if (response.status === 200 || response.status === 201) {
                                getOrders()
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
                  localization={{
                    body: {
                        emptyDataSourceMessage: "Pas d'enregistreent à afficher",
                        addTooltip: 'Ajouter',
                        deleteTooltip: 'Supprimer',
                        editTooltip: 'Editer',
                        filterRow: {
                            filterTooltip: 'Filtrer'
                        },
                        editRow: {
                            deleteText: 'Voulez-vous supprimer cette ligne?',
                            cancelTooltip: 'Annuler',
                            saveTooltip: 'Enregistrer'
                        }
                    },
                    grouping: {
                        placeholder: "Tirer l'entête ...",
                        groupedBy: 'Grouper par:'
                    },
                    header: {
                        actions: 'Actions'
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'lignes',
                        labelRowsPerPage: 'lignes par page:',
                        firstAriaLabel: 'Première page',
                        firstTooltip: 'Première page',
                        previousAriaLabel: 'Page précédente',
                        previousTooltip: 'Page précédente',
                        nextAriaLabel: 'Page suivante',
                        nextTooltip: 'Page suivante',
                        lastAriaLabel: 'Dernière page',
                        lastTooltip: 'Dernière page'
                    },
                    toolbar: {
                        addRemoveColumns: 'Ajouter ou supprimer des colonnes',
                        nRowsSelected: '{0} ligne(s) sélectionée(s)',
                        showColumnsTitle: 'Voir les colonnes',
                        showColumnsAriaLabel: 'Voir les colonnes',
                        exportTitle: 'Exporter',
                        exportAriaLabel: 'Exporter',
                        exportName: 'Exporter en CSV',
                        searchTooltip: 'Chercher',
                        searchPlaceholder: 'Chercher'
                    }
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
 <AddOrder data={order}
                      onRefresh={onRefresh}>
    </AddOrder>
      </Popup>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(orders);
