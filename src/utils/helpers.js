import { format } from "date-fns";

export function dayDifference(checkin, checkout) {
  //the number of days of reservation
  if (!checkin) return;
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
export const getDateInRange = (checkin, checkout) => {
  //the dates of the reservation
  const date = new Date(checkin.getTime());
  const dates = [];
  while (date <= checkout) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }
  return dates;
};
export const checkRoomAvailability = (room, allDates) => {
  const isFound = room.unavailableDates.some((date) => {
    return allDates.includes(new Date(date).getTime());
  });
  return isFound;
};
