import React, { useEffect, useState } from "react"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Select from 'react-select'
import {
    Row,
    Col,
    Button,
    FormGroup,
    Label,
} from "reactstrap"
import moment from "moment";
import ReservationService from "../../api/ReservationService";
import {join_String} from "../../utlis/functions";
import { useAlert } from 'react-alert'

const AddReservation = (props) =>{
    const alert = useAlert()

    const [start,setStart]=useState(moment(props.start).format("HH:mm:ss"))
    const [end,setEnd]=useState(moment(props.end).format("HH:mm:ss"))
    const [salle_id,setSalle_id]=useState(props.salle_id)

    const breadcrumbItems = [
        { title: "SPOC", link: "#" },
        { title: "Forumlaire", link: "#" },
    ]
    const [selectedMulti1, setselectedMulti1] = useState([])
    function handleMulti1(selectedMulti1) {
        setselectedMulti1(selectedMulti1)
    }
    const optionGroup1 = [
        {
            label: "Materiel Dispo",
            options: [
                { label: "Ecran", value: "Ecran" },
                { label: "PC", value: "PC" },
            ]
        },
    ]

    async function addReservation(event, values){
        const dateStart=moment(props.start).format("YYYY-MM-DD")
        const dateEnd=moment(props.end).format("YYYY-MM-DD")
        var startdate=new Date(dateStart+" "+start.toString())
        var enddate=new Date(dateEnd+" "+end.toString())
            const userData  = localStorage.getItem("authUser")?JSON.parse(localStorage.getItem("authUser")):null
            values.collaborateur_id=userData.data.id
            values.hour_start=moment(startdate).format("YYYY-MM-DD[T]HH:mm:ss");
            values.hour_end=moment(enddate).format("YYYY-MM-DD[T]HH:mm:ss");
            values.salle_id=salle_id
            values.material_dispo=join_String(selectedMulti1)
            const response=await ReservationService.addReservation(values)
        if(response.status===200){
            props.onRefresh()
            alert.success('Demande de Reservation du  salle a ete enregistré')
        }else {
            alert.error('Error , Demande de Reservation du  salle')
        }

    }

    return(
        <div>
            <AvForm className="needs-validation"  onValidSubmit={(e, v) => {addReservation(e, v)}} >
                <Row>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Nom du l'événement</Label>
                            <AvField
                                name="name_event"
                                placeholder="Nom du l'événement"
                                type="text"
                                errorMessage=" SVP Entrez Nom du l'événement"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                            />
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom02">Nombre des personnes</Label>
                            <AvField
                                name="nbr_participant"
                                className="mb-3"
                                placeholder="Enter Nombre des personnes"
                                type="number"
                                errorMessage="Enter Nombre des personnes"
                                validate={{
                                    required: { value: true },
                                    pattern: {
                                        value: "^[0-9]+$",
                                        errorMessage: "Only Numbers",
                                    },
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <div className="mb-3">
                            <label
                                htmlFor="example-time-input"
                            >
                                Heure Début
                            </label>
                            <div className="col-md-15">
                                <input
                                    className="form-control"
                                    type="time"
                                    id="example-time-input"
                                    value={start}
                                    onChange={event => setStart(event.target.value)}

                                />
                            </div>

                        </div>
                    </Col>

                    <Col md="6">
                        <label
                            htmlFor="example-time-input"
                        >
                            Heure Fin
                        </label>
                        <div className="col-md-15">
                            <input
                                className="form-control"
                                type="time"
                                id="example-time-input"
                                value={end}
                                onChange={event => setEnd(event.target.value)}

                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div className="mb-3 templating-select select2-container">
                            <label className="control-label">Matériel Disponible</label>
                            <Select
                                value={selectedMulti1}
                                isMulti={true}
                                onChange={(e) => {
                                    handleMulti1(e)
                                }}
                                options={optionGroup1}
                                classNamePrefix="select2-selection"
                                closeMenuOnSelect={false}
                            />
                        </div>

                    </Col>
                </Row>
                <Col md="50">
                    <FormGroup className="mb-0">
                        <div>
                            <Button type="submit" color="primary" className="ms-1">
                                Enregistrer
                            </Button>
                        </div>
                    </FormGroup>
                </Col>
            </AvForm>
        </div>)
};
export default AddReservation;