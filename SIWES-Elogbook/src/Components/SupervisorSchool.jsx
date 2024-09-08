// import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axiosConfig";
// import { Link } from "react-router-dom";

const SupervisorSchool = () => {
  const [employee, setEmployee] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get(apiUrl + "/auth/school_supervisor")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // const handleLogout = () => {
  //   axios.get(apiUrl + '/school_supervisor/logout')
  //   .then(result => {
  //     if(result.data.Status) {
  //       localStorage.removeItem("valid")
  //       navigate('/')
  //     }
  //   }).catch(err => console.log(err))
  // }

  // const handleDelete = (id) => {
  //   axios.delete(apiUrl + '/auth/delete_employee/'+id)
  //   .then(result => {
  //       if(result.data.Status) {
  //           window.location.reload()
  //       } else {
  //           alert(result.data.Error)
  //       }
  //   })
  // } 

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>School Supervisors List</h3>
      </div>
      <Link to="/dashboard/add_school_supervisor" className="btn btn-warning">
        Add School Supervisor
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>School</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.name}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.school}</td>
                {/* <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
            <tr>
           
<div>
                {/* <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button> */}
            </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisorSchool;
