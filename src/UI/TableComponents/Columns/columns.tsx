import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import FieldsDetailUtil from "utils/fieldsDetail.util";
import TableUtil from "utils/table.util";
import ValueUtil from "utils/value.util";
import EditButton from "UI/Buttons/EditButton";
import React, { ReactNode } from "react";
import DateService from "services/date.service";
import { FieldsDetailType } from "models/fieldsDetail";
import { FIELD_DETAIL_TYPE } from "@verg/api-service";

export function includeInDrawingColumn() {
  return {
    width: 146,
    title: "Include In Drawing",
    fixed: "left" as "left",
    align: "center" as "center",
    render: (_: undefined, row: any) =>
      row.include_in_drawing === "Yes" ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <CloseCircleTwoTone twoToneColor="red" />
      ),
  };
}

export function editColumn<T>({ onClick }: { onClick: (row: T) => void }) {
  return {
    title: "Edit",
    fixed: "left" as "left",
    width: 50,
    align: "center" as "center",
    render: (_: undefined, row: T) => (
      <EditButton onClick={() => onClick(row)} size="middle" />
    ),
  };
}

// is main
export function getColumn({
  extra,
  id,
  isDate = false,
  isMain = false,
  isTime = false,
  title,
  type,
  customRender,
  sort = true,
}: {
  extra?: any;
  id: string;
  title: string;
  type: string; // Field_Detail_Type;
  isDate?: boolean;
  isMain?: boolean;
  isTime?: boolean;
  customRender?: (
    value: any,
    row: any,
    idx?: any
  ) => ReactNode | string | number | Date | undefined | null;
  sort?: boolean;
}) {
  return {
    title,
    dataIndex: id,
    key: id,
    sorter: sort
      ? (a: any, b: any) => TableUtil.tableSorter(a, b, id, type)
      : undefined,
    render: columnRender(isDate, isMain, isTime, customRender),
    ...extra,
  };
}

function columnRender(
  isDate: boolean,
  isMain: boolean,
  isTime: boolean,
  customRender: any
) {
  if (customRender) {
    return customRender;
  }
  if (isDate) {
    return dateColumnRender;
  }

  if (isTime) {
    return timeColumnRender;
  }

  if (isMain) {
    return mainColumnRender;
  }
}

function dateColumnRender(date: string) {
  return (
    date && (ValueUtil.getValue(DateService.instance.getDate(date)) as any)
  );
}

function timeColumnRender(date: Date) {
  return (
    date && (ValueUtil.getValue(DateService.instance.getDateTime(date)) as any)
  );
}

function numberColumnRender(number: number | undefined) {
  return ValueUtil.getNumberValue(number);
}

function booleanColumnRender(val: boolean) {
  return val ? "Yes" : "No";
}

function mainColumnRender(value: any, row: any) {
  return {
    props: {
      style: { fontWeight: 600 },
    },
    children: value, // getValue(value),
  };
}

export function columnFromFieldsDetail<T>(
  fieldsDetail: FieldsDetailType<T>,
  id: string
) {
  const field = FieldsDetailUtil.getField(fieldsDetail, id);

  if (field) {
    return {
      title: FieldsDetailUtil.getFieldLabel(field),
      dataIndex: field.id,
      key: field.id,
    };
  }
}

// todo replace getColum with this
export function columnFromFieldsDetails<T>(
  fields: FieldsDetailType<T> = [],
  fieldToSkip: string[] | undefined = [],
  filterData?: { [key: string]: any },
  disabledSorting?: boolean
) {
  const fieldsToUse = fields.filter(
    (field) => !fieldToSkip.includes(field?.id as string)
  );

  return fieldsToUse.map((field) => ({
    title: FieldsDetailUtil.getFieldLabel(field),
    dataIndex: field.id,
    key: field.id,
    sorter: disabledSorting
      ? undefined
      : (a: any, b: any) =>
          TableUtil.tableSorter(a, b, field.id as string, field.type),
    render: getRenderer(field?.type),
    filters: filterData
      ? filterData?.[field?.id as string]?.map((value: any) => ({
          text: value,
          value,
        }))
      : undefined,
    onFilter: filterData
      ? (value: any, record: any) =>
          String(record?.[field?.id])?.indexOf(value) === 0
      : undefined,
  }));
}

function getRenderer(type: string) {
  switch (type) {
    case FIELD_DETAIL_TYPE.DATE:
      return dateColumnRender;

    case FIELD_DETAIL_TYPE.TIME:
      return timeColumnRender;

    case FIELD_DETAIL_TYPE.NUMBER:
      return numberColumnRender;

    default:
  }
}
