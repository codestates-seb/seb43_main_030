const dateCalculate = date => {
  const createdAt = new Date(date);

  const formattedDate = createdAt
    .toLocaleDateString('en-GB', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');

  const [day, month, year] = formattedDate.split('.');

  return `${year}.${month}.${day}`;
};

export default dateCalculate;
