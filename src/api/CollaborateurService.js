const { axiosInstance } = require("config/axiosInstance");


function loginCollaborateur(data){
    return axiosInstance.post('/loginCollaborateur',data)
}
function registerCollaborateur(data){
    return axiosInstance.post('/registerCollaborateur',data)
}
function addCollaborateurs(data){
    return axiosInstance.post('/addCollaborateurs',data)
}
function getAllCollaborateurs(){
    return axiosInstance.get('/collaborateurs')
}

function getCollaborateur(id){
    return axiosInstance.get('/getCollaborateurs/'+id)
}
function UpdateCollaborateurs(data){
    return axiosInstance.put('/UpdateCollaborateurs/'+data.id,data)
}

function deleteCollaborateurs(id){
    return axiosInstance.put('/deleteCollaborateurs/'+id)
}

export default {
    registerCollaborateur,
    loginCollaborateur,
    deleteCollaborateurs,
    UpdateCollaborateurs,
    getAllCollaborateurs,
    addCollaborateurs,
    getCollaborateur

}