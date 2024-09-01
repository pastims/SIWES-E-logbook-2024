import axios from "axios";
import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SupervisorIndustry = () => {
  const [employee, setEmployee] = useState([]);
//   const [company, setCompany] = useState([]);
  //   const navigate = useNavigate()
  
  useEffect(() => {
      axios
      .get("http://localhost:3000/auth/industry_supervisor")
      .then((result) => {
          if (result.data.Status) {
              setEmployee(result.data.Result);
        } else {
            alert(result.data.Error);
        }
    })
    .catch((err) => console.log(err));
    
    // axios
    // .get("http://localhost:3000/auth/company")
    // .then((result) => {
    //   if (result.data.Status) {
    //     setCompany(result.data.Result);
    //   } else {
    //     alert(result.data.Error);
    //   }
    // })
    // .catch((err) => console.log(err));
}, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Industry Supervisors List</h3>
      </div>
      <Link to="/dashboard/add_industry_supervisor" className="btn btn-primary">
        Add Industry Supervisor
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.name}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                {/* <td>{company[e.company_id].name}</td> */}
                <td>{e.company_id}</td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisorIndustry;
