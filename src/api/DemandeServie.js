const { axiosInstance } = require("config/axiosInstance");

function addorder(data){
    return axiosInstance.post('/addorder',data)
}
function orders(){
    return axiosInstance.get('/orders')
}
function acceptorder(id){
    return axiosInstance.get('/acceptorder/'+id)
}
function rejectorder(id){
    return axiosInstance.get('/rejectorder/'+id)
}
function getorder(id){
    return axiosInstance.get('/getorder/'+id)
}
function UpdateExpense(data){
    return axiosInstance.put('/UpdateExpense/'+data.id,data)
}
function deleteorder(id){
    return axiosInstance.delete('/deleteorder/'+id)
}

export default {
    addorder,
    orders,
    acceptorder,
    rejectorder,
    deleteorder,
    UpdateExpense,
    getorder

}