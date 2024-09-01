import { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Navbar, Nav, Container } from "react-bootstrap";

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
                console.log(result)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className=''>
        <Navbar bg="light" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="/">
        <img src="Images/itf-logo-large.png" alt="" className="itf_logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
            <h2 className="text-danger">SIWES E-Logbook</h2>
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="text-danger">Log in as: </Nav.Link>
            <Nav.Link href="/student_login" className="nav-item-right rounded">Student</Nav.Link>
            <Nav.Link href="/industry_supervisor_login" className="nav-item-right rounded">Industry Supervisor</Nav.Link>
            <Nav.Link href="/school_supervisor_login" className="nav-item-right rounded">School Supervisor</Nav.Link>
            <Nav.Link href="/adminlogin" className="nav-item-right rounded">Admin</Nav.Link>
            <Nav.Link href="/submit_pending" className="border border-3 border-success nav-item-register rounded">REGISTER</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='d-flex justify-content-center align-items-start vh-100 loginPage'>
        <div className='p-3 rounded-4 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2>Admin Login Page</h2>
                <Link to={'/'}>
                <button className='btn btn-danger rounded mb-2'>Back</button>
                </Link>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                     onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded'/>
                </div>
                <button className='btn btn-success w-100 rounded mb-2'>Log in</button>
                {/* <div className='mb-1'> 
                    <input type="checkbox" name="tick" id="tick" className='me-2'/>
                    <label htmlFor="password">You are Agree with terms & conditions</label>
                </div> */}
            </form>
        </div>
        </div>
        <footer className="footer w-100 bg-dark">
        <p className="text-light">&copy; 2024 - SIWES E-logbook <br /> Developed by Onoriode Timothy - IFS-18-5960</p>
        </footer>
    </div>
  )
}

export default Login