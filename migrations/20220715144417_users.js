/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(
    `CREATE TABLE knexjs.usuario (
                                idusuario INT NOT NULL AUTO_INCREMENT,
                                nome VARCHAR(50) NULL,
                                telefone VARCHAR(19) NULL,
                                cpf VARCHAR(11) NOT NULL,
                                endereco VARCHAR(200) NOT NULL,
                                email VARCHAR(200) NULL,
                                senha VARCHAR(200) NULL,
                                perfil VARCHAR(1) NOT NULL DEFAULT 'C',
                                PRIMARY KEY (idusuario),
                                UNIQUE INDEX cpf_UNIQUE (cpf ASC) VISIBLE,
                                UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE);`
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('usuario');
};
