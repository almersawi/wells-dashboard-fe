import dayjs from "dayjs";

export function isInvalidDate(value: any) {
  return !dayjs(value).isValid();
}

export function getDate(value: Date | undefined | "None" | string) {
  return isInvalidDate(value) ? undefined : dayjs(value).format("DD/MM/YYYY");
}

export default class DateUtil {
  public static getYearList(startYear: number, endYear: number) {
    const numYears = endYear - startYear + 1;
    const YEARS = Array(numYears)
      .fill(endYear)
      .map((year, i) => year - i)
      .sort((a, b) => b - a);
    return YEARS;
  }
}
