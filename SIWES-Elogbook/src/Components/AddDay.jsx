import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddDay = () => {
    const {id} = useParams()
    // const [week, setWeek] = useState({});
    const [logEntry, SetLogEntry] = useState({
        week_number: "",
        type: "",
        entry: "",
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(logEntry)
        axios.post('http://localhost:3000/student/add_daily/'+id, logEntry)
        .then(result => {
            if(result.data.Status) {
                navigate('/student_dashboard/'+id+'/logbook/view_week')
            } else {
                alert(result.data.Error);
                console.log(JSON.stringify(result.data.Error));
                console.log(result);
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
      <div className="p-3 rounded border">
        <h3 className="text-center">Add or Edit Daily Activity</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
          <label htmlFor="week_number" className="form-label">
              Week Number
            </label>
            <select name="week_number" id="week_number" className="form-select"
                onClick={(e) =>SetLogEntry({...logEntry, week_number: e.target.value})}>
               <option value="" defaultValue={true}>Select Week</option>
               <option value="1">1</option>
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
          <label htmlFor="type" className="form-label">
              Choose Event or Day
            </label>
            <select name="type" id="type" className="form-select"
                onClick={(e) =>SetLogEntry({...logEntry, type: e.target.value})}>
               <option value="" defaultValue={true}>Select Event</option>
               <option value="monday" >Monday</option>
               <option value="tuesday">Tuesday</option>
               <option value="wednesday">Wednesday</option>
               <option value="thursday">Thursday</option>
               <option value="friday">Friday</option>
               <option value="saturday">Saturday</option>
               <option value="week_project">Week Project</option>
               <option value="student_comment">Student Comment</option>
            </select>
            </div>

          <div className="col-12">
            <label htmlFor="entry" className="form-label">
              Entry
            </label>
            <textarea
              type="text"
              rows="2"
              className="form-control rounded-0"
              id="entry"
              placeholder="Enter Activies"
            //   value={tempWeek.Tuesday}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, entry: e.target.value })
              }
            />
          </div>
        
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDay