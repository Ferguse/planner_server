var pgp = require("pg-promise")();
const { postgres } = require('../../config');

const { psql_name, psql_password, psql_host, psql_port, psql_db } = postgres;

module.exports.getUsers = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  db.any('SELECT * FROM users WHERE active = $1', [true])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(error) {
      res.send(`Error: ${error}`);
    });
};

module.exports.getUser = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  console.log(req.id);
  db.one('SELECT * FROM users WHERE id = $1', req.id)
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(error) {
      res.send(`Error: ${error}`);
    });
};

module.exports.postUser = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const { name, mail, password, role, notification } = req.body;

  db.none('INSERT INTO users(name, mail, password, role, notification) VALUES($1, $2, $3, $4, $5)', [name, mail, password, role, notification])
    .then(() => {
      res.status(200).send('Information about new user saved in db');
    })
    .catch(error => {
      res.send(`Error: ${error}`);
    });
};

module.exports.putUser = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const { key, value, id} = req.body;
  db.none(`UPDATE users SET ${key} = '${value}' WHERE id = ${id}`)
    .then(() => {
      res.status(200).send('Information about user updated in db');
    })
    .catch(error => {
      res.send(`Error: ${error}`);
    });
};

module.exports.deleteUser = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const { id} = req.body;
  db.none(`DELETE FROM users WHERE id = '${id}'`)
    .then(() => {
      res.status(200).send('Information about user deleted from db');
    })
    .catch(error => {
      res.send(`Error: ${error}`);
    });
};

