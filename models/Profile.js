const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    }, 
    picture: {
        type: String
    },
    age: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
      },
    address: {
        type: String,
        required: true
      },
    gender: {
        type: String,
        required: true
      }, 
      phone: {
        type: String,
        required: true
      }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema)