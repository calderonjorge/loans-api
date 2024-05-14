import { Loan, Client, Payment } from '../models/index.js'

const create = async ({ amount, ClientId, periodicPayments, active }) => {
  try {
    const resp = await Loan.create({
      amount,
      periodicPayments,
      ClientId,
      active,
    })

    return resp
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

const getLoans = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize
    const limit = pageSize

    const { count, rows } = await Loan.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: Client,
          attributes: ['name'],
        },
      ],
    })

    const totalPages = Math.ceil(count / pageSize)

    return {
      total: count,
      currentPage: page,
      pageSize: pageSize,
      totalPages: totalPages,
      loans: rows,
    }
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

const getLoan = async ({ id }) => {
  try {
    const loanDetails = await Loan.findOne({
      where: { id },
      include: [
        { model: Client, attributes: ['name', 'phone'] },
        { model: Payment, attributes: ['paymentDate', 'amountPaid', 'status'] },
      ],
      attributes: ['id', 'ClientId', 'amount', 'periodicPayments', 'createdAt'],
    })

    return loanDetails
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const service = {
  create,
  getLoans,
  getLoan,
}
