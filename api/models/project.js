'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ProjectSchema = new Schema({
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    color: {
      type: String,
    },
    users: {
      type: Array,
    },
    history: {
      type: Array,
    },
  });

mongoose.model('project', ProjectSchema);
