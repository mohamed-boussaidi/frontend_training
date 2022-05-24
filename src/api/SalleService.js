const { axiosInstance } = require("config/axiosInstance");

function addSalle(data){
    return axiosInstance.post('/addSalle',data)
}
function Salles(){
    return axiosInstance.get('/Salles')
}

function getSalle(id){
    return axiosInstance.get('/getSalle/'+id)
}
function UpdateSalle(data){
    return axiosInstance.put('/UpdateSalle/'+data.id,data)
}
function deleteSalle(id){
    return axiosInstance.delete('/deleteSalle/'+id)
}
function uploadImage(data){
    return axiosInstance.post('/uploadImage/salles',data)
}


export default {
    addSalle,
    Salles,
    getSalle,
    UpdateSalle,
    deleteSalle,
    uploadImage

}