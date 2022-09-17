import {
  FieldDetail,
  FieldsDetailUtil,
  FIELD_DETAIL_TYPE,
} from "@verg/api-service";
import { toLower } from "lodash";
import { ReactNode } from "react";
import dateService from "services/date.service";
import ValueUtil from "./value.util";

export default class TableUtil {
  public static tableSorter(
    a: { [key: string]: any },
    b: { [key: string]: any },
    id: string | undefined,
    type: any
  ) {
    try {
      if (!type || !id) {
        return false;
      }
      if (
        [
          FIELD_DETAIL_TYPE.DATE,
          FIELD_DETAIL_TYPE.ENUM_STRING,
          FIELD_DETAIL_TYPE.STRING,
          FIELD_DETAIL_TYPE.TEXT,
        ].includes(type)
      ) {
        const aStr = a?.[id] ?? "";
        const bStr = b?.[id] ?? "";
        return aStr?.localeCompare(bStr);
      }

      if (
        [
          FIELD_DETAIL_TYPE.NUMBER,
          FIELD_DETAIL_TYPE.ENUM_NUMBER,
          FIELD_DETAIL_TYPE.TIME,
        ].includes(type)
      ) {
        const aNum = a?.[id] ?? 0;
        const bNum = b?.[id] ?? 0;
        return aNum - bNum;
      }
    } catch (error) {
      return false;
    }
    return false;
  }

  public static columnFromFieldsDetail<EntityModel>(
    fieldsDetail: FieldDetail<EntityModel>
  ) {
    return this.getColumn({
      title: FieldsDetailUtil.getFieldNameWithUnit<EntityModel>(fieldsDetail),
      id: fieldsDetail?.id! as string,
      type: fieldsDetail?.type!,
      isDate: fieldsDetail?.type === FIELD_DETAIL_TYPE.DATE,
      isTime: fieldsDetail?.type === FIELD_DETAIL_TYPE.TIME,
    });
  }

  public static columnsFromFieldsDetail<EntityModel>(
    fields: FieldDetail<EntityModel>[],
    fieldToSkip: Array<keyof EntityModel> | undefined = []
  ) {
    return FieldsDetailUtil.omitFields<EntityModel>(fields, fieldToSkip).map(
      (fieldsDetail) =>
        TableUtil.columnFromFieldsDetail<EntityModel>(fieldsDetail)
    );
  }

  public static getColumn({
    extra,
    id,
    isDate = false,
    isMain = false,
    isTime = false,
    title,
    type,
    render,
    sortEnabled = true,
  }: {
    id: string;
    title: string;
    type: FIELD_DETAIL_TYPE;
    isDate?: boolean;
    isMain?: boolean;
    isTime?: boolean;
    render?: (
      value: any,
      row: any,
      idx?: any
    ) => ReactNode | string | number | Date | undefined | null;
    sortEnabled?: boolean;
    extra?: any;
  }) {
    return {
      title,
      dataIndex: id,
      key: id,
      sorter: sortEnabled
        ? (a: any, b: any) => TableUtil.tableSorter(a, b, id, type)
        : undefined,
      render: this.getColumnRenderer({
        isDate,
        isMain,
        isTime,
        render,
      }),
      ...extra,
    };
  }

  public static getColumnRenderer({
    isDate,
    isMain,
    isTime,
    render,
  }: {
    isDate?: boolean;
    isMain?: boolean;
    isTime?: boolean;
    render:
      | ((
          value: any,
          row: any,
          idx?: any
        ) => ReactNode | string | number | Date | undefined | null)
      | undefined;
  }) {
    if (render) {
      return render;
    }

    if (isDate) {
      return TableUtil.dateColumnRender;
    }

    if (isTime) {
      return TableUtil.timeColumnRender;
    }

    if (isMain) {
      return TableUtil.mainColumnRender;
    }
    return undefined;
  }

  public static dateColumnRender(date: string) {
    return date && ValueUtil.getValue(dateService.getDate(date));
  }

  public static timeColumnRender(date: Date) {
    return date && ValueUtil.getValue(dateService.getDateTime(date));
  }

  public static mainColumnRender(value: any) {
    return {
      props: {
        style: { fontWeight: 600 },
      },
      children: value,
    };
  }

  public static searchData<T>(data: Array<T>, searchStr: string | undefined) {
    return searchStr
      ? data?.filter((d) =>
          Object.values(d).some((value) =>
            toLower(value?.toString())?.includes(toLower(searchStr))
          )
        )
      : data;
  }
}
