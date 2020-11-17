const db = require('../../data/connection.js');

module.exports = {
  //OPERATORS
  addOperators,
  findOperators,
  findOperatorsBy,
  findOperatorsById,
  //DINERS
  addDiners,
  findDiners,
  findDinersBy,
  findDinersById

};

// OPERATORS

function findOperators() {
  return db("operators").select("id", "username", "role").orderBy("id");
}

async function addOperators(operator) {
  try {
      const [id] = await db("operators").insert(operator, "id");

      return findOperatorsById(id);
  } catch (error) {
      throw error;
  }
}

function findOperatorsBy(filter) {
    return db("operators as o")
        // .join("roles as r", "o.role", "r.id") //?
        .where(filter)
        .select("o.id", "o.username", "o.password", "o.role as role" /*"r.name as role"*/)
        // .orderBy("o.id");
        .first();
}
// function findOperatorsBy(filter) {
//     return db("operators as o")
//         // .join("roles as r", "o.role", "r.id") //?
//         .where(filter)
//         .select("o.id", "o.username", "o.password", "o.role as role" /*"r.name as role"*/)
//         .orderBy("o.id");
// }

// function conditionalOperators(filter) {
//   return db('operators as o')
//     .where("username" = filter =)
// }

function findOperatorsById(id) {
    return db("operators").where({ id }).first();
}


// DINERS

function findDiners() {
  return db("diners").select("id", "username", "role").orderBy("id");
}

async function addDiners(diner) {
  try {
      const [id] = await db("diners").insert(diner, "id");

      return findDinersById(id);
  } catch (error) {
      throw error;
  }
}

function findDinersBy(filter) {
    return db("diners as d")
        // .join("roles as r", "d.role", "r.id") //?
        .where(filter)
        .select("d.id", "d.username", "d.password", "d.role as role")
        .orderBy("d.id");
}

function findDinersById(id) {
    return db("diners").where({ id }).first();
}