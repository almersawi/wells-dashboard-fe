import { isNaN, isNil } from "lodash/";

export default class ValueUtil {
  public static isNilorNaN(value: any) {
    return isNil(value) || isNaN(value);
  }

  public static getValue(value: number | string | Date | undefined) {
    return isNil(value) ? "" : (value as string | number | Date);
  }

  public static getNumberValue(
    value: number | undefined | null,
    decimalPlaces = 3
  ) {
    if (isNil(value)) {
      return "";
    }

    const modifier = Math.pow(10, decimalPlaces);
    return Math.round(value * modifier) / modifier;
  }

  public static isRoundedValuesEqual(
    a: number | undefined,
    b: number | undefined
  ) {
    const isInvalidValues = ValueUtil.isNilorNaN(a) && ValueUtil.isNilorNaN(b);
    return isInvalidValues ? false : Math.round(a!) === Math.round(b!);
  }
}
