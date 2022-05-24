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
import SalleService from "../api/SalleService";
import AddSalle from "../components/form/AddSalle";
import moment from "moment";
import MaterialTable from "material-table";

const Salle = (props) => {
  const [Salles, setSalles] = useState([]);
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Gestion des salles", link: "#" }
  ]

  const [openModal, setOpenModal] = useState(false);
  const [salle, setSalle] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () =>
  {
    setOpenModal(false)
    setSalle(null)
  }
  const handleShow = () => setOpenModal(true);
  const columns= [
      {
          title: "Image",
          field: "image",
          sort: "asc",
          width: 100,
          render :rowData => <img src={process.env.REACT_APP_URL_IMAGES_SALLES+rowData.image} className={"rounded-circle header-profile-user"} />

      },
    {
      title: "Nom",
      field: "nom_du_salle",
      sort: "asc",
      width: 100,

    },
    {
      title: "Les nombres du place",
      field: "nbr_place",
      sort: "asc",
      width: 100,

    },
    {
      title: "Les Equipement",
      field: "equipements",
      sort: "asc",
      width: 100,
    },
    {
      title: "Etage",
      field: "etage",
      sort: "asc",
      width: 100,
    },
    {
      title: "Adresse",
      field: "adresse",
      sort: "asc",
      width: 100,
    },

    {
      title: "Ville",
      field: "ville",
      sort: "asc",
      width: 100,

    },
  ]

  async function activateEditPopup(id){
    const response = await SalleService.getSalle(id)
    if(response.status===200){
      setSalle(response.data)
      handleShow()
    }
  }
  const actions = [
    {
      icon: 'edit',
      tooltip: 'Edit Salle',
      onClick: (event, rowData) => activateEditPopup(rowData.id)
    }
  ]
  async function  getSalles(){
    setLoading(true)
    const response = await SalleService.Salles()
      if(response.status===200){
        setSalles(response.data)
        setLoading(false)
      }
  }
  function onRefresh(){
    getSalles()
    handleClose()
  }

  useEffect( () => {
    getSalles()
    props.setBreadcrumbItems('Gestion des Salles', breadcrumbItems)
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
                  title={"Les salles"}
                  columns={columns}
                  data={Salles}
                  actions={actions}
                  isLoading={loading}
                  editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setLoading(true)
                          setTimeout(() => {
                            SalleService.deleteSalle(oldData.id).then(response => {
                              if (response.status === 200 || response.status === 201) {
                                getSalles()
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
             title={"Ajouter Salle"}
             class="text-center"
      >
    <AddSalle data={Salles}
                      onRefresh={onRefresh}>
    </AddSalle>
      </Popup>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Salle);
