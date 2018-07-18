
const mongoose = require('mongoose');
const config = require('../../config');
const dbase = config.db;

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${dbase.name}:${dbase.password}@${dbase.host}:${dbase.port}/${dbase.db}`,
    { useNewUrlParser: true })
  .catch(e => {
    console.error(e);
    throw e;
  });

mongoose.connection.on('connected', function() {
  console.log(
    `Mongoose default connection open mongodb://${config.db.host}:${
      config.db.port
      }/${config.db.name}`
  );
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

require('./staff');
require('./project');
