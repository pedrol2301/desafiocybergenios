/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    `CREATE TABLE knexjs.users (
                                id INT NOT NULL AUTO_INCREMENT,
                                name VARCHAR(50) NULL,
                                email VARCHAR(150) NOT NULL,
                                password VARCHAR(200) NOT NULL,
                                role INT NOT NULL DEFAULT 0,
                                PRIMARY KEY (id),
                                UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE);`,
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
