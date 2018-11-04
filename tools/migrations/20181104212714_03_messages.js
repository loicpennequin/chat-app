exports.up = async function(knex) {
    await knex.schema.createTable("messages", table => {
        table.increments().primary();
        table.integer("sender_id").notNullable();
        table.string("sendee_id").notNullable();
        table.string("content").notNullable();

        table.timestamps(true, true);
        table.index(["sender_id"]);
        table.index(["sendee_id"]);
        table.index(["created_at"]);
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("messages");
};
