// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const saldosFundos = sequelizeClient.define(
    "saldos_fundos",
    {
      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      valor: {
        type: DataTypes.DECIMAL,
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
  saldosFundos.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    saldosFundos.belongsTo(models.fundos_financeiros);
    saldosFundos.belongsTo(models.tenant);
  };

  return saldosFundos;
};
