const { axiosInstance } = require("config/axiosInstance");


function login(data){
    return axiosInstance.post('/login',data)
}
function register(data){
    return axiosInstance.post('/register',data)
}

export default {
    register,
    login

}