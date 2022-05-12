const { default: axios } = require("axios");

const user=localStorage.getItem("authUser")
var headers= null
if(user!==null && user!=="null"){
    headers={
        "Authorization" : "Bearer "+JSON.parse(user).token
    }
}


export const axiosInstance =axios.create(
    {baseURL:process.env.REACT_APP_URL,
        timeout:60000,
        headers:headers
    }
    )
