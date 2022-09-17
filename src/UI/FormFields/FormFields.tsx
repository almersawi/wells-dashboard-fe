import { FormInstance } from "antd";
import FormFieldFactory from "../FormFieldFactory";
import React from "react";
import { FieldsDetails } from "@verg/api-service";

type Props<T> = {
  dateFormats?: { [fieldId: string]: string };
  form?: FormInstance<any>;
  fieldsDetails: FieldsDetails<T>;
  fieldsToSkip?: string[];
  manualOrDropdownFields?: string[];
  requiredFields?: string[];
  requireAll?: boolean;
  textAreaFields?: string[];
  textAreaFieldsAll?: boolean;
  timeFieldIds?: Array<string>;
};
// todo handle select multiple field
export default function FormFields<T>({
  dateFormats = {},
  form,
  fieldsDetails,
  fieldsToSkip,
  manualOrDropdownFields,
  requiredFields = [],
  requireAll = false,
  textAreaFields = [],
  textAreaFieldsAll = false,
  timeFieldIds = [],
}: Props<T>) {
  return (
    <>
      {fieldsDetails.map((f, i) => (
        <FormFieldFactory
          key={i}
          field={f}
          fieldsToSkip={fieldsToSkip}
          format={dateFormats?.[f?.id as string]}
          form={form}
          manualOrDropdownFields={manualOrDropdownFields}
          required={requireAll || requiredFields.includes(f?.id as string)}
          isTextAreaField={
            textAreaFieldsAll || textAreaFields.includes(f.id as string)
          }
          showTime={timeFieldIds.includes(f?.id as string)}
        />
      ))}
    </>
  );
}
