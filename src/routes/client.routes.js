import { Router } from 'express'
import { check } from 'express-validator'
import { controller } from '../controllers/client.controller.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const clientController = Router()

const baseValidations = [
  check('name', 'Name is required').notEmpty(),
  check('phone', 'Phone not valid').optional().isNumeric().isLength({ min: 7 }),
  check('referrerId', 'referrerId').optional().isNumeric(),
  validateFields,
]

clientController.post('/clients', baseValidations, controller.create)

clientController.put(
  '/clients',
  [check('id', 'Id is required').notEmpty(), ...baseValidations],
  controller.update,
)

clientController.get('/clients', controller.getClients)

clientController.get('/clients/:id', controller.getClient)
