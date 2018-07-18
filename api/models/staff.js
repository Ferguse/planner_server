'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  StaffSchema = new Schema({
    name: {
      type: String
    },
    color: {
      type: String
    },
    workload: {
      type: Array
    }
  });

mongoose.model('staff', StaffSchema);
