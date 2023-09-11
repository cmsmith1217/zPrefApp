/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
        table.increments();
        table.integer('user_id');
        table.foreign('user_id').references('user_table.id')
        table.string('item_name');
        table.string('description');
        table.integer('quantity');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('item', table => {
        table.dropForeign('user_id')
    })
    .then(function() {
        return knex.schema.dropTableIfExists('item')
    })
};
