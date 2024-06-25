export function calculateTotalLoanAmount({ amount, percentage, numberOfMonths }) {
  const interest = +amount * (percentage / 100) * numberOfMonths;

  const totalAmount = +amount + interest;

  return totalAmount;
}