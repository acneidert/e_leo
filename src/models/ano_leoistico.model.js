// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const anoLeoistico = sequelizeClient.define(
    "ano_leoistico",
    {
      ano: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      presidente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tesoureiro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      conselheiro: {
        type: DataTypes.STRING,
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
  anoLeoistico.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    anoLeoistico.belongsTo(models.tenant);
  };

  return anoLeoistico;
};
