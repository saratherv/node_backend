const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactUserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  email : {
      type : String,
      required : true,
      unique : true
  },
  message : {
     type : String,
     minlength : 10 
  }
}, {
  timestamps: true,
});

const Lead = mongoose.model('Lead', contactUserSchema);

module.exports = Lead;