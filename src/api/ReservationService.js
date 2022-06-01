const { axiosInstance } = require("config/axiosInstance");

function addReservation(data){
    return axiosInstance.post('/addReservation',data)
}
function Reservations(){
    return axiosInstance.get('/Reservations')
}
function getReservationStat(id){
    return axiosInstance.get('/getreservationstat/'+id)
}
function deleteReservation(id){
    return axiosInstance.delete('/deleteReservation/'+id)
}

export default {
    addReservation,
    Reservations,
    deleteReservation,
    getReservationStat

}