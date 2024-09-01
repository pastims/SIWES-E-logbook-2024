import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    matric_no: "",
    email: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', student.name);
    formData.append('matric_no', student.matric_no);
    formData.append('email', student.email);
    formData.append('category_id', student.category_id);

    // console.log(formData.entries());

    axios.post('http://localhost:3000/auth/add_student', student)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/student')
        } else {
            alert(result.data.Error);
            console.log(JSON.stringify(result.data.Error));
            console.log(JSON.stringify(result));
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Student</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Full Name"
              onChange={(e) =>
                setStudent({ ...student, name: e.target.value })
              }
            />
          </div>
          <label htmlFor="matric_no" className="form-label">
              Matric Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="matric_no"
              placeholder="Enter Matric Number: e.g AAA-12-1234"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, matric_no: e.target.value })
              }
            />
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) =>  setStudent({ ...student, category_id: e.target.value})}>
                  <option>Select Category</option>
              {category.map((c,a) => {
                return <option key={a} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
