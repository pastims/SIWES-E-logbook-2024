// import React from 'react'
// import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Outlet, Link } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig';

const SupervisorIndustryPage = () => {
      
    const {id} = useParams()

    // const token = localStorage.getItem('authToken');
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [supervisorI, setSupervisorI] = useState([])
    const [searchStudent, setSearchStudent] = useState({
        // name: "",
        matric_no: "",
      })
    const [student, setStudent] = useState({
        id: "",
        matric_no: "",
    })
    const [company, setCompany] = useState([])
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        axiosInstance.get(apiUrl + '/industry_supervisor/get_detail/'+id)
        .then(result => {
            setAuthorized(true);
            setSupervisorI(result.data[0]);
            setback(get_company(result.data[0].company_id));
        })
        .catch(err => {
          console.log(err);
          if (err == 'Internal Server Error') {setAuthorized(false)}
        })
    }, []);

    function setback(callback, message) {
      setTimeout(callback(message), 4000);
    }
      
    const get_company = (message) => {
      axiosInstance.get(apiUrl + '/industry_supervisor/get_company/'+ message)
            .then(result => {
                  console.log(result)
                  // console.log(result.data)
                  // console.log(result.data.Result)
                  setCompany(result.data[0]);
            }).catch(err => console.log(err))
    }

    const handleSearch = (e) => {
        e.preventDefault();
        // search student
        let st_id;
        axiosInstance.post(apiUrl + '/industry_supervisor/search_student', searchStudent)
            .then(result => {
                if (result.data.Status) {
                    st_id = result.data.Result[0].id;
                    const st_mat = result.data.Result[0].matric_no;
                    const company = result.data.Result[0].company;
                    console.log(st_mat, st_id);
                    setStudent({
                        ...student,
                        id: st_id,
                        matric_no: st_mat,
                        company: company,
                    })
                
                    console.log('works') 
                    console.log(JSON.stringify(student)) 
                    //   const stutID = student.id;
                    navigate('/industry_supervisor_page/'+id+'/search_result', {state: {id2: st_id, compid: company}});
                } else {
            alert(result.data.Error);
            console.log('not works')
        }
    })
    .catch((err) => console.log(err));
};

    const handleLogout = () => {
        axiosInstance.get(apiUrl + '/industry_supervisor/logout')
        .then(result => {
          if(result.data.Status) {
            localStorage.removeItem("valid")
            localStorage.removeItem("isAuthenticated")
            localStorage.removeItem("userRole")
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            navigate('/')
          }
        }).catch(err => console.log(err))
      };

    
  return (
    <div>
        { authorized ? (
        <div><div className="p-2 d-flex justify-content-center shadow mb-4">
            <h4>Industry Supervisor Dashboard</h4>
        </div>
            <h6 className='row mb-3 bg-success text-light p-2 m-3'>Company: {company.name}</h6>
        <div className='d-flex justify-content-center align-items-center m-3'>
          <div className="row w-100 justify-content-around">
                <h6 className='col-md-3 bg-primary text-light p-2'>Name: {supervisorI.name}</h6>
                <h6 className='col-md-3 bg-secondary text-light p-2'>Email: {supervisorI.email}</h6>
                <h6 className='col-md-3 bg-primary text-light p-2'>Phone Number: {supervisorI.phone_number}</h6>
                <button className='col-auto btn btn-danger mb-3' onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="d-flex flex-column m-3 bg-light border border-4 border-secondary p-4 mt-5">
        <form className="d-flex row justify-content-start align-items-center" onSubmit={handleSearch}>
          <div className='col-md-6 mb-3'>
          <label htmlFor="search_matric_no" className="form-label">
              Matric Number
            </label>
            <input
              type="text"
              className="form-control rounded-0 border border-2"
              id="search_matric_no"
              placeholder="Search by Matric Number"
              onChange={(e) =>
                setSearchStudent({ ...searchStudent, matric_no: e.target.value.toString().toUpperCase() })
              }
            />
          </div>
          <div className="col-md-6 align-items-center">
            <div className="d-flex row justify-content-start">
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Search Student
            </button>
          </div>
          <div className="col">
            <Link
                  to={'/industry_supervisor_page/'+id}
                  className="nav-link text-white px-0 align-middle"
                >
                  <button type="button" className="btn btn-danger">
              Reset
            </button>
                </Link>
          </div>
            </div>
          </div>
        </form>
        </div>
        <div className="row p-0 m-0">
            <div className="p-2 mb-3 d-flex justify-content-center bg-warning">
                <h4>Search Results</h4>
            </div>
            <Outlet />
        </div></div>
      ) : (
      // <p>You are not authorized to view this page, go to home</p>
      <div className="container d-flex flex-column text-center align-items-center justify-content-center vh-100">
        <div className=""><i className="bi bi-x text-danger m-0 p-0" style={{fontSize: "100px"}}></i></div>
        <h1 className="text-danger mb-3">You are not authorized to view this page! <br /> Go back or login again to continue</h1>
        <button type="button" className="btn bg-danger text-light rounded" onClick={handleLogout}>
            Go to Home
          </button>
    </div>
    )}
    </div>
  )
}

export default SupervisorIndustryPage