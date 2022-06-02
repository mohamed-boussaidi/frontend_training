const { axiosInstance } = require("config/axiosInstance");

function addExpense(data){
    return axiosInstance.post('/addExpense',data)
}
function getExpenses(){
    return axiosInstance.get('/Expenses')
}
function acceptExpense(id){
    return axiosInstance.get('/acceptExpense/'+id)
}
function rejectExpense(id){
    return axiosInstance.get('/rejectExpense/'+id)
}
function getExpense(id){
    return axiosInstance.get('/getExpense/'+id)
}
function getExpenseSum(id){
    return axiosInstance.get('/expensesum/'+id)
}
function expensestat(){
    return axiosInstance.get('/expensestat')
}
function UpdateExpense(data){
    return axiosInstance.put('/UpdateExpense/'+data.id,data)
}
function deleteExpense(id){
    return axiosInstance.delete('/deleteExpense/'+id)
}

export default {
    addExpense,
    getExpenses,
    acceptExpense,
    rejectExpense,
    getExpense,
    UpdateExpense,
    deleteExpense,
    getExpenseSum,
    expensestat

}