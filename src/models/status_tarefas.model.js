// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const statusTarefas = sequelizeClient.define(
    "status_tarefas",
    {
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ordem: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  statusTarefas.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    statusTarefas.belongsTo(models.tenant);
  };

  return statusTarefas;
};
