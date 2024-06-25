import { Sequelize } from 'sequelize'
import { createData } from './seed.js'

export const db = new Sequelize({ dialect: 'sqlite', storage: './src/db/loans.db' })

const force = true

db.sync({ force })
  .then(() => {
    if (force) {
      createData()
    }
    console.info('Tables synchronized successfully')
  })
  .catch(error => {
    console.error('Error synchronizing tables:', error)
  })
