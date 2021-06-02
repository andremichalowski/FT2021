//01 users
//02 trucks
//03 menu_items
//04 menu_ratings
//05 owned_trucks
//06 favorite_trucks

exports.up = function(knex) {
  return knex.schema

    //01-users
    .createTable('users', tbl=>{
      tbl.increments()
      ;
      tbl.text('username')
        .notNullable()
        .unique()
      ;
      tbl.text('password')
        .notNullable()
      ; 
      tbl.text('email')
        .notNullable()
        .unique()
      ;
      tbl.boolean('isOperator')
        .defaultTo(false)
        .notNullable()
      ;
      tbl.integer('location')
      ;
    })
    
    //02-trucks
    .createTable('trucks', tbl=>{
      tbl.increments()
      ;
      tbl.text('name')
        .notNullable()
      ;
      tbl.text('type')
        .notNullable()
      ;
      tbl.text('photoUrl')
      ;
      tbl.integer('location')
        .notNullable()
      ;
    })

    //03-menu_items
    .createTable('menu_items', tbl=>{
      tbl.increments()
      ;
      tbl.integer('truck_id')
        //fkey
        .references('id')
        .inTable('trucks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.text('name')
        .notNullable()
      ;
      tbl.text('description')
        .notNullable()
      ;
      tbl.integer('price')
        .notNullable()
      ;
    })

    //04-menu_ratings
    .createTable('menu_ratings', tbl=>{
      tbl.increments()
      ;
      tbl.integer('user_id')
        //fkey
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.integer('menu_item_id')
        //fkey
        .references('id')
        .inTable('menu_items')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.integer('rating')
        .notNullable()
      ;
      tbl.text('photoUrl')
      ;
    })

    //05-owned_trucks
    .createTable('owned_trucks',tbl=>{
      tbl.increments()
      ;
      tbl.integer('user_id')
        //fkey
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.integer('truck_id')
        //fkey
        .references('id')
        .inTable('trucks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
    })

    //06-favorite_trucks
    .createTable('favorite_trucks',tbl=>{
      tbl.increments()
      ;
      tbl.integer('users_id')
        //fkey
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
      tbl.integer('truck_id')
        //fkey
        .references('id')
        .inTable('trucks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      ;
    })
    ;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('favorite_trucks')
    .dropTableIfExists('owned_trucks')
    .dropTableIfExists('menu_ratings')
    .dropTableIfExists('menu_items')
    .dropTableIfExists('trucks')
    .dropTableIfExists('users')
    ;
};
