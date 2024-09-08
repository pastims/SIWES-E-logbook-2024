// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../axiosConfig";

const RegisterStudent = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [student, setStudent] = useState({
    course: "",
    year_study: "",
    address: "",
    phone_number: "",
    company: "",
    department: "",
    // industry_supervisor: "",
    date_start: "",
    // image: "",
  });
//   const {id} = useParams()
  const [company, setCompany] = useState([]);
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance.get(apiUrl + '/student/dashboard/'+id)
    .then(result => {
        setStudent(result.data[0])
    })
    .catch(err => console.log(err))
}, [])

  useEffect(() => {
    axiosInstance
      .get(apiUrl + "/student/company")
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
    formData.append('course', student.course);
    formData.append('year_study', student.year_study);
    formData.append('address', student.address);
    formData.append('phone_number', student.phone_number);
    formData.append('company', student.company);
    formData.append('department', student.department);
    // formData.append('industry_supervisor', student.industry_supervisor);
    formData.append('date_start', student.date_start);
    // formData.append('image', student.image);

    axiosInstance.put(apiUrl + '/student/register_student/' + id, student)
    .then(result => {
        if(result.data.Status) {
            navigate('/student_dashboard/' + id)
            console.log('works')
        } else {
            alert(result.data.Error)
            console.log('not works')
            console.log(result)
        }
    })
    .then(result => console.log(result.data))
    .catch(err => console.log(err))
  }


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded col-md-8 border">
        <h3 className="text-center">Complete Student Registration</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="Name"
              value={student.name}
              readOnly
            />
          </div>
          <div className="col-12">
            <label htmlFor="matric_no" className="form-label">
              Matric Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="matric_no"
              value={student.matric_no}
              readOnly
            />
          </div>
          <div className="col-12">
            <label htmlFor="Course" className="form-label">
              Course
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="Course"
              placeholder="Enter Course"
              onChange={(e) =>
                setStudent({ ...student, course: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="year_study" className="form-label">
              Year of Study
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="year_study"
              placeholder="Year of Study e.g 2024"
              onChange={(e) =>
                setStudent({ ...student, year_study: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="phone_number"
              placeholder="08012345678"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, phone_number: e.target.value })
              }
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <select name="company" id="company" className="form-select"
                onChange={(e) =>  setStudent({ ...student, company: e.target.value})}>
                  <option>Select Company</option>
              {company.map((c,a) => {
                return <option key={a} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="department"
              placeholder="Enter Department"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, department: e.target.value })
              }
            />
          </div>
          {/* <div className="col-12">
            <label htmlFor="industry_supervisor" className="form-label">
              Industry Supervisor
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="industry_supervisor"
              placeholder="Enter Industry Supervisor Name"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, industry_supervisor: e.target.value })
              }
            />
          </div> */}
          <div className="col-12 mb-3">
            <label htmlFor="phone_number" className="form-label">
              Start Date for SIWES
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="phone_number"
              placeholder="01-01-2024"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, date_start: e.target.value })
              }
            />
          </div>
          {/* <div className="col-12 mb-3">
            <label className="form-label" htmlFor="image">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="image"
              name="image"
              required
              onChange={(e) => setStudent({...student, image: e.target.files[0]})}
            />
          </div> */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
