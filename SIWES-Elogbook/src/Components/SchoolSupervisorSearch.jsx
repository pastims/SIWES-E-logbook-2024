// import React from 'react'
// import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig';

const SchoolSupervisorSearch = () => {
    const {id} = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
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
        course: "",
        start_date: "",
        company: "",
        image: "",
      })
    const [company, setCompany] = useState([])
    const [weekImages, setWeekImages] = useState([])
    const [supComment, setSupComment] = useState({
        comment: "",
    })
    let arr = '';
    company;
    arr;

    const [week, setWeek] = useState({});

    useEffect(() => {

        axiosInstance.get(apiUrl + '/school_supervisor/student/'+id2)
        .then(result => {
            // console.log(result)
            setStudent({
                ...student,
                // id: result.data.Result[0].id,
                name: result.data.Result[0].name,
                matric_no: result.data.Result[0].matric_no,
                email: result.data.Result[0].email,
                phone_number: result.data.Result[0].phone_number,
                course: result.data.Result[0].course,
                start_date: result.data.Result[0].year_study,
                company: result.data.Result[0].company,
                image: result.data.Result[0].image,
                school_supervisor_comment: result.data.Result[0].school_supervisor_comment,
            })
        }).catch(err => console.log(err))

        if (compid) {
            axiosInstance.get(apiUrl + '/school_supervisor/get_company/'+ compid)
              .then(result => {
                    console.log(result)
                    console.log(result.data)
                    // console.log(result.data.Result)
                    setCompany(result.data[0]);
              }).catch(err => console.log(err))
        }

        axiosInstance.get(apiUrl + '/school_supervisor/view_week/'+id2)
        .then(result => {
            setWeek(result.data);
            // console.log(JSON.stringify(result.data))
        })
        .catch(err => console.log(err));
    
        axiosInstance.get(apiUrl + '/school_supervisor/get_week_image/'+id2)
        .then(result => {
            setWeekImages(result.data);
            // console.log(JSON.stringify(result.data))
        })
        .catch(err => console.log(err));
    }, [])

    arr = Object.values(week);
    const arrImage = Object.values(weekImages);


    const saveSupComment = (event, ids, com) => {
        event.preventDefault()
        const values = {
            student_id: ids,
            comment: com,
        }
        axiosInstance.post(apiUrl + '/school_supervisor/save_supcomment', values)
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
        <div className='d-flex justify-content-between flex-row flex-wrap align-items-top'>
            <div className='col-md-4 mb-3 bg-light p-2'>
                <h3>Student Information</h3>
               
                    <div className="mt-3 mb-4 ">
                <table className='container-fluid d-flex align-items-center border border-3 border-info mb-4 rounded p-3'>
                    <tbody>
                        <tr>
                            <td className='row flex-nowrap'><div>
                                <img src={student.image} className='student_search_image row flex-nowrap' alt='Image Missing'/>
                                </div></td>
                            <td className='row flex-nowrap'>Name: {student.name}</td>
                            <td className='row flex-nowrap'>Matric Number: {student.matric_no}</td>
                            <td className='row flex-nowrap'>Email: {student.email}</td>
                            <td className='row flex-nowrap'>Phone Number: {student.phone_number}</td>
                            <td className='row flex-nowrap'>Course: {student.course}</td>
                            <td className='row flex-nowrap'>Date Started: {student.start_date}</td>
                            <hr></hr>
                            <td className='row flex-nowrap text-danger'><b>School Supervisor Comment: {student.school_supervisor_comment}</b></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className='border border-3 border-success mb-4 rounded p-3'>
                <h3>Company Attended Information</h3>
                {/* {
                        company.map((c,a) => ( */}
                    <div className="mt-3">
                <table>
                    <tbody>
                        <tr>
                            <td><b>Name:</b> {company.name || ""}</td>
                        </tr>
                        <tr>
                            <td><b>Address:</b> {company.address || ""}</td>
                        </tr>
                        <tr>
                            <td><b>Phone Number:</b> {company.phone_number || ""}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                        {/* )
                    )} */}
                </div>

            <div className="col-12 border border-3 border-warning p-3 bg-light">
            <label htmlFor="supcomment" className="form-label">
              <h4>Give Supervisor Comment</h4>
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0 mb-3"
              id="supcomment"
              placeholder="Enter Comment"
              // value={pweek}
              maxLength="150"
              onChange={(e) =>
                setSupComment({...supComment, comment: e.target.value })
            }
            />
            <button className="btn btn-primary" onClick={(event) => saveSupComment(event, id2, supComment.comment)}>
            Save
            </button>
          </div>
            </div>
            <div className='col bg-secondary w-100'>
                <h3 className="text-center text-light mt-3">Logbook Activities</h3>
                <div className="mt-3">
                    {
                        arr.map((c,a) => (
                    <div className="mt-3" key={a}>
                    <table className="table">
                    <tbody>
                            <tr >
                                <th className='col-md-4'>Week Number</th>
                                <th>{c.week_number}</th>
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
                            <tr className='mb-4 border border-3 border-primary'>
                                <th className='bg-primary text-light'>Industry Supervisor Comments</th>
                                <td className='text-danger'>{c.industry_supervisor_comment}</td>
                            </tr> 
                    </tbody>
            </table>
            
        </div>
                ))
              }
                   <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
              <div className='d-flex align-items-center w-100 flex-column mt-5 border'>
              <span className="fs-5 fw-bolder text-light">
                Week Images
              </span>
              <div className='d-flex gap-4 justify-content-around flex-wrap'>
              {
                        arrImage.map((c,a) => (
                    <div className="mt-3" key={a}>
                    <table className="table">
                    <tbody>
                            <tr>
                                <td>Week {c.week_number}<br />
                                <img src={c.week_image} className='week_image' alt='Image not available'/></td>
                                {/* <img src={/apiUrl + `/Week_Pics/`+ c.week_image} className='week_image'/></td> */}
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
            </div>
        </div>
    </div>
    )
}

export default SchoolSupervisorSearch