import { FieldsDetails, FIELD_DETAIL_TYPE } from "@verg/api-service";
import { isEmpty } from "lodash";
import DateService from "services/date.service";

export default class FormUtil {
  public static getFormLabel = (isExisting: boolean) =>
    isExisting ? "Edit" : "Add";

    public static getFieldDate(value: string | undefined) {
      return DateService.getFormDateValue(value);
    }


    public static formatDateValues<T>(
      fields: T | undefined,
      fieldsDetails: FieldsDetails<T>
    ) {
      if (!fields || isEmpty(fieldsDetails)) {
        return {};
      }
      const dateTimeFieldNames = fieldsDetails?.filter( x => x.type === FIELD_DETAIL_TYPE.DATE)?.map( x => x.id)
      return Object.entries(fields).reduce((acc, [k, v]) => {
        const isDateTimeField = dateTimeFieldNames.includes(k as keyof T);
  
        const value = isDateTimeField ? this.getFieldDate(v) : v;
        return {
          ...acc,
          [k]: value,
        };
      }, {});
    }
  
    public static formatDatesToStore<T>(
      fields: T | undefined,
      dateFields: string[]
    ) {
      if (!fields || isEmpty(dateFields)) {
        return {};
      }
  
      return Object.entries(fields).reduce((acc, [k, v]) => {
        const isDateField = dateFields.includes(k);
        const value = isDateField ? DateService.getDateToStore(v) : v;
        return {
          ...acc,
          [k]: value,
        };
      }, {});
    }
}
