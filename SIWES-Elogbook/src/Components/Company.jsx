// import React from 'react'
// import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { axiosInstance } from "../axiosConfig";

const Company = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [company, setCompany] = useState([])

  useEffect(() => {
    axiosInstance.get(apiUrl + '/auth/company')
    .then(result => {
        if(result.data.Status) {
          setCompany(result.data.Result);
        } else {
          alert(result.data.Error)
        }
    }).catch(err => console.log(err))
  },[])

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Company List</h3>
      </div>
      <Link to='/dashboard/add_company' className="btn btn-success">Add Company</Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
              {
                company.map((c,a) => (
                  <tr key={a}>
                    <td>{c.name}</td>
                    <td>{c.address}</td>
                    <td>{c.phone_number}</td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Company