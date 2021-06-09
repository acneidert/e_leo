// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const lideresCampanha = sequelizeClient.define(
    "lideres_campanha",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }
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
  lideresCampanha.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.users.belongsToMany(models.campanha, { through: lideresCampanha });
    models.campanha.belongsToMany(models.users, { through: lideresCampanha });
    lideresCampanha.belongsTo(models.tenant);
  };

  return lideresCampanha;
};
