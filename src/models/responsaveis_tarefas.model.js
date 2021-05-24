// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const responsaveisTarefas = sequelizeClient.define(
    "responsaveis_tarefas",
    {},
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  responsaveisTarefas.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    models.users.belongsToMany(models.tarefas_campanhas, {
      through: responsaveisTarefas,
    });
    models.tarefas_campanhas.belongsToMany(models.users, {
      through: responsaveisTarefas,
    });
    responsaveisTarefas.belongsTo(models.tenant);
  };

  return responsaveisTarefas;
};
