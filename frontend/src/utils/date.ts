export const formatDate = (date: string | Date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const getPastDate = (date: string | Date, daysAgo: number) => {
  const today = new Date(date);
  return new Date(today.setDate(today.getDate() - daysAgo));
};
