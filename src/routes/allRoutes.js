import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"


// Authentication related pages
import LoginAdmin from "../pages/Authentication/LoginAdmin"
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
import Salle from "../pages/Salle"
import Depense from "../pages/TypeDepense"

import Formulaire from "pages/Formulaire"
import Products from "pages/Products"
import Order from "pages/Order"
//import demandeMateriel from "pages/demandeMateriel"



import Pages404 from "../pages/Extra Pages/pages-404";
import Pages500 from "../pages/Extra Pages/pages-500";
import Conge from "../pages/Conge";
import Reservation from "../pages/Reservation";
import CalendarSalles from "../pages/CalendarSalles"


const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  // // //profile
  { path: "/logout", component: Logout },
  { path: "/conge", component: Conge },
  { path: "/user", component: User },
  { path: "/ExpenseReport", component: ExpenseReport },
  { path: "/TypeDepense", component: Depense },
  { path: "/Salle", component: Salle },
  { path: "/formulaire", component: Formulaire },
  { path: "/Product", component: Products },
  { path: "/Reservation", component: Reservation },
  { path: "/Orders", component: Order },
  { path: "/profile", component: UserProfile },
  { path: "/calendarsalles/:id", component: CalendarSalles },


  
  






  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/loginAdmin", component: LoginAdmin },
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


export { userRoutes, authRoutes  }