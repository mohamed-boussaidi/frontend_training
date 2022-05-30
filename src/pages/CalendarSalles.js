import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popup from "../components/Popup"
import AddReservation from "../components/form/AddReservation"
import TemplateUser from "components/TemplateUser";
import {
Container
} from "reactstrap";
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function CalendarSalles(props) {
  const [eventsData, setEventsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleShow = () => {setOpenModal(true)};


  const handleSelect = ({ start, end }) => {
    handleShow()
  };
  return (
    <Container>
    <React.Fragment>
    <TemplateUser>
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
               <Popup visibility={openModal} closeAction={handleClose} title={"Ajouter une salle"} class="text-center" >
         <AddReservation>

         </AddReservation>
                  </Popup>
    </TemplateUser>
    </React.Fragment>
    </Container>
  );
}