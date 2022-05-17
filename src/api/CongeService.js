const { axiosInstance } = require("config/axiosInstance");


function addConges(data){
    return axiosInstance.post('/addConges',data)
}
function getAllConges(){
    return axiosInstance.get('/Conges')
}

function getConge(id){
    return axiosInstance.get('/getConge/'+id)
}
function UpdateConges(data){
    return axiosInstance.put('/UpdateConges/'+data.id,data)
}

function deleteConges(id){
    return axiosInstance.delete('/deleteConges/'+id)
}

export default {
    deleteConges,
    UpdateConges,
    getAllConges,
    addConges,
    getConge

}