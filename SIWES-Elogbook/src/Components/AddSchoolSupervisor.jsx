import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSchoolSupervisor = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [schoolSupervisor, setSchoolSupervisor] = useState({
    name: "",
    staff_id: "",
    email: "",
    password: "",
    category_id: "",
    school: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(apiUrl + "/auth/category")
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
    formData.append('name', schoolSupervisor.name);
    formData.append('staff_id', schoolSupervisor.staff_id);
    formData.append('email', schoolSupervisor.email);
    formData.append('password', schoolSupervisor.password);
    formData.append('category_id', schoolSupervisor.category_id);
    formData.append('school', schoolSupervisor.school);

    axios.post(apiUrl + '/auth/add_school_supervisor', schoolSupervisor)
    .then(result => {
      console.log(result)
        if(result.data.Status) {
            navigate('/dashboard/school_supervisor')
        } else {
            alert(result.data.Error)
        }
    })
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add School Supervisor</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setSchoolSupervisor({ ...schoolSupervisor, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputStaffID" className="form-label">
              Staff ID
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputStaffID"
              placeholder="Enter Staff ID"
              onChange={(e) =>
                setSchoolSupervisor({ ...schoolSupervisor, staff_id: e.target.value })
              }
            />
          </div>
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
                setSchoolSupervisor({ ...schoolSupervisor, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setSchoolSupervisor({ ...schoolSupervisor, password: e.target.value })
              }
            />
            </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setSchoolSupervisor({...schoolSupervisor, category_id: e.target.value})}>
                    <option>Select Category</option>
              {category.map((c,a) => {
                return <option key={a} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="school" className="form-label">
              School
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="school"
              placeholder="Enter School Name"
              onChange={(e) =>
                setSchoolSupervisor({ ...schoolSupervisor, school: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add School Supervisor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolSupervisor;
