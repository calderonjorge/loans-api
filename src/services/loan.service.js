import { Loan, Client, Payment } from '../models/index.js'

const create = async ({
  amount,
  clientId,
  periodicPayments,
  status = 'active',
  description,
  startDate,
  endDate,
  percentage,
}) => {
  try {
    const resp = await Loan.create({
      amount,
      periodicPayments,
      ClientId: clientId,
      status,
      description,
      startDate,
      endDate,
      percentage,
    })

    const loan = await Loan.findOne({
      where: resp.id,
      include: [
        {
          model: Client,
          attributes: ['name'],
        },
      ],
    })

    return loan
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

const getLoans = async () => {
  try {
    const loans = await Loan.findAll({
      include: [
        {
          model: Client,
          attributes: ['name'],
        },
      ],
      order: [
        // ['status', 'DESC'], // Ordenar por 'active' (activos primero) TODO: CHECAR con el nuevo ordenamiento
        ['startDate', 'DESC'],
      ],
    })
    return loans
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
        { model: Client, attributes: ['name', 'phone', 'id'] },
        { model: Payment, attributes: ['paymentDate', 'amountToPay', 'status', 'id'] },
      ],
      attributes: [
        'id',
        'amount',
        'periodicPayments',
        'status',
        'description',
        'startDate',
        'endDate',
        'percentage',
      ],
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
