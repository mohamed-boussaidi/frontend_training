import React from "react"
import { Route, Redirect } from "react-router-dom"
import jwt_decode from "jwt-decode";


function Authmiddleware  ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  path :path,
  ...rest
}){

    const userData  = localStorage.getItem("authUser")?JSON.parse(localStorage.getItem("authUser")):null
  return (
  <Route
    {...rest}
    render={props => {
        if(!isAuthProtected){
            if(userData!== undefined && userData!== null && userData!== "null"){
                return (
                    <Redirect
                        to={{pathname: "/"}}
                    />
                )
            }else{
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )
            }
        }
        if(userData!== undefined && userData!== null && userData!== "null") {
            const user =jwt_decode(userData.token)
            if (Date.now() > user.exp * 1000) {
                localStorage.setItem("authUser", null)
                return (
                    <Redirect
                        to={{pathname: "/login"}}
                    />
                )
            }else if(userData.role!=="admin" ) {
                if(path==="/profile" || path==="/calendarsalles/:id" ){
                    return (
                        <Layout>
                        <Component {...props} />
                    </Layout>
                    )
                }else{
                    return (
                        <Redirect
                        to={{pathname: "/profile"}}
                    />
                    )
                }

            }else{
                return (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                )
            }
        }else {
            return (
                <Redirect
                    to={{pathname: "/login"}}
                />
            )
        }
    }}
  />
  )
}



export default Authmiddleware
