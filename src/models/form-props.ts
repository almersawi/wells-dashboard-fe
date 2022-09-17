import { FieldsDetailType } from "./fieldsDetail";

export type FormProps<T> = {
  closeHandler: () => void;
  selected: T;
  fieldDetails: FieldsDetailType<T>;
};
