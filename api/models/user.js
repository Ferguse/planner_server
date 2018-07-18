'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  StaffSchema = new Schema({
    name: {
      type: String,
    },
    color: {
      type: String
    }
  });

mongoose.model('staff', StaffSchema);
