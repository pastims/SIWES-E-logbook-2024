import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditWeek = () => {
    const {id} = useParams()
    const [week, setWeek] = useState({
      week_number: "",
    });
    const [logEntry, SetLogEntry] = useState({
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      week_project: "",
      student_comment: "",
      week_number: "",
    });
    // const week_numbering = ""
    const navigate = useNavigate();

  //   useEffect(() => {
  //     // const week_no = logEntry.week_number;
  //     axios.get('http://localhost:3000/student/view_week/'+ id)
  //     .then(result => {
  //         setWeek(result.data);
  //         // console.log(JSON.stringify(result.data))
  //     })
  //     .catch(err => console.log(err));
  // }, [])

  // const arr = Object.values(week);
  const parameters = {
    week_number: "",
  }
  // let pweek;

  const checkData = () => {
  
      parameters.week_number = week.week_number;
      console.log(parameters);
      axios.post('http://localhost:3000/student/get_week/'+ id, parameters)
      .then(result => {
        SetLogEntry({
          ...logEntry,
          monday: result.data[0].monday,
          tuesday: result.data[0].tuesday,
          wednesday: result.data[0].wednesday,
          thursday: result.data[0].thursday,
          friday: result.data[0].friday,
          saturday: result.data[0].saturday,
          week_project: result.data[0].week_project,
          student_comment: result.data[0].student_comment,
          week_number: parameters.week_number,
        })
      console.log(result.data);
      console.log(Error);
      })
      .catch(err => console.log(err));
      console.log(logEntry);
  }

    const handleSubmit = (e) => {
        e.preventDefault()
        // SetLogEntry({...logEntry, week_number: week.week_number})

        axios.post('http://localhost:3000/student/edit_week/'+id, logEntry)
        .then(result => {
            if(result.data.Status) {
                navigate('/student_dashboard/'+id+'/logbook/view_week')
            } else {
                alert(result.data.Error);
                console.log(JSON.stringify(result.data.Error));
                console.log(JSON.stringify(result));
                console.log(JSON.stringify(logEntry));
            }
        })
        .catch(err => console.log(err))
      }

    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded border"  style={{maxWidth: '600px'}}>
        <h3 className="text-center text-danger">Edit Week Entries</h3>
          <div className="col-12 mb-3">
          <label htmlFor="week_number" className="form-label">
              Week Number
            </label>
            <select name="week_number" id="week_number" className="form-select"
                onChange={(e) => setWeek({...week, week_number: e.target.value})}>
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
               <button className="btn btn-primary w-100" onClick={checkData}>
                  Get Week Details
              </button>
            </div>
        <form className="row g-1" onSubmit={handleSubmit}>

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
              value={logEntry.monday}
              maxLength="150"
              onChange={(e) =>
                SetLogEntry({...logEntry, monday: e.target.value })
              }
            />
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
              value={logEntry.tuesday}
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
              value={logEntry.wednesday}
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
              value={logEntry.thursday}
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
              value={logEntry.friday}
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
              value={logEntry.saturday}
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
              value={logEntry.week_project}
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
              className="form-control rounded-0 mb-3"
              id="student_comment"
              placeholder="Enter Student's Comment"
              value={logEntry.student_comment}
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

export default EditWeek