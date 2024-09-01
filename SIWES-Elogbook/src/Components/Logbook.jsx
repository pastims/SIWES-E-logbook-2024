import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Outlet, Link } from "react-router-dom";

const Logbook = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [logbook, setLogbook] = useState([]);
  const {id} = useParams();
  logbook;

  useEffect(() => {
    axios.get(apiUrl + '/student/logbook/'+id)
    .then(result => {
        setLogbook(result.data[0])
    })
    .catch(err => console.log(err))
}, [])


  return (

    <div className="container-fluid">
      <div className="col flex-nowrap">
          <div className="d-flex flex-column align-items-centert px-3 pt-2 text-white">
            <div className="d-none d-lg-block mt-3">
            <ul
              className="d-flex flex-row nav nav-pills align-items-center justify-content-around mb-2 p-2 bg-success"
              id="menu"
            >
              {/* <li className="w-100"> */}
              <li className="border border-3 rounded">
                <Link
                  to={'/student_dashboard/'+id+'/logbook/view_week'}
                  className="nav-link text-white px-0 align-middle"
                >
                  <span className="p-2">View Logbook</span>
                </Link>
              </li>
              <li className="border border-3 rounded">
                <Link
                  to={'/student_dashboard/'+id+'/logbook/add_day'}
                  className="nav-link text-white px-0 align-middle"
                >
                  <span className="p-2">Add/Edit Daily Entry</span>
                </Link>
              </li>
              <li className="border border-3 rounded">
                <Link
                  to={'/student_dashboard/'+id+'/logbook/add_week'}
                  className="nav-link text-white px-0 align-middle"
                >
                  <span className="p-2">Add Week Entry</span>
                </Link>
              </li>
              <li className="border border-3 rounded">
                <Link
                  to={'/student_dashboard/'+id+'/logbook/edit_week'}
                  className="nav-link text-white px-0 align-middle"
                >
                  <span className="p-2">Edit Week Entry</span>
                </Link>
              </li>
              <li className="border border-3 rounded">
                <Link
                  to={'/student_dashboard/'+id+'/logbook/week_image'}
                  className="nav-link text-white px-0 align-middle"
                >
                  <span className="p-2">View Images</span>
                </Link>
              </li>
              <li className="border border-3 rounded">
                <Link
                  to={'/student_dashboard/'+id+'/logbook/add_week_image'}
                  className="nav-link text-white px-0 align-middle"
                >
                  <span className="p-2">Add Image</span>
                </Link>
              </li>
              
            </ul>
            </div>
            {/* Accordion for small screens */}
        <div className="col-12 d-lg-none mt-4">
          <div className="accordion" id="mobileLogbookSidebarAccordion">
            <div className="accordion-item bg-light">
              <h2 className="accordion-header" id="headingLogbook">
                <button className="accordion-button bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLogbook" aria-expanded="true" aria-controls="collapseLogbook">
                  <h5 className="text-white">LOGBOOK MENU</h5>
                </button>
              </h2>
              <div id="collapseLogbook" className="accordion-collapse collapse show" aria-labelledby="headingLogbook" data-bs-parent="#mobileLogbookSidebarAccordion">
                <div className="accordion-body bg-light text-center" data-bs-toggle="collapse" data-bs-target="#collapseLogbook">
                <Link
                  to={'/student_dashboard/'+id+'/logbook/view_week'}
                  className="nav-link p-2 bg-success text-white rounded mb-2"
                >
                  <span className="p-2">View Logbook</span>
                </Link>
                <Link
                  to={'/student_dashboard/'+id+'/logbook/add_day'}
                  className="nav-link p-2 bg-success text-white rounded mb-2"
                >
                  <span className="p-2">Add/Edit Daily Entry</span>
                </Link>
                <Link
                  to={'/student_dashboard/'+id+'/logbook/add_week'}
                  className="nav-link p-2 bg-success text-white rounded mb-2"
                >
                  <span className="p-2">Add Week Entry</span>
                </Link>
                <Link
                  to={'/student_dashboard/'+id+'/logbook/edit_week'}
                  className="nav-link p-2 bg-success text-white rounded mb-2"
                >
                  <span className="p-2">Edit Week Entry</span>
                </Link>
                <Link
                  to={'/student_dashboard/'+id+'/logbook/week_image'}
                  className="nav-link p-2 bg-success text-white rounded mb-2"
                >
                  <span className="p-2">View Images</span>
                </Link>
                <Link
                  to={'/student_dashboard/'+id+'/logbook/add_week_image'}
                  className="nav-link p-2 bg-success text-white rounded mb-2"
                >
                  <span className="p-2">Add Image</span>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        <div className="col p-0 m-0 mt-3">
            <div className="p-2 d-flex justify-content-center bg-warning">
                <h4>Week Entries</h4>
            </div>
            <Outlet />
        </div>
      </div>
    </div>

  );
};

export default Logbook;
