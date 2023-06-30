import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, getProfiles, getProfileById } from '../redux/profile/profileSlice'
import Spinner from '../component/Spinner'
import { toast } from 'react-toastify'

const EditProfileForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { profiles, isLoading } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    profession: '',
    address: '',
    gender: '',
    phone: '',
    picture: null,
  })

  const { name, email, age, profession, address, gender, phone, picture } = formData

  useEffect(() => {
	if (id) {
	  dispatch(getProfileById(id))
	}
  }, [dispatch, id])
  

  useEffect(() => {
    if (profiles.length > 0) {
      const singleProfile = profiles.find((profile) => profile._id === id);
      if (singleProfile) {
        setFormData({
          name: singleProfile.name,
          email: singleProfile.email,
          age: singleProfile.age,
          profession: singleProfile.profession,
          address: singleProfile.address,
          gender: singleProfile.gender,
          phone: singleProfile.phone,
          picture: null,
        })
      }
    }
  }, [profiles, id])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      picture: e.target.files[0],
    }))
  }

  const onSubmit = (e) => {
	e.preventDefault()
  
	const formData = new FormData()
	formData.append('name', name)
	formData.append('email', email)
	formData.append('age', age)
	formData.append('profession', profession)
	formData.append('address', address)
	formData.append('gender', gender)
	formData.append('phone', phone)
	if (picture) {
	  formData.append('picture', picture);
	}
  
	dispatch(updateProfile( {formData, id} ))
	toast.success('Edit Successful')
  dispatch(getProfiles())
	navigate('/dashboard')
  }
  
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="container">
          <div className="mt-4">
            <Link to="/dashboard" className="btn btn-danger">
              Back
            </Link>
          </div>
          <div className="modal-header">
            <h4 className="modal-title">Edit Profile</h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Profile Name</label>
              <input name="name" value={name} onChange={onChange} type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={email} onChange={onChange} type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input name="age" value={age} onChange={onChange} type="number" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Profession</label>
              <input
                name="profession"
                value={profession}
                onChange={onChange}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                value={address}
                onChange={onChange}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={phone} onChange={onChange} type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input name="gender" value={gender} onChange={onChange} type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Edit Profile Image</label>
              <input
                type="file"
                className="form-control-file"
                name="picture"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/dashboard" className="btn btn-default">
              Cancel
            </Link>
            <button type="submit" className="btn btn-success">
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfileForm
