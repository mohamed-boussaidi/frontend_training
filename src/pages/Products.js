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
import ProductService from "../api/ProductService";
import AddProduct from "../components/form/AddProduct";
import moment from "moment";
import MaterialTable from "material-table";

const Product = (props) => {
  const [products, setProducts] = useState([]);
  const breadcrumbItems = [
    { title: "SPOC", link: "#" },
    { title: "Les materiels", link: "#" }
  ]

  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () =>
  {
    setOpenModal(false)
    setProduct(null)
  }
  const handleShow = () => setOpenModal(true);
  const columns= [
      {
          title: "Image",
          field: "image",
          sort: "asc",
          width: 100,
          render :rowData => <img src={process.env.REACT_APP_URL_IMAGES_PRODUCTS+rowData.image} className={"rounded-circle header-profile-user"} />

      },
    {
      title: "Nom",
      field: "nom",
      sort: "asc",
      width: 100,

    },
    {
      title: "Modéle",
      field: "modele",
      sort: "asc",
      width: 100,

    },
    {
      title: "Type",
      field: "type",
      sort: "asc",
      width: 100,
    },
    {
      title: "Prix",
      field: "prix",
      sort: "asc",
      width: 100,
    },
  ]

  async function activateEditPopup(id){
    const response = await ProductService.getProduct(id)
    if(response.status===200){
      setProduct(response.data)
      handleShow()
    }
  }
  const actions = [
    {
      icon: 'edit',
      tooltip: 'Modifer Product',
      onClick: (event, rowData) => activateEditPopup(rowData.id)
    }
  ]
  async function  getProducts(){
    setLoading(true)
    const response = await ProductService.Products()
      if(response.status===200){
        setProducts(response.data)
        setLoading(false)
      }
  }
  function onRefresh(){
    getProducts()
    handleClose()
  }

  useEffect( () => {
    getProducts()
    props.setBreadcrumbItems('Gestion des matériels', breadcrumbItems)
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
                  title={"Materiels"}
                  columns={columns}
                  data={products}
                  actions={actions}
                  isLoading={loading}
                  editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setLoading(true)
                          setTimeout(() => {
                            ProductService.deleteProduct(oldData.id).then(response => {
                              if (response.status === 200 || response.status === 201) {
                                getProducts()
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
             title={product?"Modifier Matériel":"Ajouter Matériel"}
             class="text-center"
      >
    <AddProduct data={product}
                      onRefresh={onRefresh}>
    </AddProduct>
      </Popup>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Product);
