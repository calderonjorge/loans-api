import { Payment } from '../models/index.js'

const create = async ({ ...data }) => {
  try {
    console.log('loan creation', data)
    const resp = await Payment.create({ ...data })

    return resp
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

const getPayments = async () => {
  try {
    const loans = await Payment.findAll()
    return loans
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

const getPayment = async ({ id }) => {
  try {
    const loanDetails = await Payment.findOne({
      where: { id },
    })

    return loanDetails
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const service = {
  create,
  getPayment,
  getPayments,
}
