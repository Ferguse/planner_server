const mongoose = require('mongoose');
const pgp = require("pg-promise")();
const { postgres } = require('../../config');

const { psql_name, psql_password, psql_host, psql_port, psql_db } = postgres;

module.exports.getProjects = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  db.any('SELECT * FROM projects WHERE active = $1', [true])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(error) {
      res.send(`Error: ${error}`);
    });
};

module.exports.getProject = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  db.one('SELECT * FROM projects WHERE id = $1', req.id)
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(error) {
      res.send(`Error: ${error}`);
    });
};

module.exports.postProject = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const { title, content, color, staffs, user_id } = req.body;
  db.tx(function* (t) {
    let user = yield t.one('INSERT INTO projects(title, color, content, staffs, created) VALUES($1, $2, $3, $4,' +
      ' now()) RETURNING id', [title, color, content, staffs]);
    yield t.any('INSERT INTO workload(staff_id, percent, weeks, created) VALUES($1, $2, $3, now())', [user.id, percent, weeks]);
    yield t.any('INSERT INTO history(user_id, action) VALUES($1, $2)', [user_id, `Add staff ${user.id} by ${user_id}`]);
  })
    .then(() => {
      res.status(200).send('Information about new staff saved in db');
    })
    .catch(error => {
      res.send(`Error: ${error}`);
    });
  // const Project = mongoose.model('project');
  // const project = new Project;
  // const { name, color } = req.body;
  // project.set({name: name || 'noName', color: color || 'grey'});
  // console.log(name, color);
  // project.save();
  res.status(200).send('Information saved');
};

module.exports.putProject = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const Project = mongoose.model('project');
  const query = {_id: req.body._id};
  const update = {[req.body.key]: req.body.value};
  Project.findOneAndUpdate(query, update).then(item => {
    console.log(item);
    res.status(200).json(`Change ${req.body.key} for staff with _id: ${req.body._id}`);
  })
};

module.exports.deleteProject = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const Project = mongoose.model('project');
  Project.deleteOne({_id: req.body._id}).then(items => {
    res.status(200).send(`Delete staff with _id: ${req.body._id}`);
  })
};

