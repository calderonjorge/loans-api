import { request, response } from 'express'
import { service } from '../services/client.service.js'
import { OK, INTERNAL_SERVER_ERROR } from '../constants/https-status-codes.js'

export const controller = {
  async create(req = request, res = response) {
    try {
      const data = await service.create({ ...req.body })
      res
        .json({
          ok: true,
          msg: 'Se ha registrado el cliente',
          data,
        })
        .status(OK)
    } catch (error) {
      console.error(error)
      res.status(INTERNAL_SERVER_ERROR).json({ ok: false, error: 'Internal server error' })
    }
  },
  async getClients(req = request, res = response) {
    try {
      const { page, pageSize } = req.query
      const data = await service.getClients({ page, pageSize })
      res.json(data).status(OK)
    } catch (error) {
      console.error(error)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
    }
  },
  async getClient(req = request, res = response) {
    try {
      const { id } = req.params
      const data = await service.getClient({ id })
      res.json(data).status(OK)
    } catch (error) {
      console.error(error)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
    }
  },
  async update(req = request, res = response) {
    try {
      const data = await service.update({ ...req.body })

      return res
        .json({
          ok: true,
          msg: 'Se ha actualizado el cliente',
          data,
        })
        .status(OK)
    } catch (error) {
      console.error(error)
      res.status(INTERNAL_SERVER_ERROR).json({ error: 'Algo salio mal al intenar actualizar el Cliente' })
    }
  },
}
