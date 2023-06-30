import React  from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  getProfiles,
  deleteProfile
} from '../redux/profile/profileSlice';

const ProfileTable = ({ profiles }) => {
    const dispatch = useDispatch()

  const handleDeleteProfile = async (profileId) => {
	try {
	  await dispatch(deleteProfile(profileId))
	  toast.success('Delete Successful')
	  await dispatch(getProfiles())
	} catch (error) {
	  console.error('Error deleting profile:', error);
	}
  };
  

  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Profile <b>Lists</b></h2>
                </div>
                <div className="col-sm-6">
                  <Link to="/create" className="btn btn-success" >
                    <i className="material-icons">&#xE147;</i>
                    <span>Add New Profile</span>
                  </Link>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Profile Name</th>
                  <th>Profile Picture</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.length > 0 ? (
                  <>
                    {profiles.map((profile, index) => (
                      <tr key={index}>
                        <td>{profile.name}</td>
                        <td>
                          {profile.picture && (
                            <img
                              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                              src={`/${profile.picture.replace(/\\/g, '/')}`}
                              alt="Profile Picture"
                            />
                          )}
                        </td>
                        <td>{profile.email}</td>
                        <td>{profile.age}</td>
                        <td className='actions' style={{ display: 'flex' }}>
                          <Link to={`/profile/${profile._id}`} className="view">
                            <i className="material-icons" data-toggle="tooltip" title="view">
                              &#x1f441;
                            </i>
                          </Link>
                          <Link to={`/edit/${profile._id}`} className="edit" >
                            <i className="material-icons" data-toggle="tooltip" title="Edit">
                              &#xE254;
                            </i>
                          </Link>
                          <Link
                            onClick={() => handleDeleteProfile(profile._id)}
                            className="delete"  
                          >
                            <i className="material-icons" data-toggle="tooltip" title="Delete">
                              &#xE872;
                            </i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
            {profiles.length === 0 && <h2>Click the add button to add a new entry</h2>}
            <div className="clearfix">
              <div className="hint-text">
                Showing <b>{profiles.length}</b> {profiles.length > 1 ? 'entries' : 'entry'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTable;