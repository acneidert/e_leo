// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const tenant = sequelizeClient.define(
    "tenant",
    {
      club_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      club_district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      club_slug: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      club_subdomain: {
        type: DataTypes.STRING,
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
  tenant.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return tenant;
};
