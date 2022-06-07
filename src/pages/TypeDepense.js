import React, { useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { useState } from "react";
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

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import DepenseService from "../api/DepenseService";
import MaterialTable from "material-table";

const Depense = (props) => {
  const [depenses, setDepenses] = useState([]);
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Gestion type de depense", link: "#" }
  ]

  const [loading, setLoading] = useState(false);

  const columns= [
      
    {
      title: "Nom",
      field: "nom",
      sort: "asc",
      width: 100,

    },
    
  ]


  async function  getDepenses(){
    setLoading(true)
    const response = await DepenseService.Depenses()
      if(response.status===200){
        setDepenses(response.data)
        setLoading(false)
      }
  }


  useEffect( () => {
    getDepenses()
    props.setBreadcrumbItems('Gestion les types de depense', breadcrumbItems)
  }, [])
  return (
    <React.Fragment>

      <Row>

        <Col className="col-12">

          <Card>

            <CardBody>
              <MaterialTable
                  title={"Les types de depense"}
                  columns={columns}
                  data={depenses}
                  isLoading={loading}
                  editable={{
                    onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setLoading(true)

                      setTimeout(() => {
                        DepenseService.adddepense(newData).then(response => {
                          if (response.status === 200 || response.status === 201) {
                            getDepenses()
                            setLoading(false)
                          }
                        }).catch(response => {
                        })
                        
                        resolve();
                      }, 1000)
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setLoading(true)

                      setTimeout(() => {
                        DepenseService.UpdateDepense(newData).then(response => {
                          if (response.status === 200 || response.status === 201) {
                            getDepenses()
                            setLoading(false)
                          }
                        }).catch(response => {
                        })
          
                        resolve();
                      }, 1000)
                    }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setLoading(true)
                          setTimeout(() => {
                            DepenseService.deleteDepense(oldData.id).then(response => {
                              if (response.status === 200 || response.status === 201) {
                                getDepenses()
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


    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Depense);
