import { Router } from 'express'
import { check } from 'express-validator'
import { controller } from '../controllers/loan.controller.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const loanRouter = Router()

loanRouter.get('/loans/:id', controller.getLoan)

loanRouter.post(
  '/loans',
  [
    check('amount', 'Amount is required').notEmpty().isFloat(),
    check('periodicPayments', 'is required').notEmpty().isBoolean(),
    check('clientId', 'is required').notEmpty().isNumeric(),
    validateFields,
  ],
  controller.create,
)
