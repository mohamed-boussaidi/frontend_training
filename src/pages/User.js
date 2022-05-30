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
import CollaborateurService from "../api/CollaborateurService";
import AddCollaborateur from "../components/form/AddCollaborateur";
import moment from "moment";
import MaterialTable from "material-table";

const User = (props) => {
  const [users, setUsers] = useState([]);
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Utilisateurs", link: "#" }
  ]

  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () =>
  {
    setOpenModal(false)
    setUser(null)
  }
  const handleShow = () => setOpenModal(true);
  const columns= [
    {
      title: "Image",
      field: "image",
      sort: "asc",
      width: 100,
      render :rowData => <img src={process.env.REACT_APP_URL_IMAGES_USERS+rowData.image} className={"rounded-circle header-profile-user"} />

    },
    {
      title: "Nom",
      field: "nom",
      sort: "asc",
      width: 100,

    },
    {
      title: "Prénom",
      field: "prenom",
      sort: "asc",
      width: 100,

    },
    {
      render: rowData => <div> {moment(rowData.date_naissance).format("YYYY-MM-DD")}</div>,
      title: "Date de naissance",
      field: "date_naissance",
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
      title: "Carte d'identite",
      field: "cin",
      sort: "asc",
      width: 100,
    },
    {
      title: "Civilite",
      field: "sexe",
      sort: "asc",
      width: 100,
    },

    {
      title: "Code Postale",
      field: "code_postale",
      sort: "asc",
      width: 100,

    },
    {
      render: rowData => <div> {moment(rowData.date_entree).format("YYYY-MM-DD")}</div>,
      title: "Date entree",
      field: "date_entree",
      sort: "asc",
      width: 100,

    },
    {
      render: rowData => <div> {moment(rowData.date_sortie).format("YYYY-MM-DD")}</div>,
      title: "Date Sortie",
      field: "date_sortie",
      sort: "asc",
      width: 100,

    },
    {
      title: "Departement",
      field: "departement",
      sort: "asc",
      width: 100,

    },
    {
      title: "Email",
      field: "email",
      sort: "asc",
      width: 100,

    },
    {
      title: "Fonction",
      field: "fonction",
      sort: "asc",
      width: 100,

    },
    {
      title: "matricule",
      field: "matricule",
      sort: "asc",
      width: 100,

    },

    {
      title: "Telephone",
      field: "telephone",
      sort: "asc",
      width: 100,

    },
    {
      title: "Type Contrat",
      field: "type_contrat",
      sort: "asc",
      width: 100,

    },
    {
      title: "Ville",
      field: "ville",
      sort: "asc",
      width: 100,

    }
  ]

  async function activateEditPopup(id){
    const response = await CollaborateurService.getCollaborateur(id)
    if(response.status===200){
      setUser(response.data)
      handleShow()
    }
  }
  const actions = [
    {
      icon: 'edit',
      tooltip: 'Edit Collaborateur',
      onClick: (event, rowData) => activateEditPopup(rowData.id)
    }
  ]
  async function  getUsers(){
    setLoading(true)
    const response = await CollaborateurService.getAllCollaborateurs()
      if(response.status===200){
        setUsers(response.data)
        setLoading(false)
      }
  }
  function onRefresh(){
    getUsers()
    handleClose()
  }

  useEffect( () => {
    getUsers()
    props.setBreadcrumbItems('Gestion des collaborateurs', breadcrumbItems)
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
                  title={"Collaborateurs"}
                  columns={columns}
                  data={users}
                  actions={actions}
                  isLoading={loading}
                  editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setLoading(true)
                          setTimeout(() => {
                            CollaborateurService.deleteCollaborateurs(oldData.id).then(response => {
                              if (response.status === 200 || response.status === 201) {
                                getUsers()
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
             title={user?"Modifier Utilisateur":"Ajouter Utilisateur"}
             class="text-center"
      >
    <AddCollaborateur data={user}
                      onRefresh={onRefresh}>
    </AddCollaborateur>
      </Popup>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(User);
