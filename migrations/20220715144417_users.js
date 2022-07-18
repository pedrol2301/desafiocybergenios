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
                                PRIMARY KEY (idusuario),
                                UNIQUE INDEX cpf_UNIQUE (cpf ASC) VISIBLE);`,
  ).raw(`CREATE TABLE knexjs.profile (
    idprofile INT NOT NULL AUTO_INCREMENT,
    idusuario INT NULL,
    email VARCHAR(200) NULL,
    senha VARCHAR(200) NULL,
    PRIMARY KEY (idprofile),
    UNIQUE INDEX idusuario_UNIQUE (idusuario ASC) VISIBLE,
    UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE,
    CONSTRAINT idusuario
      FOREIGN KEY (idusuario)
      REFERENCES knexjs.usuario (idusuario)
      ON DELETE CASCADE
      ON UPDATE NO ACTION);
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('usuario').dropTable('profile');
};
