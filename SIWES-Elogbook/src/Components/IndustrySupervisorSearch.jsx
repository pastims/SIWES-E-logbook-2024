// import React from 'react'
// import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig';

const IndustrySupervisorSearch = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams();
    const location = useLocation();
    const {id2} = location.state || {};
    const {compid} = location.state || {};
    // console.log(compid);
    id;
    // console.log(id);
    // console.log(id2);
    const [student, setStudent] = useState({
        name: "",
        matric_no: "",
        email: "",
        phone_number: "",
        school: "",
        course: "",
        start_date: "",
        company: "",
        image: "",
      })
    const [company, setCompany] = useState([])
    const [supComment, setSupComment] = useState({
        comment: "",
    })
    let arr = '';
    company;
    arr;

    const [week, setWeek] = useState({});

    useEffect(() => {

 axiosInstance.get(apiUrl + '/industry_supervisor/student/'+id2)
        .then(result => {
            // console.log(result)
            setStudent({
                ...student,
                // id: result.data.Result[0].id,
                name: result.data.Result[0].name,
                matric_no: result.data.Result[0].matric_no,
                email: result.data.Result[0].email,
                phone_number: result.data.Result[0].phone_number,
                school: result.data.Result[0].school,
                course: result.data.Result[0].course,
                start_date: result.data.Result[0].year_study,
                company: result.data.Result[0].company,
                image: result.data.Result[0].image,
            })
        }).catch(err => console.log(err))

        axiosInstance.get(apiUrl + '/industry_supervisor/get_company/'+ compid)
          .then(result => {
                console.log(result)
                console.log(result.data)
                // console.log(result.data.Result)
                setCompany(result.data[0]);
          }).catch(err => console.log(err))

        axiosInstance.get(apiUrl + '/industry_supervisor/view_week/'+id2)
        .then(result => {
            setWeek(result.data);
            // console.log(JSON.stringify(result.data))
        })
        .catch(err => console.log(err));
    }, [])
    arr = Object.values(week)

    const saveSupComment = (event, ids, no, com) => {
        event.preventDefault()
        const values = {
            student_id: ids,
            week_no: no,
            comment: com,
        }
        axiosInstance.post(apiUrl + '/industry_supervisor/save_supcomment', values)
        .then(result => {
            if(result.data.Status) {
                console.log(result.data)
                // navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
                console.log(result)
            }
        }).catch(err => console.log(err))
    }


  return (
      
      <div>
        <div className='d-flex row flex-wrap align-items-top'>
            <div className='col-md-4 mb-3 bg-light p-2 align-items-center justify-content-center'>
                <h3>Student Information</h3>
               
                    <div className="mt-3 mb-4">
                <table className='container-fluid d-flex align-items-center border border-3 border-info mb-4 rounded p-3'>
                    <tbody>
                        <tr>
                            <td className='row flex-nowrap'><div><img src={apiUrl + `/Student_Pics/`+student.image} className='student_search_image row flex-nowrap'/></div></td>
                            <td className='row flex-nowrap'>Name: {student.name}</td>
                            <td className='row flex-nowrap'>Matric Number: {student.matric_no}</td>
                            <td className='row flex-nowrap'>Email: {student.email}</td>
                            <td className='row flex-nowrap'>Phone Number: {student.phone_number}</td>
                            <td className='row flex-nowrap'>School: {student.school}</td>
                            <td className='row flex-nowrap'>Course: {student.course}</td>
                            <td className='row flex-nowrap'>Date Started: {student.start_date}</td>
                        </tr>
                    </tbody>
                </table>
                </div>

            </div>
            <div className='col-md-8 bg-secondary p-2'>
                <h3 className="text-center text-white">Logbook Activities</h3>
                <div className="mt-3">
                    {
                        arr.map((c,a) => (
                    <div className="mt-3" key={a}>
                    <table className="table">
                    <tbody>
                            <tr >
                                <th className='col-md-4'>Week Number</th>
                                <th className='col-auto'>{c.week_number}</th>
                            </tr>
                            <tr >
                                <th>Monday</th>
                                <td>{c.monday}</td>
                            </tr>
                            <tr >
                                <th>Tuesday</th>
                                <td>{c.tuesday}</td>
                            </tr>
                            <tr >
                                <th>Wednesday</th>
                                <td>{c.wednesday}</td>
                            </tr>
                            <tr >
                                <th>Friday</th>
                                <td>{c.friday}</td>
                            </tr>
                            <tr >
                                <th>Saturday</th>
                                <td>{c.saturday}</td>
                            </tr>
                            <tr >
                                <th>Week Project</th>
                                <td>{c.week_project}</td>
                            </tr>
                            <tr >
                                <th>Student Comment</th>
                                <td>{c.student_comment}</td>
                            </tr>
                            <tr >
                                <th>
                                    <span className='text-danger'>Industry Supervisor Comments</span> <br></br>
                                    <button className="btn btn-primary" onClick={(event) => saveSupComment(event, c.student_id, c.week_number, supComment.comment)}>
                                    Save
                                    </button>
                                    </th>
                                <td>
                                <div className="col-12">
            
                                <textarea
                                type="text"
                                rows="2"
                                className="form-control rounded-0"
                                id="sup-comment"
                                placeholder="Enter Week's Comment"
                                value={c.industry_supervisor_comment || ''}
                                maxLength="150"
                                onChange={(e) =>
                                    setSupComment({...supComment, comment: e.target.value })
                                }
                                />
                                </div>
                            </td>
                            </tr> 
                    </tbody>
            </table>
        </div>
                ))
              }
                   
                </div>
            </div>
        </div>
    </div>
    )
}


export default IndustrySupervisorSearch