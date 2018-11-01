exports.up = async function(knex) {
    await knex.schema.createTable("users", table => {
        table.increments().primary();
        table.string("email").notNullable();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.boolean("is_online").notNullable().defaultTo(false);
        table.string("avatar_url").nullable();

        table.timestamps(true, true);
        table.unique("email");
        table.index(["email"]);
        table.index(["username"]);
        table.index(["is_online"]);
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users");
};
