import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../redux/profile/profileSlice';
import Spinner from '../component/Spinner';
import './profile.css'

const ProfileDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { profile, isLoading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    dispatch(getProfileById(id))
  }, [id, navigate, user, dispatch])

  if (isLoading) {
    return <Spinner />
  }


  return (
    <div>
      <h2 style={{textAlign: "center", margin: "20px 0"}}>Profile Details</h2>
      {profile && (
        <div className="card">
          {profile.picture && (
            <img
             className='profile-details-img'
              src={`/${profile.picture.replace(/\\/g, '/')}`}
              alt="Profile Picture"
            />
          )}
          <div style={{paddingLeft: "40px"}}>
          <h1 style={{textAlign: "center"}} className='h1'>{profile.name}</h1>
          <p >Email: <b>{profile.email}</b></p>
          <p>Age: <b>{profile.age}</b> </p>
          <p>Profession: <b>{profile.profession}</b></p>
          <p>Address: <b>{profile.address}</b></p>
          <p>Gender: <b>{profile.gender}</b></p>
          <p>Phone: <b>{profile.phone}</b></p>
          </div>
          <p>
            <button className='btn-back' onClick={() => navigate('/dashboard')}>Back</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
