import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddIndustrySupervisor = () => {
  const [industrySupervisor, setIndustrySupervisor] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    category_id: "",
    company_id: "",
    position: "",
  });
  const [category, setCategory] = useState([]);
  const [company, setCompany] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/company")
      .then((result) => {
        if (result.data.Status) {
          setCompany(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', industrySupervisor.name);
    formData.append('email', industrySupervisor.email);
    formData.append('password', industrySupervisor.password);
    formData.append('phone_number', industrySupervisor.phone_number);
    formData.append('category_id', industrySupervisor.category_id);
    formData.append('company_id', industrySupervisor.company_id);
    formData.append('position', industrySupervisor.position);

    axios.post('http://localhost:3000/auth/add_industry_supervisor', industrySupervisor)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/industry_supervisor')
        } else {
            alert(result.data.Error)
            console.log(result.data)
            console.log(formData)
            console.log(industrySupervisor)
        }
    })
    .then(result => console.log(result.data))
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Industry Supervisor</h3>
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
                setIndustrySupervisor({ ...industrySupervisor, name: e.target.value })
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
                setIndustrySupervisor({ ...industrySupervisor, email: e.target.value })
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
                setIndustrySupervisor({ ...industrySupervisor, password: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              onChange={(e) =>
                setIndustrySupervisor({ ...industrySupervisor, phone_number: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setIndustrySupervisor({...industrySupervisor, category_id: e.target.value})}>
                    <option>Select Category</option>
              {category.map((c,a) => {
                return <option key={a} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <select name="company_id" id="company" className="form-select"
                onChange={(e) =>  setIndustrySupervisor({ ...industrySupervisor, company_id: e.target.value})}>
                    <option>Select Company</option>
              {company.map((c,a) => {
                return <option key={a} value={c.id}>{c.name}</option>
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="rankPosition" className="form-label">
              Position or Rank Held
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="rankPosition"
              placeholder="Enter Position or Rank"
              onChange={(e) =>
                setIndustrySupervisor({ ...industrySupervisor, position: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Industry Supervisor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIndustrySupervisor;
