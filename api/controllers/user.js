const mongoose = require('mongoose');

module.exports.getUsers = (req, res) => {
  const User = mongoose.model('staff');

  User.find().then(items => {
    console.log(items);
    res.status(200).json(items);
  })
};

module.exports.getUser = (req, res) => {
  const User = mongoose.model('user');

  User.findOne({_id: req.id}).then(item => {
    console.log(item);
    res.status(200).json(item);
  })
};

module.exports.postUser = (req, res) => {
  const Staff = mongoose.model('user');
  const staff = new User;
  const { name, color } = req.body;
  staff.set({name: name || 'noName', color: color || 'grey'});
  console.log(name, color);
  staff.save();
  res.status(200).send('Information about new user saved');
};

module.exports.putUser = (req, res) => {
  const User = mongoose.model('user');
  const query = {_id: req.body._id};
  const update = {[req.body.key]: req.body.value};
  User.findOneAndUpdate(query, update).then(item => {
    console.log(item);
    res.status(200).json(`Change ${req.body.key} for user with _id: ${req.body._id}`);
  })
};

module.exports.deleteUser = (req, res) => {
  const User = mongoose.model('user');
  User.deleteOne({_id: req.body._id}).then(items => {
    res.status(200).send(`Delete user with _id: ${req.body._id}`);
  })
};

