// import React from 'react'
// import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig'

const WeekImage = () => {
    const {id} = useParams()
    const [weekImages, setWeekImages] = useState([])
    const apiUrl = import.meta.env.VITE_API_BASE_URL

    useEffect(() => {
        axiosInstance.get(apiUrl + '/student/get_week_image/'+id)
        .then(result => {
            setWeekImages(result.data);
            // console.log(JSON.stringify(result.data))
        })
        .catch(err => console.log(err));
    }, [])

    const arrImage = Object.values(weekImages)
    
  return (
    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
              <div className='d-flex align-items-center w-100 flex-column mt-5 border'>
              <span className="fs-5 fw-bolder">
                Week Images
              </span>
              {/* {
                        arrImage.map((c,a) => (
                    <div className="mt-3" key={a}>
                    <table className="table">
                    <tbody>
                            <tr >
                                <th>Week {c.week_number}</th>
                                <th><img src={apiUrl + `/Week_Pics/`+ c.week_image} className='week_image'/></th>
                            </tr>
                    </tbody>
            </table>
        </div>
                ))
              } */}
              </div>
              <div className='d-flex gap-2 justify-content-around flex-wrap'>
              {
                        arrImage.map((c,a) => (
                    <div className="mt-3 col" key={a}>
                    <table className="table">
                    <tbody>
                            <tr>
                                <td>Week {c.week_number}<br />
                                <img src={apiUrl + `/Week_Pics/`+ c.week_image} className='week_image'/></td>
                            </tr>
                    </tbody>
            </table>
        </div>
                ))
              }
              </div>
              </div>
              
  )
}

export default WeekImage