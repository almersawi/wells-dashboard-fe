import { FIELD_DETAIL_TYPE } from "@verg/api-service";
import { FieldDetailType, FieldsDetailType } from "models/fieldsDetail";
import DateService from "services/date.service";
import ValueUtil from "./value.util";

export default class FieldsDetailUtil {
  public static filterInitialFieldsDetail<T>(
    fieldsDetail: FieldsDetailType<T> | undefined
  ) {
    return (
      fieldsDetail?.filter(
        (field) =>
          ![
            "created_at",
            "Created at",
            "id",
            "sub",
            "",
            "root_well_id",
            "parent",
            "parent_date",
            "instance_of",
          ].includes(field?.id as string)
      ) ?? []
    );
  }

  public static getField<T>(
    fieldsDetail: FieldsDetailType<T> | undefined,
    id: string
  ) {
    return fieldsDetail?.find((field) => field.id === id);
  }

  public static getFields<T>(
    fieldsDetail: FieldsDetailType<T> | undefined,
    ids: string[]
  ) {
    return (
      fieldsDetail?.filter((field) => ids.includes(field.id as string)) ?? []
    );
  }

  // rename to omitFields
  public static skipFields<T>(
    fieldsDetail: FieldsDetailType<T> | undefined,
    ids: string[]
  ) {
    return (
      fieldsDetail?.filter((field) => !ids.includes(field.id as string)) ?? []
    );
  }

  public static getFieldLabel<T>(field: FieldDetailType<T> | undefined) {
    return !field?.unit || field?.unit === "None"
      ? field?.name ?? ""
      : `${field.name} (${field.unit})`;
  }

  public static getFieldValue<T>(field: FieldDetailType<T>, value: any) {
    if (field?.type === "date") {
      return new Date(value).toDateString();
    }

    if (field?.type === "time") {
      return ValueUtil.getValue(DateService.instance.getDateTime(value));
    }

    return ValueUtil.getValue(value);
  }

  public static getDateTimeFields<T>(fields: FieldsDetailType<T>) {
    return fields?.filter((p) =>
      [FIELD_DETAIL_TYPE.TIME, FIELD_DETAIL_TYPE.DATE].includes(p.type)
    );
  }

  public static getDateTimeFieldIds<T>(fields: FieldsDetailType<T>) {
    return FieldsDetailUtil.getDateTimeFields(fields).map((p) => p?.id);
  }
}
