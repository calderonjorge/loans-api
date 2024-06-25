import { service as clientService } from '../services/client.service.js'
import { service as loanService } from '../services/loan.service.js'

function getDateDaysAgo(daysAgo) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date
}

export const createData = async () => {
  const clients = [
    clientService.create({ name: 'Jorge Calderon Peralta', phone: '7776654332' }),
    clientService.create({ name: 'Erick Lopez Ocampo', phone: '7776654332' }),
    clientService.create({ name: 'Ana Patricia Lopez', referrerId: 1 }),
  ]

  const loans = [
    loanService.create({
      clientId: 1,
      amount: 2500,
      periodicPayments: true,
      status: 'active',
      description: 'Es el primero que pide',
      startDate: getDateDaysAgo(50),
      endDate: new Date(),
      percentage: 20,
    }),

    loanService.create({
      clientId: 2,
      amount: 500,
      periodicPayments: false,
      status: 'active',
      startDate: getDateDaysAgo(90),
      endDate: new Date(),
      percentage: 20,
    }),
    loanService.create({
      clientId: 1,
      amount: 1500,
      periodicPayments: true,
      status: 'active',
      description: 'Se debe checar con el tio',
      startDate: getDateDaysAgo(90),
      endDate: new Date(),
      percentage: 10,
    }),
    loanService.create({
      clientId: 1,
      amount: 3000,
      periodicPayments: true,
      status: 'cancelled',
      description: 'Este prestamo se cancelo porque pago antes',
      startDate: getDateDaysAgo(120),
      endDate: new Date(),
      percentage: 20,
    }),
    loanService.create({
      clientId: 2,
      amount: 400,
      periodicPayments: false,
      status: 'liquidated',
      startDate: getDateDaysAgo(180),
      endDate: new Date(),
      percentage: 10,
    }),
    loanService.create({
      clientId: 3,
      amount: 2500,
      periodicPayments: true,
      status: 'cancelled',
      description: 'Se cancelo porque no ha podido pagar',
      startDate: getDateDaysAgo(50),
      endDate: new Date(),
      percentage: 10,
    }),
  ]

  await Promise.all([...clients])
}
