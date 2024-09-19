import dayjs from "dayjs";

function convertPrismaDateToDateString(date: number | string) {
  let dateObj = new Date(date);
  return dayjs(dateObj).format("DD/MM/YYYY").toString();
}

function convertUnixToDateString(date: number) {
  let dateObj = dayjs.unix(date);
  return dayjs(dateObj).format("DD/MM/YYYY").toString()
}

function convertPrismaDateToEpoch(date: number) {
  let dateObj = new Date(date)
  return dayjs(dateObj).format("x")
}

function delay(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export { convertPrismaDateToDateString, convertPrismaDateToEpoch, convertUnixToDateString, delay };