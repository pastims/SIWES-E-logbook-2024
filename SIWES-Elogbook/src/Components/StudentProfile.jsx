// import React from 'react'
// import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig';

const StudentProfile = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    //   <div>StudentProfile</div>
    //   const [student, setStudent] = useState([])
    //   const {id} = useParams()
    //   const navigate = useNavigate()
    //   useEffect(() => {
    //       axios.get(apiUrl + '/student'+id)
    //       .then(result => {
    //           setEmployee(result.data[0])
    //       })
    //       .catch(err => console.log(err))
    //   }, [])

    const [student, setStudent] = useState([])
    // const [company, setCompany] = useState({})
    const [image, setImage] = useState({
        image: "",
    })
    const {id} = useParams()

    useEffect(() => {
        axiosInstance.get(apiUrl + '/student/dashboard/'+id)
        .then(result => {
            setStudent(result.data[0])
        })
        .catch(err => console.log(err))

        // axios.get(apiUrl + '/student/get_company/'+student.id)
        // .then(result => {
        //     console.log(result.data[0])
        //     setCompany(result.data[0])
        // })
        // .catch(err => console.log(err))
    }, [])

    const uploadToImgbb = (file) => {
        const formData = new FormData();
        formData.append('image', file); // 'image' is the key expected by Imgbb
    
        // Return a promise-based fetch request
        return fetch(`https://api.imgbb.com/1/upload?key=your_imgbb_api_key_here`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            if (data.success) {
                return data.data.url; // Resolve the promise with the image URL
            } else {
                return Promise.reject('Image upload failed'); // Reject if the upload fails
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            return Promise.reject(error); // Reject the error to handle outside the function
        });
    };

    const handleImageSubmit = (e) => {
        e.preventDefault()
        const file = image.image; // Get the first selected file
    if (!file) {
        console.error('No file selected');
        return;
    }

    // Call the upload function and handle it with .then and .catch
    uploadToImgbb(file)
        .then(imageUrl => {
            console.log('Image URL:', imageUrl); // Do something with the image URL
            // For example, display the image or save it to a database
        })
        .catch(error => {
            console.error('Upload failed:', error); // Handle the error
        });
      }

    // const handleImageSubmit = (e) => {
    //     e.preventDefault()
    //     const formData = new FormData();
    //     formData.append('image', image.image);
    
    //     axiosInstance.put(apiUrl + '/student/student_image/' + id, formData)
    //     .then(result => {
    //         if(result.data.Status) {
    //             console.log('works')
    //         } else {
    //             alert(result.data.Error)
    //             console.log('not works')
    //             console.log(result)
    //         }
    //     })
    //     .then(result => console.log(result.data))
    //     .catch(err => console.log(err))
    //   }
        
      
      return (
      <div>
          <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
              {/* <img src={apiUrl + `/Student_Pics/`+student.image} className='student_image' alt='Student Picture'/> */}
              <img src={student.image} className='student_image' alt='Student Picture'/>
              <div className='d-flex align-items-center flex-column mt-5'>
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Hello {student.name}!
              </span>
              <table className="table mb-4">
                    <tbody>
                            <tr >
                                <th>Matric Number</th>
                                <th>{student.matric_no}</th>
                            </tr>
                            <tr >
                                <th>Name</th>
                                <td>{student.name}</td>
                            </tr>
                            <tr >
                                <th>Email</th>
                                <td>{student.email}</td>
                            </tr>
                            <tr >
                                <th>Course</th>
                                <td>{student.course}</td>
                            </tr>
                            <tr >
                                <th>Phone Number</th>
                                <td>{student.phone_number}</td>
                            </tr>
                            <tr >
                                <th>Company</th>
                                <td>{student.company}</td>
                            </tr>
                            <tr >
                                <th>Department</th>
                                <td>{student.company_department}</td>
                            </tr> 
                    </tbody>
            </table>
              </div>

              

        <div className="col-8 mb-3 border border-3 border-success p-2">
            <label className="form-label" htmlFor="image">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="image"
              name="image"
              required
              onChange={(e) => setImage({image: e.target.files[0]})}
            />
        <button className='btn btn-primary m-4' onClick={handleImageSubmit}>Add/Change Image</button>
          </div>
          </div>
      </div>
      )
}

export default StudentProfile