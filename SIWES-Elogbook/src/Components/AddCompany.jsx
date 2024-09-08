// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosConfig";

const AddCompany = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [company, setCompany] = useState({
    name: "",
    address: "",
    phone_number: ""
  });
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .get(apiUrl + "/auth/company")
      .then((result) => {
        if (result.data.Status) {
          setCompany(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', company.name);
    formData.append('address', company.address);
    formData.append('address', company.phone_number);

    axiosInstance.post(apiUrl + '/auth/add_company', company)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/company')
        } else {
            alert(result.data.Error);
            // console.log(JSON.stringify(result.data));
            console.log(JSON.stringify(result.data.Error));
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded border'>
            <h2>Add Company</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="company_name"><strong>Company Name:</strong></label>
                    <input type="text" name='company_name' placeholder='Enter Company Name'
                     onChange={(e) => setCompany({...company, name: e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="company_address"><strong>Company Address:</strong></label>
                    <input type="text" name='company_address' placeholder='Enter Company Address'
                     onChange={(e) => setCompany({...company, address: e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="company_phone_number"><strong>Company Phone Number:</strong></label>
                    <input type="text" name='company_phone_number' placeholder='Enter Company Phone Number'
                     onChange={(e) => setCompany({...company, phone_number: e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add Company</button>
            </form>
        </div>
    </div>
  );
};

export default AddCompany;
