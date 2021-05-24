// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const tarefasCampanhas = sequelizeClient.define(
    "tarefas_campanhas",
    {
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_prev_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      data_prev_fim: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      data_real_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      data_real_fim: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      custo_previsto: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      observacao: {
        type: DataTypes.TEXT,
        allowNull: true,
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
  tarefasCampanhas.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    tarefasCampanhas.belongsTo(models.campanha);
    tarefasCampanhas.belongsTo(models.status_tarefas);
    tarefasCampanhas.belongsTo(models.movimentacao);
    tarefasCampanhas.belongsTo(models.tenant);
  };

  return tarefasCampanhas;
};
