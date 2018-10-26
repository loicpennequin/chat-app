exports.up = async function(knex) {
    await knex.schema.createTable("contacts", table => {
        table.increments().primary();
        table.integer("sender_id").notNullable().references('user.id');
        table.integer("sendee_id").notNullable().references('user.id');
        table.integer('status').notNullable().defaultTo(1);

        table.timestamps(true, true);
        table.index(["sender_id"]);
        table.index(["sendee_id"]);
        table.index(["status"]);
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("contacts");
};
