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
  const handleClose = () => setOpenModal(false);
  const handleShow = () => setOpenModal(true);
  const columns= [
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
      title: "Adresse",
      field: "adresse",
      sort: "asc",
      width: 100,
    },
    {
      title: "Adresse imme",
      field: "adresse_imme",
      sort: "asc",
      width: 100,
    },
    {
      title: "Carte d'identite",
      field: "carte_identite",
      sort: "asc",
      width: 100,
    },
    {
      title: "Civilite",
      field: "civilite",
      sort: "asc",
      width: 100,
    },
    {
      title: "Code Postal Imme",
      field: "code_postal_imme",
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
      title: "Date entree",
      field: "date_entree",
      sort: "asc",
      width: 100,

    },
    {
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
      field: "e_mail",
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
      title: "Immeuble",
      field: "immeuble",
      sort: "asc",
      width: 100,

    },
    {
      title: "Manager",
      field: "manager",
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
      title: "Parrain",
      field: "parrain",
      sort: "asc",
      width: 100,

    },
    {
      title: "Pole",
      field: "pole",
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
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Popup visibility={openModal}
             closeAction={handleClose}
             title={"Ajouter Utilisateur"}
             class="text-center"
      >
    <AddCollaborateur data={user}></AddCollaborateur>
      </Popup>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(User);
