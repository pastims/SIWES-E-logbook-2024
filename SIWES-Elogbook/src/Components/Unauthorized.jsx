// import React from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Unauthorized = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleOut = () => {
      axios.get(apiUrl + '/employee/logout')
      .then(result => {
        if(result.data.Status) {
          localStorage.removeItem("valid")
          localStorage.removeItem("isAuthenticated")
          localStorage.removeItem("userRole")
          localStorage.removeItem("token")
          localStorage.removeItem("id")
          navigate('/')
        }
      }).catch(err => console.log(err))
    };

  return (
    <div className="container d-flex flex-column text-center align-items-center justify-content-center vh-100">
        <div className=""><i className="bi bi-x text-danger m-0 p-0" style={{fontSize: "100px"}}></i></div>
        <h1 className="text-danger mb-3">You are not authorized, login to continue</h1>
        <button type="button" className="btn bg-danger text-light rounded" onClick={handleOut}>
            Go to Home
          </button>
    </div>
  )
}

export default Unauthorized