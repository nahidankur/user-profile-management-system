import axios from 'axios'

const API_URL = '/api/profile/'

// create profile
const createProfile = async(profileData, token)=> {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, profileData, config)
    return response.data

}

//get profiles
const getProfiles = async( token)=> {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL ,  config)
    return response.data

}

//get profiles by id
const getProfileById = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}${id}`, config)
    return response.data;
  };
  

// update profile
const updateProfile = async (profileData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  
    const response = await axios.put(`${API_URL}${profileData.id}`, profileData.formData, config)
    return response.data;
  };
  

// update profile
const deleteProfile = async(id, token)=> {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}${id}`, config)
    return response.data

}

const profileService = {
    createProfile, getProfiles,getProfileById, updateProfile, deleteProfile
}

export default profileService