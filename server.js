const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const authRoutes =  require('./routes/authRoutes')
const profileRoutes  = require('./routes/profileRoutes')
require('multer')
const path = require('path')

const app = express()
app.use(express.urlencoded({extended : false}))
connectDB()
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)

// render deployment
__dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")))
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
    });
  }
  

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server is running under PORT ${PORT} successfully`)
})
