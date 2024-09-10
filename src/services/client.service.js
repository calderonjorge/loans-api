import Sequelize from 'sequelize'
import { Client, Loan } from '../models/index.js'

const createClient = async ({ name, phone, referrerId }) => {
  try {
    const resp = await Client.create({ name, phone, referrerId })

    return {
      activeLoans: 0,
      id: resp.id,
      name: resp.name,
      phone: resp.phone,
      referrerId: resp.referrerId,
    }
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

async function getPaginatedClients({ page = 1, pageSize = 10 }) {
  const offset = (page - 1) * pageSize

  const clientsWithActiveLoanCount = await Client.findAndCountAll({
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM Loans AS Loan
            WHERE
              Loan.ClientId = Client.id
              AND Loan.status = 'active'
          )`),
          'activeLoans',
        ],
      ],
    },
    include: [
      {
        model: Loan,
        attributes: [],
        required: false,
      },
    ],
    group: ['Client.id'],
    order: [['name', 'ASC']],
    offset: offset,
    limit: pageSize,
  })

  const paginatedClients = {
    totalClients: clientsWithActiveLoanCount.count.length, // Total de clientes sin paginar
    totalPages: Math.ceil(clientsWithActiveLoanCount.count.length / pageSize), // Total de páginas
    currentPage: page,
    clients: clientsWithActiveLoanCount.rows,
  }

  return paginatedClients
}

const getClient = async ({ id }) => {
  try {
    const clientDetail = await Client.findByPk(id, {
      include: [
        {
          model: Loan,
          attributes: ['id', 'amount', 'startDate', 'status'],
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

const updateClient = async ({ id, name, phone, referrerId }) => {
  try {
    const updatedFields = { name }
    if (phone) updatedFields.phone = phone
    if (referrerId) updatedFields.referrerId = referrerId

    console.error(updatedFields)
    const [rowsUpdated] = await Client.update(updatedFields, {
      where: { id },
    })

    if (rowsUpdated === 0) {
      throw new Error('Client not found or no changes made')
    }

    const updatedClient = await Client.findByPk(id, {
      attributes: {
        include: [
          [
            Sequelize.fn(
              'COUNT',
              Sequelize.literal('CASE WHEN Loans.status = \'active\' THEN 1 ELSE NULL END'),
            ),
            'activeLoanCount',
          ],
        ],
      },
      include: [
        {
          model: Loan,
          attributes: [],
          where: { status: 'active' },
          required: false,
        },
      ],
    })

    return updatedClient
  } catch (error) {
    console.error('Error updating client:', error)
    throw error
  }
}

export const service = {
  create: createClient,
  getClient,
  getClients: getPaginatedClients,
  update: updateClient,
}
