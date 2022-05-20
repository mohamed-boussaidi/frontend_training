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
import ReservationService from "../api/ReservationService";
import moment from "moment";
import MaterialTable from "material-table";

const Reservation = (props) => {
  const [reservations, setReservations] = useState([]);
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: " Les Reservations", link: "#" }
  ]

  const [loading, setLoading] = useState(false);

  const columns= [
    {
      title: "Demandateur",
      field: "Demandateur",
      sort: "asc",
      width: 100,
      render :rowData => <b>{rowData.collaborateur.nom+" "+rowData.collaborateur.prenom}</b>

    },
    {
      title: "Nom du salle",
      field: "Nom_du_salle",
      sort: "asc",
      width: 100,
      render: rowData => <div> {rowData.salle.nom_du_salle}</div>,

    },
    {
      render: rowData => <div> {moment(rowData.hour_start).format("hh:mm:ss")}</div>,
      title: "Heure de debut",
      field: "hour_start",
      sort: "asc",
      width: 100,

    },
    {
      render: rowData => <div> {moment(rowData.hour_end).format("hh:mm:ss")}</div>,
      title: "Heure de fin",
      field: "hour_end",
      sort: "asc",
      width: 100,

    },
    {
      render: rowData => <div> {moment(rowData.hour_end).format("YYYY-MM-DD")}</div>,
      title: "Date de reunion",
      field: "date_reunion",
      sort: "asc",
      width: 100,

    },
    {
      title: "Nombre de participant",
      field: "nbr_participant",
      sort: "asc",
      width: 100,
    },
    {
      title: "Materiel disponible",
      field: "material_dispo",
      sort: "asc",
      width: 100,
    },

    {
      title: "Nom de l'événement",
      field: "name_event",
      sort: "asc",
      width: 100,

    },
    
  ]

  async function  getReservations(){
    setLoading(true)
    const response = await ReservationService.Reservations()
      if(response.status===200){
        setReservations(response.data)
        setLoading(false)
      }
  }


  useEffect( () => {
    getReservations()
    props.setBreadcrumbItems('Gestion des Reservations', breadcrumbItems)
  }, [])
  return (
    <React.Fragment>

      <Row>

        <Col className="col-12">

          <Card>
            <CardBody>
              <MaterialTable
                  title={"Reservations"}
                  columns={columns}
                  data={reservations}
                  isLoading={loading}
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

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Reservation);
