import './App.css'
// import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Accounts from './Components/Accounts'
import Category from './Components/Category'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import Employee from './Components/Employee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import StudentLogin from './Components/StudentLogin'
import Student from './Components/Student'
import AddStudent from './Components/AddStudent'
import EditStudent from './Components/EditStudent'
import StudentFirstLogin from './Components/StudentFirstLogin'
import StudentDashboard from './Components/StudentDashboard'
import RegisterStudent from './Components/RegisterStudent'
import AddCompany from './Components/AddCompany'
import Company from './Components/Company'
import Logbook from './Components/Logbook'
import Week from './Components/Week'
import EditWeek from './Components/EditWeek'
import AddWeek from './Components/AddWeek'
import StudentProfile from './Components/StudentProfile'
import SupervisorIndustryLogin from './Components/SupervisorIndustryLogin'
import SupervisorSchoolLogin from './Components/SupervisorSchoolLogin'
import SupervisorSchool from './Components/SupervisorSchool'
import SupervisorIndustry from './Components/SupervisorIndustry'
import AddSchoolSupervisor from './Components/AddSchoolSupervisor'
import AddIndustrySupervisor from './Components/AddIndustrySupervisor'
import SupervisorSchoolPage from './Components/SupervisorSchoolPage'
import SupervisorIndustryPage from './Components/SupervisorIndustryPage'
import SchoolSupervisorSearch from './Components/SchoolSupervisorSearch'
import IndustrySupervisorSearch from './Components/IndustrySupervisorSearch'
import WeekImage from './Components/WeekImage'
import AddWeekImage from './Components/AddWeekImage'
import AddDay from './Components/AddDay'
import SubmitPending from './Components/SubmitPending'
import PendingProfile from './Components/PendingProfile'
import Unauthorized from './Components/Unauthorized'
import StudentForms from './Components/StudentForms'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/unauthorized' element={<Unauthorized />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/student_login' element={<StudentLogin />}></Route>
      <Route path='/student_first_login' element={<StudentFirstLogin />}></Route>
      <Route path='/industry_supervisor_login' element={<SupervisorIndustryLogin />}></Route>
      <Route path='/school_supervisor_login' element={<SupervisorSchoolLogin />}></Route>
      <Route path='/submit_pending' element={<SubmitPending />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
      <Route path='/school_supervisor_page/:id' element={
        <PrivateRoute requiredRole={"school_supervisor"}>
          <SupervisorSchoolPage />
        </PrivateRoute>

      }>
    <Route path={'/school_supervisor_page/:id'+'/search_result'} element={<SchoolSupervisorSearch />}></Route>

      </Route>
      <Route path='/industry_supervisor_page/:id' element={
        <PrivateRoute requiredRole={"industry_supervisor"}>
          <SupervisorIndustryPage />
        </PrivateRoute>

      }>
        <Route path={'/industry_supervisor_page/:id'+'/search_result'} element={<IndustrySupervisorSearch />}></Route>  

      </Route>

      {/* <Route path='register_student/:id' element={<RegisterStudent />}></Route> */}
      <Route path='/dashboard' element={
        <PrivateRoute requiredRole={"admin"}>
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/accounts' element={<Accounts />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/company' element={<Company />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/student' element={<Student />}></Route>
        <Route path='/dashboard/school_supervisor' element={<SupervisorSchool />}></Route>
        <Route path='/dashboard/industry_supervisor' element={<SupervisorIndustry />}></Route>
        <Route path='/dashboard/pending_profile' element={<PendingProfile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_company' element={<AddCompany />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/add_student' element={<AddStudent />}></Route>
        <Route path='/dashboard/add_school_supervisor' element={<AddSchoolSupervisor />}></Route>
        <Route path='/dashboard/add_industry_supervisor' element={<AddIndustrySupervisor />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/edit_student/:id' element={<EditStudent />}></Route>
        
      </Route>
    <Route path='/student_dashboard/:id' element={
      <PrivateRoute requiredRole={"student"}>
        <StudentDashboard />
      </PrivateRoute>
    }>
      <Route path={'/student_dashboard/:id'} element={<StudentProfile />}></Route>
      <Route path={'/student_dashboard/:id'+'/register_student'} element={<RegisterStudent />}></Route>
      <Route path={'/student_dashboard/:id'+'/student_forms'} element={<StudentForms />}></Route>
      {/* <Route path={'/student_dashboard/:id'+'/logbook'} element={<Logbook />}></Route>       */}
        <Route path={'/student_dashboard/:id'+'/logbook'} element={
          <PrivateRoute requiredRole={"student"}>
            <Logbook />
          </PrivateRoute>
        }>
          <Route path={'/student_dashboard/:id'+'/logbook/view_week'} element={<Week />}></Route>      
          <Route path={'/student_dashboard/:id'+'/logbook/add_week'} element={<AddWeek />}></Route>      
          <Route path={'/student_dashboard/:id'+'/logbook/add_day'} element={<AddDay />}></Route>      
          <Route path={'/student_dashboard/:id'+'/logbook/edit_week'} element={<EditWeek />}></Route>      
          <Route path={'/student_dashboard/:id'+'/logbook/week_image'} element={<WeekImage />}></Route>      
          <Route path={'/student_dashboard/:id'+'/logbook/add_week_image'} element={<AddWeekImage />}></Route>      

        </Route>
      {/* <Route path={'/student_dashboard/:id'+'/logbook/week'} element={<Week />}></Route>       */}

    </Route>


    </Routes>
    </BrowserRouter>
  )
}

export default App
