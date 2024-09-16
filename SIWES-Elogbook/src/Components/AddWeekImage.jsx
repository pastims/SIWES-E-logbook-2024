// import React from 'react'
// import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig';


const AddWeekImage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams();
    const [WeekImage, setWeekImage] = useState({
        week_no: "",
        image: "",
    });
    const navigate = useNavigate();

    const uploadToImgbb = (file) => {
      const formData = new FormData();
      formData.append('image', file); // 'image' is the key expected by Imgbb
  
      // Return a promise-based fetch request
      return fetch(`https://api.imgbb.com/1/upload?key=689383609c5f170bdc6f66c6bfd1e996`, {
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
      const file = WeekImage.image; // Get the first selected file
  if (!file) {
      console.error('No file selected');
      return;
  }

  // Call the upload function and handle it with .then and .catch
  uploadToImgbb(file)
      .then(imageUrl => {
          console.log('Image URL:', imageUrl); // Do something with the image URL
          const week_no = WeekImage.week_no;
          axiosInstance.put(apiUrl + '/student/add_week_image_save/' + id, {imageUrl, week_no})
        .then(result => {
            if(result.data.Status) {
                console.log('works')
                console.log(result)
                // alert('Wait!')
                navigate('/student_dashboard/'+id+'/logbook/week_image')
            } else {
                alert(result.data.Error)
                console.log('not works')
                console.log(result)
            }
        })
        .then(result => console.log(result.data))
        .catch(err => console.log(err))
          // For example, display the image or save it to a database
      })
      .catch(error => {
          console.error('Upload failed:', error); // Handle the error
      });
    }

    // const handleImageSubmit = (e) => {
    //     e.preventDefault()
    //     // console.log(WeekImage.week_no);
    //     // console.log(WeekImage.image);
    //     console.log(WeekImage);
    //     const formData = new FormData();
    //     formData.append('week_no', WeekImage.week_no);
    //     formData.append('image', WeekImage.image);
    
    //     axiosInstance.put(apiUrl + '/student/add_week_image/' + id, formData)
    //     .then(result => {
    //         if(result.data.Status) {
    //             console.log('works')
    //             console.log(result)
    //             // alert('Wait!')
    //             navigate('/student_dashboard/'+id+'/logbook/week_image')
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
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded border"  style={{maxWidth: '600px'}}>
        <h3 className="text-center">Input Week Image</h3>
          <div className="col-12">
          <label htmlFor="week_number" className="form-label">
              Week Number
            </label>
            <select name="week_number" id="week_number" className="form-select"
                onChange={(e) => setWeekImage({...WeekImage, week_no: e.target.value})}>
               <option value="">Select Week</option>
               <option value="1" >1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
               <option value="6">6</option>
               <option value="7">7</option>
               <option value="8">8</option>
               <option value="9">9</option>
               <option value="10">10</option>
               <option value="11">11</option>
               <option value="12">12</option>
               <option value="13">13</option>
               <option value="14">14</option>
               <option value="15">15</option>
               <option value="16">16</option>
            </select>
            </div>

          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="image">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="image"
              name="image"
              required
              onChange={(e) => setWeekImage({...WeekImage, image: e.target.files[0]})}
            />
          </div>
          <div className='col-12'>
            <button className='btn btn-primary w-100' onClick={handleImageSubmit}>Add Image</button>
          </div>
      </div>
    </div>
  )
}

export default AddWeekImage