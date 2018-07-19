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
    workload: [
      {
        projectId: String,
        weeks: Array,
        percent: Number,
        dates: [
          {
            start: String,
            end: String
          }
        ]
      }
    ]
  });

mongoose.model('staff', StaffSchema);
