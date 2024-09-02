import dayjs from "dayjs";

function convertPrismaDateToDateString(date: number) {
  let dateObj = new Date(date);
  return dayjs(dateObj).format("DD/MM/YYYY").toString();
}

function convertPrismaDateToEpoch(date: number) {
  let dateObj = new Date(date)
  return dayjs(dateObj).format("x")
}

export { convertPrismaDateToDateString, convertPrismaDateToEpoch };