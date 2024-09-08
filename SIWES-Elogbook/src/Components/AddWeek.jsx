// import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../axiosConfig';

const AddWeek = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams()
    // const [week, setWeek] = useState({});
    const [logEntry, SetLogEntry] = useState({
        week_number: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        week_project: "",
        student_comment: "",
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance.post(apiUrl + '/student/add_week/'+id, logEntry)
        .then(result => {
            if(result.data.Status) {
                navigate('/student_dashboard/'+id+'/logbook/view_week')
            } else {
                alert(result.data.Error);
                console.log(JSON.stringify(result.data.Error));
                if (result.data.Error.code == "ER_DUP_ENTRY") {
                    alert("Duplicate entry inputted \nWeek already exists");
                }
                console.log(JSON.stringify(result));
                console.log(JSON.stringify(logEntry));
            }
        })
        .catch(err => console.log(err))
      }

    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded border" style={{maxWidth: '600px'}}>
        <h3 className="text-center">Input Week Activities</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
          <label htmlFor="week_number" className="form-label">
              Week Number
            </label>
            <select name="week_number" id="week_number" className="form-select"
                onClick={(e) =>SetLogEntry({...logEntry, week_number: e.target.value})}>
               <option value="" defaultValue={true}>Select Week</option>
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

          <div className="col-12">
            <label htmlFor="monday" className="form-label">
              Monday
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="monday"
              placeholder="Enter Monday Activities"
              // value={pweek}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, monday: e.target.value })
              }
            />
            {/* <div className="col-12 mt-3">
            <button className="btn btn-primary w-100">
              Save Monday Entry
            </button>
          </div>
            <hr /> */}
          </div>
          <div className="col-12">
            <label htmlFor="tuesday" className="form-label">
              Tuesday
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="tuesday"
              placeholder="Enter Tuesday Activies"
            //   value={tempWeek.Tuesday}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, tuesday: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="wednesday" className="form-label">
              Wednesday
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="wednesday"
              placeholder="Enter Wednesday Activities"
            //   value={tempWeek.Wednesday}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, wednesday: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="thursday" className="form-label">
              Thursday
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="thursday"
              placeholder="Enter Thursday Activities"
            //   value={tempWeek.Thursday}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, thursday: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="friday" className="form-label">
              Friday
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="friday"
              placeholder="Enter Friday Activities"
            //   value={tempWeek.Friday}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, friday: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="saturday" className="form-label">
              Saturday
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="saturday"
              placeholder="Enter Saturday Activities"
            //   value={tempWeek.Saturday}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, saturday: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="week_project" className="form-label">
              Project for the week
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="week_project"
              placeholder="Enter Week's Project"
            //   value={tempWeek.WeekProject}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, week_project: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="student_comment" className="form-label">
              Student Comment
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="student_comment"
              placeholder="Enter Student's Comment"
            //   value={tempWeek.WeekProject}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, student_comment: e.target.value })
              }
            />
          </div>
        
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Save Week Activities
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddWeek