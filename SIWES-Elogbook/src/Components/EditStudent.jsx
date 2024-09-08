// import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig';

const EditStudent = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams()
    const [student, setStudent] = useState({
        name: "",
        matric_no: "",
        email: "",
        category_id: "",
      });
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
        axiosInstance.get(apiUrl + '/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axiosInstance.get(apiUrl + '/auth/student/'+id)
        .then(result => {
            setStudent({
                ...student,
                // id: result.data.Result[0].id,
                name: result.data.Result[0].name,
                matric_no: result.data.Result[0].matric_no,
                email: result.data.Result[0].email,
                category_id: result.data.Result[0].category_id,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance.put(apiUrl + '/auth/edit_student/'+id, student)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/student')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit student</h3>
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
              value={student.name}
              onChange={(e) =>
                setStudent({ ...student, name: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label htmlFor="inputMatric" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputMatric"
              placeholder="Enter Matric Number"
              autoComplete="off"
              value={student.matric_no}
              onChange={(e) =>
                setStudent({ ...student, matric_no: e.target.value })
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
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setStudent({...student, category_id: e.target.value})}>
                  <option>Select Category</option>
              {category.map((c,a) => {
                return <option key={a} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudent