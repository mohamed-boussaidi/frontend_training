const { axiosInstance } = require("config/axiosInstance");

function addReservation(data){
    return axiosInstance.post('/addReservation',data)
}
function Reservations(){
    return axiosInstance.get('/Reservations')
}
function reservationstatbycollaborateur(id){
    return axiosInstance.get('/reservationstatbycollaborateur/'+id)
}
function allreservationstat(){
    return axiosInstance.get('/allreservationstat')
}
function deleteReservation(id){
    return axiosInstance.delete('/deleteReservation/'+id)
}

export default {
    addReservation,
    Reservations,
    deleteReservation,
    reservationstatbycollaborateur,
    allreservationstat

}