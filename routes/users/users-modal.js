const db = require('../../data/connection.js');

module.exports = {
  find,
};

function find() {
  return db("operators").select("id", "username").orderBy("id");
}