// import React from 'react'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const SubmitPending = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [company, setCompany] = useState({
        role: 'company',
        name: '',
        address: '',
        phone_number: '',
    })
    const [schoolSupervisor, setSchoolSupervisor] = useState({
        role: "school_supervisor",
        name: "",
        staff_id: "",
        email: "",
        password: "",
        school: "",
      });
    const [industrySupervisor, setIndustrySupervisor] = useState({
        role: "industry_supervisor",
        name: "",
        email: "",
        password: "",
        phone_number: "",
        company_id: "",
        position: "",
      });
    const navigate = useNavigate()
    const [activeForm, setActiveForm] = useState('industry-supervisor');
    const [companyInRecord, setCompanyInRecord] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState([]);
    const [inputQuery, setInputQuery] = useState('');
    const [displayedQuery, setDisplayedQuery] = useState('');
    const dropdownRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
      axios
        .get(apiUrl + "/auth/company")
        .then((result) => {
          if (result.data.Status) {
            setCompanyInRecord(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }, []);

    const filteredCompanies = companyInRecord.filter(companyInRecord =>
      companyInRecord.name.toLowerCase().includes(inputQuery.toLowerCase())
    );

    const handleSelect = (company) => {
      setDisplayedQuery(`${company.name} - ${company.address}`);
      setInputQuery('');
      setSelectedCompanyId(company.id);
      // setQuery(company.name);
      console.log(company.id)
      setIndustrySupervisor({ ...industrySupervisor, company_id: company.id })

      dropdownRef.current.classList.remove('show');
    }

    useEffect(() => {
      if (selectedCompanyId !== null) {
       (selectedCompanyId);
      }
    }, [selectedCompanyId]);

    const handleSubmitCompany = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('role', company.role);
        formData.append('name', company.name);
        formData.append('address', company.address);
        formData.append('phone_number', company.phone_number);
    
        // console.log(formData.entries());
    
        axios.post(apiUrl + '/employee/submit_company', company)
        .then(result => {
            if(result.data.Status) {
                navigate('/')
            } else {
                alert(result.data.Error);
                console.log(JSON.stringify(result.data.Error));
                console.log(JSON.stringify(result));
            }
        })
        .catch(err => console.log(err))
      }

    const handleSubmitSupervisorS = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('role', schoolSupervisor.role);
        formData.append('name', schoolSupervisor.name);
        formData.append('staff_id', schoolSupervisor.staff_id);
        formData.append('email', schoolSupervisor.email);
        formData.append('password', schoolSupervisor.password);
        formData.append('school', schoolSupervisor.school);
    
        // console.log(formData.entries());
    
        axios.post(apiUrl + '/employee/submit_school_supervisor', schoolSupervisor)
        .then(result => {
            if(result.data.Status) {
                navigate('/')
            } else {
                alert(result.data.Error);
                console.log(JSON.stringify(result.data.Error));
                console.log(JSON.stringify(result));
            }
        })
        .catch(err => console.log(err))
      }

    const handleSubmitSupervisorI = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('role', industrySupervisor.role);
        formData.append('name', industrySupervisor.name);
        formData.append('email', industrySupervisor.email);
        formData.append('password', industrySupervisor.password);
        formData.append('phone_number', industrySupervisor.phone_number);
        formData.append('company', industrySupervisor.company);
        formData.append('position', industrySupervisor.position);
    
        // console.log(formData.entries());
    
        axios.post(apiUrl + '/employee/submit_industry_supervisor', industrySupervisor)
        .then(result => {
            if(result.data.Status) {
                navigate('/')
            } else {
                alert(result.data.Error);
                console.log(JSON.stringify(result.data.Error));
                console.log(JSON.stringify(result));
            }
        })
        .catch(err => console.log(err))
      }

    const handleButtonClick = (formName) => {
    setActiveForm(formName);
    };

  return (
    <div className="loginPage">
  
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

  <section className="text-light mb-5">
    <h2 className="text-white text-center">Register Details for:</h2>

    <div className="d-flex flex-row gap-1 align-items-center justify-content-center">
    <button
        className={activeForm === 'company' ? 'active btn btn-primary text-light rounded mb-3 p-2' : 'btn btn-light text-primary rounded mb-3 p-2'}
        onClick={() => handleButtonClick('company')}
      >
        Company
      </button>
      <button
        className={activeForm === 'industry-supervisor' ? 'active btn btn-primary text-light rounded mb-3 p-2' : 'btn btn-light text-primary rounded mb-3 p-2'}
        onClick={() => handleButtonClick('industry-supervisor')}
      >
        Industry Supervisor
      </button>
      <button
        className={activeForm === 'school-supervisor' ? 'active btn btn-primary text-light rounded mb-3 p-2' : 'btn btn-light text-primary rounded mb-3 p-2'}
        onClick={() => handleButtonClick('school-supervisor')}
      >
        School Supervisor
      </button>
    </div>

      <div className="d-flex align-items-center justify-content-center">
        {activeForm === 'company' && (
            <div className="p-3 rounded-4 border loginForm" style={{maxWidth: '600px'}}>
            <h3 className="m-3">Company Form</h3>
            
            <form onSubmit={handleSubmitCompany}>
                <div className='mb-3'>
                    <label htmlFor="company_name"><strong>Company Name:</strong></label>
                    <input type="text" name='company_name' placeholder='Enter Company Name'
                     onChange={(e) => setCompany({...company, name: e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="company_address"><strong>Company Address:</strong></label>
                    <input type="text" name='company_address' placeholder='Enter Company Address'
                     onChange={(e) => setCompany({...company, address: e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="company_phone_number"><strong>Company Phone Number:</strong></label>
                    <input type="text" name='company_phone_number' placeholder='Enter Company Phone Number'
                     onChange={(e) => setCompany({...company, phone_number: e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Submit Company Details</button>
            </form>
                </div>
        )}
        {activeForm === 'industry-supervisor' && (
            <div className="p-3 rounded-4 border loginForm" style={{maxWidth: '600px'}}>
            <h3>Industry-Supervisor Form</h3>
            
            <form className="row g-1" onSubmit={handleSubmitSupervisorI}>
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
          <div className="col-12 position-relative">
            <label htmlFor="company" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="company"
              placeholder="Search for Company..."
              value={inputQuery || displayedQuery}
              onChange={(e) =>
                setInputQuery(e.target.value)
              }
              onFocus={() => {
                setInputQuery('');
                dropdownRef.current.classList.add('show');
              }}
              onBlur={() => setTimeout(() => dropdownRef.current.classList.remove('show'), 200)}
              onClick={() => inputRef.current.select()}
              ref={inputRef}
            />
            {(inputQuery || filteredCompanies.length === 0) && (
              <ul ref={dropdownRef} className="dropdown-menu w-100" 
            style={{
              display: 'block'
            }}>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <li key={company.id}>
                  <button className="dropdown-item" onMouseDown={() => handleSelect(company)}>
                  <strong>{company.name}</strong> - {company.address}
                  </button>
                </li>
              ))
            ) : (
              <li className="dropdown-item">No results found <br />
              <strong className="text-danger">Register Company first and wait for approval in 4 hours maximum</strong></li>
            )}
            </ul>
            )}
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
            <button type="submit" className="btn btn-success w-100">
              Submit Details
            </button>
          </div>
        </form>
                </div>
        )}
        {activeForm === 'school-supervisor' && (
            <div className="p-3 rounded-4 border loginForm" style={{maxWidth: '600px'}}>
            <h3>School Supervisor Form</h3>
            
            <form className="row g-1" onSubmit={handleSubmitSupervisorS}>
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
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-success w-100">
                Submit Details
            </button>
          </div>
        </form>
                </div>
        )}
      </div>
  </section>

<footer className="follow-footer start-footer w-100 bg-dark">
  <p className="text-light">&copy; 2024 - SIWES E-logbook <br /> Developed by Onoriode Timothy - IFS-18-5960</p>
</footer>
  </div>
  )
}


export default SubmitPending