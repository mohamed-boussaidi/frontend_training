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
import ExpenseService from "../api/ExpenseService";

import { connect } from "react-redux";
import Select from 'react-select'
import AddExpense from "../components/form/AddExpense";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import Popup from "components/Popup";
import moment from "moment";
import MaterialTable from "material-table";

const ExpenseReport = (props) => {
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Note de frais", link: "#" }
  ]
  const [expenses, setExpenses ] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [expense, setexpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () =>
  {
    setOpenModal(false)
    setexpense(null)
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
      title: "Type de dépense",
      field: "type_depense.nom",
      sort: "asc",
      width: 100,

    },
    {
      title: "Total TTC",
      field: "total_ttc",
      sort: "asc",
      width: 100,

    },
    {
      title: "Client",
      field: "client",
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

  async function acceptExpense(id){
    const response = await ExpenseService.acceptExpense(id)
    if(response.status===200){
      onRefresh()
        }
  }
  async function rejectExpense(id){
    const response = await ExpenseService.rejectExpense(id)
    if(response.status===200){
      onRefresh()

    }
  }

  async function activateEditPopup(id){
    const response = await ExpenseService.getExpense(id)
    if(response.status===200){
      setexpense(response.data)
      handleShow()
    }
  }
  const actions = [
    {
      icon: 'check',
      tooltip: 'Accept Expense',
      onClick: (event, rowData) => acceptExpense(rowData.id)
    },
    {
      icon: 'clear',
      tooltip: 'Reject Expense',
      onClick: (event, rowData) => rejectExpense(rowData.id)
    },
    {
      icon: 'edit',
      tooltip: 'Edit Expense',
      onClick: (event, rowData) => activateEditPopup(rowData.id)
    },

  ]
  async function  getExpenses(){
    setLoading(true)
    const response = await ExpenseService.getExpenses()
      if(response.status===200){
        setExpenses(response.data)
        setLoading(false)
      }
  }
  function onRefresh(){
    getExpenses()
    handleClose()
  }

  useEffect( () => {
    getExpenses()
    props.setBreadcrumbItems('Gestion des notes de frais', breadcrumbItems)
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
                  title={"Note de frais"}
                  columns={columns}
                  data={expenses}
                  actions={actions}
                  isLoading={loading}
                  editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setLoading(true)
                          setTimeout(() => {
                            ExpenseService.deleteExpense(oldData.id).then(response => {
                              if (response.status === 200 || response.status === 201) {
                                getExpenses()
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
             title={expense?"Mise a jour note de frais":" Ajouter note de frais"}
             class="text-center"
      >
 <AddExpense data={expense}
                      onRefresh={onRefresh}>
    </AddExpense>
      </Popup>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(ExpenseReport);
