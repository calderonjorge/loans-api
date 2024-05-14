import Sequelize from 'sequelize'
import { Client, Loan } from '../models/index.js'

const createClient = async ({ name, phone, referrerId }) => {
  try {
    const resp = await Client.create({ name, phone, referrerId })

    return resp
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

async function getPaginatedClients(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize

  const clientsWithActiveLoanCount = await Client.findAndCountAll({
    attributes: {
      include: [
        [
          Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN Loans.active = true THEN 1 ELSE NULL END')),
          'activeLoanCount',
        ],
      ],
    },
    include: [
      {
        model: Loan,
        attributes: [],
        where: { active: true },
        required: false,
      },
    ],
    group: ['Client.id'],
    offset: offset,
  })

  const formattedClients = clientsWithActiveLoanCount.rows.map(client => ({
    id: client.id,
    name: client.name,
    phone: client.phone,
    activeLoanCount: parseInt(client.getDataValue('activeLoanCount') || 0),
  }))

  const totalPages = Math.ceil(clientsWithActiveLoanCount.count.length / pageSize)

  return {
    totalClients: clientsWithActiveLoanCount.count.length,
    currentPage: page,
    pageSize: pageSize,
    totalPages: totalPages,
    clients: formattedClients,
  }
}

const getClient = async ({ id }) => {
  try {
    const clientDetail = await Client.findByPk(id, {
      include: [
        {
          model: Loan,
          attributes: ['id', 'amount', 'periodicPayments', 'active'],
        },
        {
          model: Client,
          as: 'Referrer',
          attributes: ['name', 'phone'],
        },
      ],
    })
    return clientDetail
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const service = {
  create: createClient,
  getClient,
  getClients: getPaginatedClients,
}
