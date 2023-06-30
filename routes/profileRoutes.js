const express = require('express')
const {createProfile, getAllProfiles, getProfileById, updateProfile, deleteProfile} = require('../controllers/profileController')
const authMiddleware =  require('../middleware/authMiddleware')
const multer = require('multer')

const router = express.Router()

const app = express()

app.use(express.static('uploads'))

const storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = file.originalname.split('.').pop()
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension)
  }
});

 const upload = multer({ storage })

router.get('/',authMiddleware, getAllProfiles )
router.get('/:id', authMiddleware, getProfileById )
router.post('/', authMiddleware,  upload.single('picture'), createProfile)
router.put('/:id', authMiddleware, upload.single('picture'), updateProfile)
router.delete('/:id', authMiddleware, deleteProfile)

module.exports = router
