import axios from "axios";
import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Student = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [student, setStudent] = useState([]);
//   const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(apiUrl + "/auth/student")
      .then((result) => {
        if (result.data.Status) {
          setStudent(result.data.Result);
        } else {
          alert(result.data.Error);
        //   console.log(JSON.stringify(result.data.Error));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(apiUrl + '/auth/delete_student/'+id)
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
        <h3>Student List</h3>
      </div>
      <Link to="/dashboard/add_student" className="btn btn-success">
        Add Student
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Matric Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {student.map((e,a) => (
              <tr key={a}>
                <td>{e.name}</td>
                <td>{e.matric_no}</td>
                <td>{e.email}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_student/` + e.id}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
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

export default Student;
