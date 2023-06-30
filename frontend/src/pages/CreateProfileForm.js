import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {createProfile } from '../redux/profile/profileSlice'
import { toast} from 'react-toastify'

import { Link } from 'react-router-dom'

const CreateProfileForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [formData, setFormData]  = useState({
		name: '',
		email : '',
		age : '',
		profession : '',
		address : '',
		gender : '',
		phone : '',
		picture: null,

	})
	const { name, email, age, profession, address, gender, phone, picture} = formData
  
	const onChange = (e)=> {
		setFormData((prevState)=>({
			...prevState,
			[e.target.name] : e.target.value
		}))
	}

	const handleImageChange = (e) => {
		setFormData((prevState) => ({
		  ...prevState,
		  picture: e.target.files[0]
		}))
	  }

	  const onSubmit = (e) => {
		e.preventDefault()
	
		const profileData = new FormData()
		profileData.append('name', name)
		profileData.append('email', email)
		profileData.append('age', age)
		profileData.append('profession', profession)
		profileData.append('address', address)
		profileData.append('gender', gender)
		profileData.append('phone', phone)
		profileData.append('picture', picture)
	
		dispatch(createProfile(profileData))
		toast.success('Added new profile')
		navigate('/dashboard')
	  };


  return (
   <>
   <div className='container'>

  
			<form onSubmit={onSubmit} >
				<div classNameName='container'>
					<div classNameName='mt-4'>
					<Link to='/dashboard' className="btn btn-danger mt-4" >Back</Link>
					</div>
				<div className="modal-header">						
					<h4 className="modal-title">Add Profile</h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Profile Name</label>
						<input
						name='name'
						value={name}
						onChange={onChange}
						type="text" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
						name='email'
						value={email}
						onChange={onChange}
						type="text" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Age</label>
						<input
						name='age'
						value={age}
						onChange={onChange}
						type="number" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Profession</label>
						<input
						name='profession'
						value={profession}
						onChange={onChange}
						type="text" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
						name='address'
						value={address}
						onChange={onChange}
						type="text" className="form-control" required/>
					</div>	
					<div className="form-group">
						<label>Phone</label>
						<input
						name='phone'
						value={phone}
						onChange={onChange}
						type="text" className="form-control" required/>
					</div>	
					<div className="form-group">
						<label>Gender</label>
						<input
						name='gender'
						value={gender}
						onChange={onChange}
						type="text" className="form-control" required/>
					</div>	
					<div className="form-group">
                <label>Upload Profile Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  name="picture"
				  required
                  onChange={handleImageChange}
                />
              </div>
				</div>
				<div className="modal-footer">
					<Link  to='/dashboard' className="btn btn-default"  >Cancel</Link>
					<button   type='submit' className="btn btn-success"  >Add</button>
				</div>
				</div>
			</form>
			</div>
   </>
  )
}

export default CreateProfileForm

