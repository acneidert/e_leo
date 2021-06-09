// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs'
const DataTypes = Sequelize.DataTypes;

export default function (sequelizeClient) {
  const users = sequelizeClient.define(
    'users',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          if(value === null || value === '')  return;
          const hash = bcrypt.hashSync(value, 6);
          this.setDataValue('password', hash);
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      membership_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      function: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Associado',
        set(value) {
          if(value === null)  this.setDataValue('function', 'Associado');
          this.setDataValue('function', value)
        },
      },
      entry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      federative_unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
          withPassword: {
              attributes: {},
          }
      },
      instanceMethods: {
        toJSON: function () {
          var values = Object.assign({}, this.get());
    
          delete values.password;
          return values;
        },
        generateHash() {
          return bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        },
        validPassword(password) {
          return bcrypt.compareSync(password, this.password);
        },
      },
    }
  );

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.belongsTo(models.tenant);
  };

  return users;
}
