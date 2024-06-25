import authService from '../services/auth.service.js'

export const authController = {
  async login(_, res) {
    try {
      const data = await authService.login()
      res.json(data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}
