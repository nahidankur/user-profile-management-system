const Profile = require('../models/Profile')

const getAllProfiles = async (req, res) => {
  try {
    // Check if the user is authenticated
   if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
     }
    const profiles = await Profile.find();
    res.json(profiles)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
};


const getProfileById = async (req, res) => {
    try {
       // Check if the user is authenticated
       if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' })
       } 
      const profile = await Profile.findById(req.params.id)
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' })
      }
      res.json(profile)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Something went wrong' })
    }
  };

const createProfile = async (req, res) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const { name, email, age, profession, address, gender, phone } = req.body

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    // Create a new profile
    const profile = new Profile({
      name, email, age, profession, address, gender, phone,
       picture: file.path 
    })

    await profile.save()

    res.status(201).json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const file = req.file

    const { name, email, age, profession, address, gender, phone } = req.body
    const profileId = req.params.id;

    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    let profile = await Profile.findById(profileId)

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }
    // Update the profile fields
    profile.name = name || profile.name
    profile.email = email || profile.email
    profile.age = age || profile.age
    profile.profession = profession || profile.profession
    profile.address = address || profile.address
    profile.gender = gender || profile.gender
    profile.phone = phone || profile.phone

    if (file) {
      profile.picture = file.path
    }

    profile = await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}


const deleteProfile = async (req, res) => {
  try {
    const profileId = req.params.id

    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const deletedProfile = await Profile.findByIdAndDelete(profileId)

    if (!deletedProfile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    res.json({ message: 'Profile deleted successfully' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' })
  }
};

module.exports = { getAllProfiles, getProfileById, createProfile, updateProfile, deleteProfile }
