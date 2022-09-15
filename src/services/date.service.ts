import dayjs from "dayjs";

const isValidData = (date: string | undefined | null) => dayjs(date).isValid();

const getDate = (date: string | undefined | null) =>
  isValidData(date) ? null : dayjs(date).format("DD-MM-YYYY");

const dateToMilliseconds = (date: string | undefined | null) =>
  isValidData(date) ? null : dayjs(date).valueOf();

const dateToDateTime = (date: string | undefined | null) =>
  isValidData(date) ? null : dayjs(date).format("DD-MM-YYYY - HH:mm:ss");

export { dateToMilliseconds, dateToDateTime, getDate };

export default { dateToMilliseconds, dateToDateTime, getDate };
