// hooks/useUzbekMonthName.ts
import { Dayjs } from "dayjs";

// Month names in Uzbek
const uzbekMonths = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentyabr", "Oktabr", "Noyabr", "Dekabr"
];

export const useUzbekMonthName = (date: Dayjs) => {
  const monthName = uzbekMonths[date.month()]; // month is 0-indexed
  const year = date.year();
  return `${monthName}, ${year}`;
};

export const useUzbekMonth = (date: Dayjs) => {
  const monthName = uzbekMonths[date.month()];
  return `${monthName}`;
};