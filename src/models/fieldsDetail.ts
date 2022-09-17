import { FieldDetail } from "@verg/api-service";

export type FieldDetailType<T> = FieldDetail<T> & { required?: boolean };
export type FieldsDetailType<T> = Array<FieldDetailType<T>>;
