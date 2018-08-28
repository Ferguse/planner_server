const pgp = require("pg-promise")();
const { postgres } = require('../../config');
const { psql_name, psql_password, psql_host, psql_port, psql_db } = postgres;

module.exports.getStaffs = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  db.any('SELECT * FROM staffs WHERE active = $1', [true])
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(error) {
      res.send(`Error: ${error}`);
    });
};

module.exports.getStaff = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  db.one('SELECT * FROM staffs WHERE id = $1', req.id)
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(error) {
      res.send(`Error: ${error}`);
    });
};

module.exports.postStaff = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const { name, color, weeks, percent, user_id } = req.body;
  db.tx(function* (t) {
    let user = yield t.one('INSERT INTO staffs(name, color, created) VALUES($1, $2, now()) RETURNING id', [name, color]);
    yield t.any('INSERT INTO workload(staff_id, percent, weeks, created) VALUES($1, $2, $3, now())', [user.id, percent, weeks]);
    yield t.any('INSERT INTO history(user_id, action) VALUES($1, $2)', [user_id, `Add staff ${user.id} by ${user_id}`]);
  })
    .then(() => {
      res.status(200).send('Information about new staff saved in db');
    })
    .catch(error => {
      res.send(`Error: ${error}`);
    });
};

module.exports.putStaff = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const { key, value, id, weeks, percent, user_id } = req.body;
  db.tx(function* (t) {
    yield t.any(`UPDATE staffs SET ${key} = '${value}' WHERE id = $1`, [id]);
    yield t.any(`UPDATE workload SET percent = '${percent}', weeks = '${weeks}' WHERE staff_id = ${id}`, [percent, weeks]);
    yield t.any('INSERT INTO history(user_id, action) VALUES($1, $2)', [id, `Updated staff ${id} by ${user_id}`]);

  })
    .then(() => {
      res.status(200).send('Information about staff updated in db');
    })
    .catch(error => {
      res.send(`Error: ${error}`);
    });
};

module.exports.deleteStaff = (req, res) => {
  const db = pgp(`postgres://${psql_name}:${psql_password}@${psql_host}:${psql_port}/${psql_db}`);
  const { id } = req.body;
  db.none(`DELETE FROM staffs WHERE id = '${id}'`)
    .then(() => {
      db.none('INSERT INTO history(user_id, action, project_id) VALUES($1, $2, $3)', [id, `Deleted staff ${id}`, ])
    })
    .then(() => {
      res.status(200).send('Information about user deleted from db');
    })
    .catch(error => {
      res.send(`Error: ${error}`);
    });
};

