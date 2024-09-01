import { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from "react-bootstrap";

const StudentLogin = () => {
    const [values, setValues] = useState({
        matric_no: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        const rin = values.matric_no.replace(/\//g,'-');
        values.matric_no = rin;
        console.log(rin)
        axios.post('http://localhost:3000/student/student_login', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                // navigate('/student_dashboard/')
                navigate('/student_dashboard/'+result.data.id)
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className=''>
  <Navbar bg="light" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand onClick={() => {navigate('/')}}>
        <img src="Images/itf-logo-large.png" alt="" className="itf_logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>
            <h2 className="text-danger">SIWES E-Logbook</h2>
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="text-danger">Log in as: </Nav.Link>
            <Nav.Link onClick={() => {navigate('/student_login')}} className="nav-item-right rounded">Student</Nav.Link>
            <Nav.Link onClick={() => {navigate('/industry_supervisor_login')}} className="nav-item-right rounded">Industry Supervisor</Nav.Link>
            <Nav.Link onClick={() => {navigate('/school_supervisor_login')}} className="nav-item-right rounded">School Supervisor</Nav.Link>
            <Nav.Link onClick={() => {navigate('/adminlogin')}} className="nav-item-right rounded">Admin</Nav.Link>
            <Nav.Link onClick={() => {navigate('/submit_pending')}} className="border border-3 border-success nav-item-register rounded">REGISTER</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='d-flex justify-content-center align-items-start mt-5 vh-100 loginPage'>
        <div className='p-3 rounded-4 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2>Student Login Page</h2>
                <Link to={'/'}>
                <button className='btn btn-danger rounded mb-2'>Back</button>
                </Link>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Matric Number:</strong></label>
                    <input type="text" name='matric_no' placeholder='e.g AAA-99-9999 or AAA/99/9999'
                     onChange={(e) => setValues({...values, matric_no : e.target.value})} className='form-control rounded'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded'/>
                </div>
                <button className='btn btn-success w-100 rounded mb-2'>Log in</button>
                <Link to={'/student_first_login'}>
                <button className='btn btn-warning w-100 rounded mb-2'>First Log in? Click here</button>
                </Link>
                {/* <div className='mb-1'> 
                    <input type="checkbox" name="tick" id="tick" className='me-2'/>
                    <label htmlFor="password">You are Agree with terms & conditions</label>
                </div> */}
            </form>
        </div>
        <footer className="footer w-100 bg-dark">
        <p className="text-light">&copy; 2024 - SIWES E-logbook <br /> Developed by Onoriode Timothy - IFS-18-5960</p>
        </footer>
        </div>
    </div>
  )
}

export default StudentLogin