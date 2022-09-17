import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timeZonePlugin from "dayjs/plugin/timezone";
import utcPlugin from "dayjs/plugin/utc";
import moment from "moment";
import { TIME_ZONE } from "models/date.model";

dayjs.extend(utcPlugin);
dayjs.extend(timeZonePlugin);
dayjs.extend(relativeTime);
// TODO: Timezone
export default class DateService {
  private timeZone = TIME_ZONE;
  static instance: DateService;

  static init({ timeZone }: { timeZone: TIME_ZONE }) {
    DateService.instance = new DateService({ timeZone });
  }

  constructor({ timeZone }: { timeZone: TIME_ZONE }) {
    // @ts-ignore
    this.timeZone = timeZone;
    dayjs.tz.setDefault(timeZone);
  }

  public getDate(value: Date | undefined | "None" | string) {
    if (!this.isInvalidDate(value)) {
      return dayjs(value).tz().format("DD-MM-YYYY");
    }
  }

  public getDateToStore(date?: Date | undefined | null | string) {
    return this.isInvalidDate(date) ? null : dayjs(date).tz().toISOString();
  }

  public getDateTime(value: Date | undefined | "None" | string) {
    if (!this.isInvalidDate(value)) {
      return dayjs(value).tz().format("DD-MM-YYYY - HH:mm:ss");
    }
  }

  public getReportDate(date?: string | Date) {
    if (!this.isInvalidDate(date)) {
      return dayjs(date).tz().format("YYYYMMDD");
    }
  }

  public getDateForNativeInput(date?: string | Date) {
    if (!this.isInvalidDate(date)) {
      return dayjs(date).tz().format("YYYY-MM-DD");
    }
  }

  public isInvalidDate(value: any) {
    return !value || value === "None" || !dayjs(value).isValid();
  }

  // TODO: change type to string | undefined
  public dateToMilliseconds(date: Date | string | undefined) {
    return this.isInvalidDate(date) ? null : dayjs(date).tz().valueOf();
  }

  public getTimezoneDiff() {
    const time = "2021-11-12T00:00";
    const localDate = dayjs.tz(time, dayjs.tz.guess());
    const appTimezoneDate = dayjs.tz(time, this.timeZone?.toString());
    return appTimezoneDate.diff(localDate, "hour");
  }

  public getTimeInAppTimezone(time: string) {
    if (this.isInvalidDate(time)) {
      return null;
    }
    const timezoneDiff = this.getTimezoneDiff();
    const dateInAppTimeZone = new Date(new Date(time)?.setHours(timezoneDiff));
    return this.getDateToStore(dateInAppTimeZone);
  }

  public setMomentTimeZone = () => {
    // momentTimezone.tz.setDefault(this.timeZone.toString());
  };

  public getFormDateValue = (value: string | undefined) => {
    if (!this.isInvalidDate(value)) {
      return moment(value);
    }
  };

  public getRelativeTime = (time: string | undefined) => {
    return dayjs().to(dayjs(time));
  };
}
