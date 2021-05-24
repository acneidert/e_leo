// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const files = sequelizeClient.define(
    "files",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filename_disk: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filename_download: {
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
  files.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    files.belongsTo(models.tenant);
  };

  return files;
};
