const mongoose = require('mongoose');

module.exports.getStaffs = (req, res) => {
  const Staff = mongoose.model('staff');

  Staff.find().then(items => {
    console.log(items);
    res.status(200).json(items);
  })
};

module.exports.getStaff = (req, res) => {
  const Staff = mongoose.model('staff');

  Staff.find().then(items => {
    res.status(200).json(items);
  })
};

module.exports.postStaff = (req, res) => {
  const Staff = mongoose.model('staff');

  Staff.find().then(items => {
    res.status(200).json(items);
  })
};

module.exports.putStaff = (req, res) => {
  const Staff = mongoose.model('staff');

  Staff.find().then(items => {
    res.status(200).json(items);
  })
};

module.exports.deleteStaff = (req, res) => {
  const Staff = mongoose.model('staff');

  Staff.find().then(items => {
    res.status(200).json(items);
  })
};

