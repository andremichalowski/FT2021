exports.up = function(knex) {
  return (
    knex.schema
        .createTable("operators", tbl => {
          tbl.increments();
          tbl.string('username').notNullable().unique();
          tbl.string('password').notNullable();
          tbl.string('email').notNullable().unique();
          tbl.string('role').notNullable(); //can/should this be a boolean
          tbl.integer('location').notNullable();
        })
        .createTable("diners", tbl => {
          tbl.increments();
          tbl.string('username', 30).notNullable().unique();
          tbl.string('password', 15).notNullable();
          tbl.string('email', 40).notNullable().unique();
          tbl.string('role').notNullable(); //can/should this be a boolean
          tbl.integer('location').notNullable();
        })
        .createTable("trucks", tbl => {
          tbl.increments();
          tbl.string('name', 30).notNullable().unique();
          tbl.string('type', 15).notNullable();
          tbl.text('image').notNullable() // how to upload image other than pasting code from another image uploader
          tbl.integer('location').notNullable(); //can/should this be a boolean
          tbl.float('rating').notNullable();
        })
        .createTable("operator_trucks", tbl => {
          tbl.increments();
          tbl.integer("operator_#").unsigned().references("operators.id").onDelete("RESTRICT").onUpdate("CASCADE");
          tbl.integer("truck_#").unsigned().references("trucks.id").onDelete("RESTRICT").onUpdate("CASCADE");
        })
        .createTable("diner_trucks", tbl => {
          tbl.increments();
          tbl.integer("diner_#").unsigned().references("diners.id").onDelete("RESTRICT").onUpdate("CASCADE");
          tbl.integer("truck_#").unsigned().references("trucks.id").onDelete("RESTRICT").onUpdate("CASCADE");
        })
        .createTable("menu_items", tbl => {
          tbl.increments();
          tbl.integer('truck_#').unsigned().references("trucks.id").onDelete("RESTRICT").onUpdate("CASCADE");
          tbl.string('name', 30).notNullable().unique();
          tbl.string('description', 15).notNullable();
          tbl.text('image').notNullable(); // how to upload image other than pasting code from another image uploader
          tbl.float('price').notNullable();
          tbl.float('rating').notNullable();
        })
        .createTable("rating", tbl => {
          tbl.increments();
          tbl.integer("diner_#").unsigned().references("diners.id").onDelete("RESTRICT").onUpdate("CASCADE");
          tbl.integer("menu_item_#").unsigned().references("menu_items.id").onDelete("RESTRICT").onUpdate("CASCADE");
        })
  );
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("rating")
  .dropTableIfExists("menu_items")
  .dropTableIfExists("diner_trucks")
  .dropTableIfExists("operator_trucks")
  .dropTableIfExists("trucks")
  .dropTableIfExists("diners")
  .dropTableIfExists("operators");
};
