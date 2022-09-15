import { FieldDetail } from "@verg/api-service";
import { isNaN, isNil, upperFirst } from "lodash/";
import dateService from "services/date.service";

export default class ValueUtil {
  public static isNilOrNaN(value: any) {
    return isNil(value) || isNaN(value);
  }

  public static getValue(value: number | string | undefined | null) {
    return isNil(value) ? "" : (value as string | number);
  }

  public static formatNumber(value: number | undefined | null) {
    return value
      ? value?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })
      : value;
  }

  public static getFieldsDetailValue<EntityModel>(
    field: FieldDetail<EntityModel>,
    value: any
  ) {
    if (field?.type === "date") {
      return dateService.getDate(value);
    }

    if (field?.type === "time") {
      return ValueUtil.getValue(dateService.dateToDateTime(value));
    }

    return ValueUtil.getValue(value);
  }

  public static getOrdinalNumber(number: number) {
    const suffix = ["th", "st", "nd", "rd"];
    const remainder = number % 100;
    return (
      number + (suffix[(remainder - 20) % 10] || suffix[remainder] || suffix[0])
    );
  }

  public static formatNumberAbbreviation(num: number) {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return ValueUtil.formatNumber(num);
  }

  public static camelCaseToPascalCase(str: string | undefined) {
    return upperFirst(str?.replace(/_/g, " "));
  }
}
