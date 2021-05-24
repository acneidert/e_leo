// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const participantesReuniao = sequelizeClient.define(
    "participantes_reuniao",
    {
      is_presente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      convidado: {
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
  participantesReuniao.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    participantesReuniao.belongsTo(models.reuniao);
    participantesReuniao.belongsTo(models.users);
    participantesReuniao.belongsTo(models.tenant);
  };

  return participantesReuniao;
};
