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

  Staff.findOne({_id: req.id}).then(item => {
    console.log(item);
    res.status(200).json(item);
  })
};

module.exports.postStaff = (req, res) => {
  const Staff = mongoose.model('staff');
  const staff = new Staff;
  const { name, color } = req.body;
  staff.set({name: name || 'noName', color: color || 'grey'});
  console.log(name, color);
  staff.save();
  res.status(200).send('Information saved');
};

module.exports.putStaff = (req, res) => {
  const Staff = mongoose.model('staff');
  const query = {_id: req.body._id};
  const update = {[req.body.key]: req.body.value};
  Staff.findOneAndUpdate(query, update).then(item => {
    console.log(item);
    res.status(200).json(`Change ${req.body.key} for staff with _id: ${req.body._id}`);
  })
};

module.exports.deleteStaff = (req, res) => {
  const Staff = mongoose.model('staff');
  Staff.deleteOne({_id: req.body._id}).then(items => {
    res.status(200).send(`Delete staff with _id: ${req.body._id}`);
  })
};

