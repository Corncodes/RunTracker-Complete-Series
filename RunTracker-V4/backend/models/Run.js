const mongoose = require('mongoose');

// This is the 'Contract' for your data
const RunSchema = new mongoose.Schema({
  distance_miles: { 
    type: Number, 
    required: [true, 'Distance is required'] 
  },
  pace: { 
    type: String, 
    required: [true, 'Pace is required'] 
  },
  run_date: { 
    type: Date, 
    default: Date.now 
  }
});

// We export this so server.js can use it to 'find' or 'create' runs
module.exports = mongoose.model('Run', RunSchema);