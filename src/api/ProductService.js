const { axiosInstance } = require("config/axiosInstance");

function addproduct(data){
    return axiosInstance.post('/addproduct',data)
}
function Products(){
    return axiosInstance.get('/Products')
}

function getProduct(id){
    return axiosInstance.get('/getProduct/'+id)
}
function UpdateProduct(data){
    return axiosInstance.put('/UpdateProduct/'+data.id,data)
}
function deleteProduct(id){
    return axiosInstance.delete('/deleteProduct/'+id)
}

export default {
    addproduct,
    Products,
    getProduct,
    UpdateProduct,
    deleteProduct

}