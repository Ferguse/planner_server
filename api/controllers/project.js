const mongoose = require('mongoose');

module.exports.getProjects = (req, res) => {
  const Project = mongoose.model('project');

  Project.find().then(items => {
    console.log(items);
    res.status(200).json(items);
  })
};

module.exports.getProject = (req, res) => {
  const Project = mongoose.model('project');

  Project.findOne({_id: req.id}).then(item => {
    console.log(item);
    res.status(200).json(item);
  })
};

module.exports.postProject = (req, res) => {
  const Project = mongoose.model('project');
  const project = new Project;
  const { name, color } = req.body;
  project.set({name: name || 'noName', color: color || 'grey'});
  console.log(name, color);
  project.save();
  res.status(200).send('Information saved');
};

module.exports.putProject = (req, res) => {
  const Project = mongoose.model('project');
  const query = {_id: req.body._id};
  const update = {[req.body.key]: req.body.value};
  Project.findOneAndUpdate(query, update).then(item => {
    console.log(item);
    res.status(200).json(`Change ${req.body.key} for staff with _id: ${req.body._id}`);
  })
};

module.exports.deleteProject = (req, res) => {
  const Project = mongoose.model('project');
  Project.deleteOne({_id: req.body._id}).then(items => {
    res.status(200).send(`Delete staff with _id: ${req.body._id}`);
  })
};

