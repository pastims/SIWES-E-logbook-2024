// import React from 'react'
import { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../axiosConfig';

const PendingProfile = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [company, setCompany] = useState([]);
  const [industrySupervisor, setIndustrySupervisor] = useState([]);
  const [schoolSupervisor, setSchoolSupervisor] = useState([]);
  const navigate = useNavigate()
  
  // const [pendingCompany, setPendingCompany] = useState({
  //   name: "",
  //   address: "",
  //   phone_number: ""
  // });

  useEffect(() => {
    // Fetch data for each category
    fetchCompany();
    fetchIndustrySupervisor();
    fetchSchoolSupervisor();
  }, []);


  const fetchCompany = () => {
    axiosInstance.get(apiUrl + '/auth/pending_company')
    .then(result => {
      if(result.data.Status) {
        // console.log(result)
        setCompany(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const fetchIndustrySupervisor = () => {
    axiosInstance.get(apiUrl + '/auth/pending_industry_supervisor')
    .then(result => {
      if(result.data.Status) {
        setIndustrySupervisor(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const fetchSchoolSupervisor = () => {
    axiosInstance.get(apiUrl + '/auth/pending_school_supervisor')
    .then(result => {
      if(result.data.Status) {
        setSchoolSupervisor(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
  }

  const handleRegisterCompany = (itemName, itemAddress, itemPhone) => {
    const pendingCompany = {
      name: itemName,
      address: itemAddress,
      phone_number: itemPhone
    };
    console.log(`Register clicked for item with Name: ${itemName}`);
    axiosInstance.post(apiUrl + '/auth/add_pending_company', pendingCompany)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/company')
        } else {
            alert(result.data.Error);
            // console.log("Helloing")
            console.log(JSON.stringify(result.data.Error));
        }
    })
    .catch(err => console.log(err))
    // Handle register logic here
  };

  const handleRegisterSupervisorI = (name, email, password, phone_number, company_id, position) => {
    const pendingSupervisorI = {
      name: name,
      email: email,
      password: password,
      phone_number: phone_number,
      company_id: company_id,
      position: position,
      category_id: 7,
    }
    console.log(`Register clicked for item with Name: ${name}`);
    axiosInstance.post(apiUrl + '/auth/add_pending_supervisorI', pendingSupervisorI)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/industry_supervisor')
        } else {
            alert(result.data.Error);
            console.log(JSON.stringify(result.data.Error));
        }
    })
    .catch(err => console.log(err))
    // Handle register logic here
  };

  const handleRegisterSupervisorS = (name, staff_id, email, password, school) => {
    const pendingSupervisorS = {
      name: name,
      staff_id: staff_id,
      email: email,
      password: password,
      school: school,
      category_id: 6,
    }
    console.log(`Register clicked for item with Name: ${name}`);
    axiosInstance.post(apiUrl + '/auth/add_pending_supervisorS', pendingSupervisorS)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/school_supervisor')
        } else {
            alert(result.data.Error);
            console.log(JSON.stringify(result.data.Error));
        }
    })
    .catch(err => console.log(err))
    // Handle register logic here
  };

  // const handleRegister = (itemId, itemName) => {
  //   console.log(`Register clicked for item with ID: ${itemId} and Name: ${itemName}`);
  //   // Handle register logic here
  // };

  const handleDelete = (id, itemName) => {
    console.log(`Delete clicked for item with ID: ${id} and Name: ${itemName}`);
    axiosInstance.delete(apiUrl + '/auth/delete_pending_details/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
    // Handle delete logic here
  };

  return (
    <div>
      <h2 className='text-center mt-4'>Pending Profiles List</h2>
    <div className="accordion" id="myAccordion">
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingCompany">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseCompany"
          aria-expanded="true"
          aria-controls="collapseCompany"
        >
          Companies
          <span className='badge bg-danger rounded-pill ms-2'>{Object.keys(company).length}</span>
        </button>
      </h2>
      <div
        id="collapseCompany"
        className="accordion-collapse collapse show"
        aria-labelledby="headingCompany"
        data-bs-parent="#myAccordion"
      >
        <div className="accordion-body">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {company.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.address}</td>
                <td>{company.phone_number}</td>
                <td><button className="btn btn-primary ms-2" onClick={() => 
                  handleRegisterCompany(company.id, company.name, company.address, company.phone_number)}>
                    Register</button></td>
                <td><button className="btn btn-danger ms-2" onClick={() => handleDelete(company.id, company.name)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="headingStaff">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseStaff"
          aria-expanded="false"
          aria-controls="collapseStaff"
        >
          Industry Supervisors
          <span className='badge bg-danger rounded-pill ms-2'>{Object.keys(industrySupervisor).length}</span>
        </button>
      </h2>
      <div
        id="collapseStaff"
        className="accordion-collapse collapse"
        aria-labelledby="headingStaff"
        data-bs-parent="#myAccordion"
      >
        <div className="accordion-body">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company ID</th>
              <th>Position</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {industrySupervisor.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.name}</td>
                <td>{staff.company_id}</td>
                <td>{staff.position}</td>
                <td>{staff.phone_number}</td>
                <td>{staff.email}</td>
                <td><button className="btn btn-primary ms-2"onClick={() => handleRegisterSupervisorI(staff.name, staff.email, staff.password, staff.phone_number, staff.company_id, staff.position)}>Register</button></td>
                <td><button className="btn btn-danger ms-2" onClick={() => handleDelete(staff.id, company.name)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>

    <div className="accordion-item">
      <h2 className="accordion-header" id="headingStudent">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseStudent"
          aria-expanded="false"
          aria-controls="collapseStudent"
        >
          School Supervisors
          <span className='badge bg-danger rounded-pill ms-2'>{Object.keys(schoolSupervisor).length}</span>
        </button>
      </h2>
      <div
        id="collapseStudent"
        className="accordion-collapse collapse"
        aria-labelledby="headingStudent"
        data-bs-parent="#myAccordion"
      >
        <div className="accordion-body">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Staff ID</th>
              <th>Email</th>
              <th>School</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {schoolSupervisor.map((curr) => (
              <tr key={curr.id}>
                <td>{curr.name}</td>
                <td>{curr.staff_id}</td>
                <td>{curr.email}</td>
                <td>{curr.school}</td>
                <td><button className="btn btn-primary ms-2"onClick={() => handleRegisterSupervisorS(curr.name, curr.staff_id, curr.email, curr.password, curr.school)}>Register</button></td>
                <td><button className="btn btn-danger ms-2" onClick={() => handleDelete(curr.id, company.name)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>

  </div>
  )
}

export default PendingProfile