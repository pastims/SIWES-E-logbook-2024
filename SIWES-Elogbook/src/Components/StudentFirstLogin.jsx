import { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from "react-bootstrap";

const StudentFirstLogin = () => {
    const [values, setValues] = useState({
        password: '',
        test_email: '',
        test_matric_no: '',
    }) 

    const [passwords, setPasswords] = useState({
        password: '',
        confirm_password: '',
        })
 
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const rin = values.test_matric_no.replace(/\//g,'-');
        values.test_matric_no = rin;
        if (passwords.password == passwords.confirm_password) {
            values.password = passwords.password;
            setError('');
            axios.put('http://localhost:3000/auth/student_first_login', values)
            .then(result => {
                if(result.data.Status) {
                        navigate('/student_login/')
                } else {
                    setError(result.data.Error)
                    console.log(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        } else {
            setError('Password do not match!')
        }
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
            <h2>Student Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                     onChange={(e) => setValues({...values, test_email : e.target.value})} className='form-control rounded'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="matric_no"><strong>Matric Number</strong></label>
                    <input type="text" name='text' autoComplete='off' placeholder='e.g AAA-99-9999 or AAA-99-9999'
                     onChange={(e) => setValues({...values, test_matric_no : e.target.value})} className='form-control rounded'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Enter Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setPasswords({...passwords, password : e.target.value})} className='form-control rounded'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Confirm Password:</strong></label>
                    <input type="password" name='confirm_password' placeholder='Confirm Password'
                     onChange={(e) => setPasswords({...passwords, confirm_password : e.target.value})} className='form-control rounded'/>
                </div>
                <button className='btn btn-success w-100 rounded mb-2'>Save</button>
            </form>
        </div>
        </div>
        <footer className="footer w-100 bg-dark">
        <p className="text-light">&copy; 2024 - SIWES E-logbook <br /> Developed by Onoriode Timothy - IFS-18-5960</p>
        </footer>
    </div>
  )
}

export default StudentFirstLogin