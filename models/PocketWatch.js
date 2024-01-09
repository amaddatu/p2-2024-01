const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PocketWatch extends Model {
  // custom method here
}

PocketWatch.init(
  {    
    //columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      validate: {
        min: 0.01
      },
    },

    // foreign keys are usually put on the many side of a relationship
    // user_id will be the shared data (used in joins)
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pocketwatch',
  }
);

module.exports = PocketWatch;