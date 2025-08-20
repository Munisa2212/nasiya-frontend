export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",  // Nov
    day: "numeric",  // 1
    year: "numeric", // 2024
    hour: "2-digit", // 14
    minute: "2-digit", // 51
    hour12: false, // 24-hour format
  };

  return date.toLocaleString("en-US", options);
}


export function formatDate2(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}.${month}.${year}`;
}


export function getTimeFromDate(dateStr: string): string {
  const date = new Date(dateStr);
  
  // If you want UTC time:
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
  return `${hours}:${minutes}`;
}