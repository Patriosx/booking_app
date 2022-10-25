import { format } from "date-fns";

export function dayDifference(checkin, checkout) {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const timeDiff = Math.abs(checkin.getTime() - checkout.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
}
export const formatDate = (dates) => {
  const startingDate = format(dates[0].startDate, "dd/MM/yyyy");
  const endingDate = format(dates[0].endDate, "dd/MM/yyyy");
  return `${startingDate} - ${endingDate}`;
};
