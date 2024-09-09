// import React from 'react'
import { Link } from "react-router-dom"

const StudentForms = () => {

  return (
    <div>
          <div className='d-flex justify-content-center flex-column align-items-center mt-3 p-3'>
            <h3>Student Forms for registration</h3>
            <p>Upon completion as scheduled, submit at your nearest ITF office for registration.</p>
          <table className="table">
          <thead>
            <tr>
              <th>File no</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>1</td>
                <td>IT Form A</td>
                <td><Link to="https://drive.google.com/file/d/16ndKGsm6AM77QLEzYa4FuKyRsEQuF_cU/view?usp=drivesdk" className="btn btn-primary">Download PDF</Link></td>
            </tr>
              <tr className="bg-secondary">
                <td>2</td>
                <td>IT Form 8</td>
                <td><Link to="https://drive.google.com/file/d/16pWo6CZlWFS9EySzr1OvImgrbiIX3U94/view?usp=drivesdk" className="btn btn-primary">Download PDF</Link></td>
            </tr>
              <tr>
                <td>3</td>
                <td>IT SCAF Form</td>
                <td><Link to="https://drive.google.com/file/d/16scilExKNwy78nQOKraAweBDGwQ_Fu3F/view?usp=drivesdk" className="btn btn-primary">Download PDF</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default StudentForms