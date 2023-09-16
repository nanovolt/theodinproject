// sample.js
const nconf = require("nconf");
//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf
  .argv()
  .env()
  .file({ file: `${__dirname}/config.json` });

//
// Set a few variables on `nconf`.
//
// nconf.set("database:host", "127.0.0.1");
// nconf.set("database:port", 5984);

//
// Get the entire database object from nconf. This will output
// { host: '127.0.0.1', port: 5984 }
//
// console.log(`foo: ${nconf.get("foo")}`);
// console.log(`NODE_ENV: ${nconf.get("NODE_ENV")}`);
// console.log(`database: ${nconf.get("database")}`);
// console.log(`obj:`, nconf.get("database").obj);

//
// Save the configuration object to disk
//
// eslint-disable-next-line no-unused-vars
nconf.save((err) => {
  // eslint-disable-next-line global-require
  require("fs").readFile(`${__dirname}/config.json`, (er, data) => {
    if (er) {
      console.log(er);
      return;
    }
    console.dir(JSON.parse(data.toString()));
  });
});
