// import React from 'react'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
  return localStorage.getItem("valid") ? children : <Navigate to="/start" />
}

export default PrivateRoute