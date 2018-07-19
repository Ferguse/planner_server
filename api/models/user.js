'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  StaffSchema = new Schema({
    name: {
      type: String,
    },
    isAdmin: {
      type: Boolean
    }
  });

mongoose.model('staff', StaffSchema);
