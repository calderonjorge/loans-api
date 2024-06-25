import { response } from 'express'
import { validationResult } from 'express-validator'
import { BAD_REQUEST } from '../constants/https-status-codes.js'

export const validateFields = (req, res = response, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({
      ok: false,
      errors: errors.mapped(),
    })
  }

  next()
}
