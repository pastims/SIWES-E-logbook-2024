// import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthContext'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children, requiredRole}) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/start" />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />
  }

  return children;
  // return localStorage.getItem("valid") ? children : <Navigate to="/start" />
}

export default PrivateRoute