// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
// import tenant from "./tenant.model";
const DataTypes = Sequelize.DataTypes;


export default function (sequelizeClient) {
  const campanha = sequelizeClient.define(
    "campanha",
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pasta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eixo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      data_fim: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      objetivo: {
        type: DataTypes.TEXT,
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
  campanha.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    campanha.belongsTo(models.tenant);
    campanha.belongsTo(models.status_campanha, {constraints: false});
  };

  return campanha;
};
