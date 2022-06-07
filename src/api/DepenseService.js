const { axiosInstance } = require("config/axiosInstance");

function adddepense(data){
    return axiosInstance.post('/adddepense',data)
}
function Depenses(){
    return axiosInstance.get('/Depenses')
}

function getDepense(id){
    return axiosInstance.get('/getDepense/'+id)
}
function UpdateDepense(data){
    return axiosInstance.put('/UpdateDepense/'+data.id,data)
}
function deleteDepense(id){
    return axiosInstance.delete('/deleteDepense/'+id)
}

export default {
    adddepense,
    Depenses,
    getDepense,
    UpdateDepense,
    deleteDepense,
}