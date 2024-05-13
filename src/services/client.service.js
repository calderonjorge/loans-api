import { Client } from '../models/index.js';

export const createClient = async ({ name, phone }) => {
  try {
    console.log(name, phone);
    const resp = await Client.create({ name: 'jorge', phone: '77717272' });
    console.log(resp);

    return resp;
  } catch (error) {
    console.error('Error al obtener los detalles del préstamo:', error);
    throw error;
  }
};
