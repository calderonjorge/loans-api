export const numberOfMonthsBetweenTwoDates = (startDate = '', endDate = '') => {

  const start = new Date(startDate);
  const end = new Date(endDate);
  const numberOfMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  return numberOfMonths
}