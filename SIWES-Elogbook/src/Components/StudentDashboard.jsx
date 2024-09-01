// import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const StudentDashboard = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [student, setStudent] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(apiUrl + '/student/dashboard/'+id)
        .then(result => {
            setStudent(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])

  const handleLogout = () => {
    axios.get(apiUrl + '/student/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        result.data.Status = false;
        navigate('/')
      }
    })
  }
  return (
    <div className="container-fluid">
      <div className="row flex flex-wrap">
        <div className="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-info d-none d-lg-block sideBar">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Hello {student.name}!
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to={'/student_dashboard/' + id}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Student Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={'/student_dashboard/'+id+'/register_student'}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-ui-checks ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Registration
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={"/student_dashboard/"+id+"/logbook"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-book ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Logbook
                  </span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
          <div className="col-12 d-lg-none mb-3 mt-3">
          <div className="accordion" id="mobileSidebarAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <h5>STUDENT MENU</h5>
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#mobileSidebarAccordion">
                <div className="accordion-body bg-info text-white" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <Link to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none" >
              <span className="fs-5 fw-bolder"> Hello {student.name}! </span>
            </Link>
                <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu" >
              <li className="w-100 text-danger">
                <Link
                  to={'/student_dashboard/' + id}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-4">Student Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={'/student_dashboard/'+id+'/register_student'}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-ui-checks ms-2"></i>
                  <span className="ms-4">Registration</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={"/student_dashboard/"+id+"/logbook"}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-book ms-2"></i>
                  <span className="ms-4">Logbook</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-4">Logout</span>
                </Link>
              </li>
            </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex bg-secondary justify-content-center shadow">
                <h4 className="text-light">SIWES Logbook System</h4>

            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
