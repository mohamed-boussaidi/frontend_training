import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { logoutUser } from "../../store/actions"

const Logout = props => {
  useEffect(() => {
    localStorage.setItem("authUser",null)
    const {history} = props;
    history.push('/')
  })

  return <></>
}

export default withRouter(Logout)
