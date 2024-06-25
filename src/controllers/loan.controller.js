import { request, response } from 'express'
import { service } from '../services/loan.service.js'
import { service as loanService } from '../services/payment.service.js'
import { calculateTotalLoanAmount, numberOfMonthsBetweenTwoDates } from '../utils/index.js'
import { OK, INTERNAL_SERVER_ERROR } from '../constants/https-status-codes.js'

export const controller = {
  async create(req = request, res = response) {
    try {
      const loan = await service.create({ ...req.body })

      const { id, periodicPayments, startDate, endDate, amount, percentage } = loan
      console.log({ id, periodicPayments, startDate, endDate, amount, percentage })

      if (!periodicPayments) {

        const numberOfMonths = numberOfMonthsBetweenTwoDates(startDate, endDate)
        const amountToPay = calculateTotalLoanAmount({ amount, numberOfMonths, percentage })
        console.log(amountToPay)
        const payment = await loanService.create({ paymentDate: endDate, LoanId: id, status: 'pending', amountToPay })
      }

      return res
        .json({
          ok: true,
          msg: 'Se ha registrado el prestamo',
          data: {
            loan,
          },
        })
        .status(OK)
    } catch (error) {
      console.error(error)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
    }
  },

  async getLoan(req = request, res = response) {
    try {
      const data = await service.getLoan({ id: req.params.id })
      res.json(data).status(OK)
    } catch (error) {
      console.error(error)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
    }
  },

  async getLoans(_ = request, res = response) {
    try {
      const data = await service.getLoans()
      res.json(data).status(OK)
    } catch (error) {
      console.error(error)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
    }
  },
}
