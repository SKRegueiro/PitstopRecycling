function getWeekStartAndEndDates() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const startOfWeek = new Date(now);
  const endOfWeek = new Date(now);

  // Set to the start of the week (Sunday)
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day

  // Set to the end of the week (Saturday)
  endOfWeek.setDate(now.getDate() + (6 - dayOfWeek));
  endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the day

  return { startOfWeek, endOfWeek };
}

export default getWeekStartAndEndDates;
