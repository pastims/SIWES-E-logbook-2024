// import axios from 'axios'
import { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig';

const Week = () => {
    const { id } = useParams()
    const [week, setWeek] = useState({});
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    
    useEffect(() => {
        axiosInstance.get(apiUrl + '/student/view_week/'+id)
        .then(result => {
            setWeek(result.data);
            // console.log(JSON.stringify(result.data))
        })
        .catch(err => console.log(err));
    }, [])
    const arr = Object.values(week)


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded border logbook-table"  style={{maxWidth: '600px'}}>
                <h3 className="text-center">Logbook Activities</h3>
                <div className=" mt-3">
                    {
                        arr.map((c,a) => (
                    <div className="mt-3" key={a}>
                    <table className="table">
                    <tbody>
                            <tr >
                                <th className='col-sm-4'>Week Number</th>
                                <th className='col-sm-8'>{c.week_number}</th>
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
                   
                </div>
            </div>
        </div>
    )
}

export default Week