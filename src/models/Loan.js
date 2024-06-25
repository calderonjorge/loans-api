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
  status: {
    type: DataTypes.ENUM,
    values: ['pending', 'liquidated'],
    allowNull: false,
    defaultValue: 'pending',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  percentage: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
})
