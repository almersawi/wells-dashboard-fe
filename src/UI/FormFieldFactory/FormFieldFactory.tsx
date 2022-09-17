import { FormInstance } from "antd";
import {
  DateField,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
} from "UI/Forms";
import React from "react";
import { FieldDetail, FIELD_DETAIL_TYPE } from "@verg/api-service";
import FieldsDetailUtil from "utils/fieldsDetail.util";

type Props<T> = {
  disabled?: boolean;
  field: FieldDetail<T>;
  fieldsToSkip?: string[];
  form?: FormInstance<any>;
  format?: string;
  id?: string;
  isTextAreaField?: boolean;
  manualOrDropdownFields?: string[];
  required?: boolean;
  showTime?: boolean;
  tempId?: string;
};

const TEXT_AREA_FIELDS = [
  "tomorrows_operations",
  "remarks",
  "operation_requested",
  "bpv_remarks",
  "test_status_remarks",
];
export default function FormFieldFactory<T>({
  disabled = false,
  field,
  fieldsToSkip = [],
  format,
  id,
  isTextAreaField = false,
  required = false,
  showTime = false,
  // todo remove tempId
  tempId,
}: Props<T>) {
  const label = id || FieldsDetailUtil.getFieldLabel(field);
  // Todo
  const fieldId = tempId || field.id;

  if (fieldsToSkip.includes(field.id as string)) {
    return null;
  }

  if (TEXT_AREA_FIELDS.includes(field.id as string) || isTextAreaField) {
    return (
      <TextAreaField
        id={field.id as string}
        label={label}
        required={required}
      />
    );
  }

  switch (field.type) {
    // TODO number select field
    case FIELD_DETAIL_TYPE.ENUM_NUMBER:
    case FIELD_DETAIL_TYPE.ENUM_STRING:
      return (
        <SelectField
          disabled={disabled}
          id={fieldId as string}
          label={label}
          options={field.values}
          required={required}
        />
      );

    case FIELD_DETAIL_TYPE.STRING:
      return (
        <TextField
          disabled={disabled}
          id={fieldId as string}
          label={label}
          required={required}
        />
      );

    case FIELD_DETAIL_TYPE.NUMBER:
      return (
        <NumberField
          disabled={disabled}
          id={fieldId as string}
          label={label}
          required={required}
        />
      );
    // TODO: split these to not need to pass in time format
    case FIELD_DETAIL_TYPE.TIME:
    case FIELD_DETAIL_TYPE.DATE:
      return (
        <DateField
          id={fieldId as string}
          label={label}
          required={required}
          showTime={showTime}
          format={format}
        />
      );

    default:
      return null;
  }
}
