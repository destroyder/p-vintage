export default function formatDate(date: string) {
  const utcDateTime = new Date(date);
  const japanTime = new Date(utcDateTime.getTime() + 9 * 60 * 60 * 1000);
  const year = japanTime.getFullYear();
  const month = japanTime.getMonth() + 1;
  const day = japanTime.getDate();
  return `${year}/${month}/${day}`;
}
