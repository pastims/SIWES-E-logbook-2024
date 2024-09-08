import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { axiosInstance } from "../axiosConfig";
// useEffect

const Start = () => {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axiosInstance.get(apiUrl + '/verify')
    .then(result => {
      // console.log(result)
      if(result.data.Status) {
        if(result.data.role === "admin") {
          navigate('/dashboard')
        } else if(result.data.role === "school_supervisor") {
          navigate('/school_supervisor_page/'+result.data.id)
        } else if(result.data.role === "industry_supervisor") {
          navigate('/industry_supervisor_page/'+result.data.id)
        } else if(result.data.role === "student") {
          navigate('/student_dashboard/'+result.data.id)
        } else if(result.data.role === "employee") {
          navigate('/employee_detail/'+result.data.id)
        } else {
          navigate('/')
        }
      } else {
        navigate('/')
      }
    }).catch(err =>console.log(err))
  }, [])

  return (
    // <div className="d-flex justify-content-center align-items-center flex-column gap-5 vh-100 loginPage">
    <div className="loginPage">
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a className="navbar-brand" href="/">
      <div className="">
        <img src="Images/itf-logo-large.png" alt="" className="itf_logo"/>
      </div>
    <h2 className="text-danger">SIWES E-Logbook</h2>
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
        <button type="button" className="nav-link" onClick={() => {navigate('/student_login')}}>
            Student
          </button>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={() => {navigate('/industry_supervisor_login')}}>
            Industry Supervisor
          </button>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={() => {navigate('/school_supervisor_login')}}>
            School Supervisor
          </button>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={() => {navigate('/adminlogin')}}>
            Admin
          </button>
        </li>
      </ul>
    </div>
  </nav> */}

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
  
  <section className="hero-container">
  <div className="hero mt-5 text-light text-small col-md-8 p-4">
    <div className="d-none d-lg-block">
    <br /><br /><br />
      </div>
    <h2>Welcome to the SIWES E-Logbook Portal!</h2>
    <p>The Student Industrial Work Experience Scheme (SIWES) E-Logook allows you to easily document your daily tasks,
      track your progress, and receive feedback from your supervisors - all in one convenient platform.
    </p>
    <p>Whether you are working in Nigeria or abroad, our digital logbook ensures your learning is well-organised and accessible.
      Start recording your journey today and document your experience that SIWES offers.
    </p>
    <button type="button" className="btn btn-light text-danger rounded mb-3" onClick={() => {navigate('/student_login')}}>
            Login in as Student
          </button>
      <p>
      Click below to register new companies, school and industry superivisors.
    </p>
    <button type="button" className="btn bg-danger text-light rounded" onClick={() => {navigate('/submit_pending')}}>
            Enter New Registration
          </button>
  </div>
    </section>
  <footer className="start-footer footer w-100 bg-dark">
    <p className="text-light">&copy; 2024 - SIWES E-logbook <br /> Developed by Onoriode Timothy - IFS-18-5960</p>
  </footer>
    </div>
  );
};

export default Start;
