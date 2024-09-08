// import axios from 'axios'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../axiosConfig';

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [adminTotal, setAdminTotal] = useState(0)
  const [studentTotal, setStudentTotal] = useState(0)
  const [schoolSupervisorTotal, setSchoolSupervisorTotal] = useState(0)
  const [industrySupervisorTotal, setIndustrySupervisorTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [pendingTotal, setPendingTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [companyTotal, setCompanyTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    companyCount();
    studentCount();
    schoolSupervisorCount();
    industrySupervisorCount();
    pendingCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axiosInstance.get(apiUrl + '/auth/admin_records')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
         alert(result.data.Error)
      }
    })
  }
  const adminCount = () => {
    axiosInstance.get(apiUrl + '/auth/admin_count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }
  const employeeCount = () => {
    axiosInstance.get(apiUrl + '/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const companyCount = () => {
    axiosInstance.get(apiUrl + '/auth/company_count')
    .then(result => {
      if(result.data.Status) {
        setCompanyTotal(result.data.Result[0].company)
      }
    })
  }
  const studentCount = () => {
    axiosInstance.get(apiUrl + '/auth/student_count')
    .then(result => {
      if(result.data.Status) {
        setStudentTotal(result.data.Result[0].student)
      }
    })
  }
  const schoolSupervisorCount = () => {
    axiosInstance.get(apiUrl + '/auth/school_supervisor_count')
    .then(result => {
      if(result.data.Status) {
        setSchoolSupervisorTotal(result.data.Result[0].school_supervisor)
      }
    })
  }
  const industrySupervisorCount = () => {
    axiosInstance.get(apiUrl + '/auth/industry_supervisor_count')
    .then(result => {
      if(result.data.Status) {
        setIndustrySupervisorTotal(result.data.Result[0].industry_supervisor)
      }
    })
  }
  const pendingCount = () => {
    axiosInstance.get(apiUrl + '/auth/pending_count')
    .then(result => {
      if(result.data.Status) {
        setPendingTotal(result.data.Result[0].pending_details)
      }
    })
  }
  const salaryCount = () => {
    axiosInstance.get(apiUrl + '/auth/salary_count')
    .then(result => {
      if(result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp)
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3 d-none'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>School Supervisors</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{schoolSupervisorTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Industry Supervisors</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{industrySupervisorTotal}</h5>
          </div>
        </div>
      </div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Students</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Company</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{companyTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border border-danger border-3 shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4 className='text-danger'>Pending Profiles</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5 className='text-danger'>{pendingTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(a => (
                <tr key={a}>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm" >
                    Delete
                  </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home