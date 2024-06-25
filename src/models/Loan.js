import { DataTypes } from 'sequelize'
import { db } from '../db/index.js'

export const Loan = db.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
    },
  },
  amount: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  periodicPayments: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
})
