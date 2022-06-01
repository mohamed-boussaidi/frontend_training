import React, {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popup from "../components/Popup"
import AddReservation from "../components/collaborateur/AddReservation"
import TemplateUser from "components/TemplateUser";
import {
Container
} from "reactstrap";
import ReservationService from "../api/ReservationService";
import {
  useParams
} from "react-router-dom";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function CalendarSalles(props) {
  let { id } = useParams();

  const [salle_id, setSalle_id] = useState(id);
  const [eventsData, setEventsData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleShow = () => {setOpenModal(true)};


  const handleSelect = ({ start, end }) => {
      setStart(start)
      setEnd(end)
    handleShow()
  };
  async function  getReservations(){
    setLoading(true)
    const response = await ReservationService.Reservations()
    if(response.status===200){
      var array =[]
      response.data.map((item,index)=>{
        const myJSON ={title:item.name_event,start:new Date(item.hour_start),end:new Date(item.hour_end)}
        array.push(myJSON)
      })
      setEventsData(array)
      setLoading(false)
    }
  }

  function onRefresh(){
    getReservations()
    handleClose()
  }

  useEffect( () => {
    getReservations()
  }, [])

  return (
    <Container>
    <React.Fragment>
    <TemplateUser>
      {
        eventsData
          ?
            <Calendar
                views={["day", "agenda", "work_week", "month"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="day"
                events={eventsData}
                style={{ height: "100vh" }}
                onSelectEvent={(event) => alert(event.title)}
                onSelectSlot={handleSelect}
            />
            :
            <></>
      }

               <Popup visibility={openModal} closeAction={handleClose} title={"Ajouter une salle"} class="text-center" >
                   {openModal
                       ?
                       <AddReservation start={start} end={end} salle_id={salle_id} onRefresh={onRefresh}>

                       </AddReservation>
                       : <></>
                   }
                  </Popup>
    </TemplateUser>
    </React.Fragment>
    </Container>
  );
}