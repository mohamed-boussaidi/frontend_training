const { axiosInstance } = require("config/axiosInstance");


function loginCollaborateur(data){
    return axiosInstance.post('/collaborateurlogin',data)
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
function StatCollaborateurs(){
    return axiosInstance.get('/statcollaborateurs')
}

function getCollaborateur(id){
    return axiosInstance.get('/getCollaborateurs/'+id)
}
function UpdateCollaborateurs(data){
    return axiosInstance.put('/UpdateCollaborateurs/'+data.id,data)
}

function deleteCollaborateurs(id){
    return axiosInstance.delete('/deleteCollaborateurs/'+id)
}
function uploadImage(data){
    return axiosInstance.post('/uploadImage/users',data)
}


export default {
    registerCollaborateur,
    loginCollaborateur,
    deleteCollaborateurs,
    UpdateCollaborateurs,
    getAllCollaborateurs,
    addCollaborateurs,
    getCollaborateur,
    StatCollaborateurs,
    uploadImage

}