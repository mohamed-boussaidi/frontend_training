import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"


// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentications
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import User from "../pages/User" 
import ExpenseReport from "../pages/ExpenseReport"
import Leave from "../pages/Leave"
import Hall from "../pages/Hall"
import Mobile from "../pages/Mobile"
import PC from "../pages/PC"
import Formulaire from "pages/Formulaire"


import Pages404 from "../pages/Extra Pages/pages-404";
import Pages500 from "../pages/Extra Pages/pages-500";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  // // //profile
  { path: "/logout", component: Logout },
  { path: "/profile", component: UserProfile },
  { path: "/user", component: User },
  { path: "/ExpenseReport", component: ExpenseReport },
  { path: "/leave", component: Leave },
  { path: "/Hall", component: Hall },
  { path: "/Mobile", component: Mobile },
  { path: "/PC", component: PC },
  { path: "/formulaire", component: Formulaire },





  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/auth-lock-screen", component: LockScreen },
]

export { userRoutes, authRoutes }