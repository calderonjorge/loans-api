import { db } from '../db/index.js';

export const getLoanById = ({ id }) => {
  console.log(id);
  try {
    const query = `
    SELECT
      L.id AS loanId,
      L.clientId,
      C.name AS clientName,
      L.loanAmount,
      L.monthlyPayments,
      L.referral,
      P.paymentDate,
      P.amountPaid,
      P.status
    FROM
        Loans AS L
    JOIN
        Clients AS C ON L.clientId = C.id
    LEFT JOIN
        Payments AS P ON L.id = P.loanId
    WHERE
        L.id = ?;
`;

    const stmt = db.prepare(query);
    const result = stmt.get(id);

    return result;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default {
  getLoanById,
};
