const { axiosInstance } = require("config/axiosInstance");


function addConges(data){
    return axiosInstance.post('/addConge',data)
}
function getAllConges(){
    return axiosInstance.get('/Conges')
}
function AcceptConge(id){
    return axiosInstance.get('/acceptConge/'+id)
}
function RefuseConge(id){
    return axiosInstance.get('/rejectConge/'+id)
}
function getConge(id){
    return axiosInstance.get('/getConge/'+id)
}
function UpdateConges(data){
    return axiosInstance.put('/UpdateConge/'+data.id,data)
}

function deleteConges(id){
    return axiosInstance.delete('/deleteConges/'+id)
}

export default {
    deleteConges,
    UpdateConges,
    getAllConges,
    addConges,
    getConge,
    RefuseConge,
    AcceptConge

}