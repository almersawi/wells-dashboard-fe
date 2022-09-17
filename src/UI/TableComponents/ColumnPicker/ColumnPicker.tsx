import { TableOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import classNames from "classnames";
import { FieldsDetailType } from "models/fieldsDetail";
import React from "react";

type Props<T> = {
  fieldDetails: FieldsDetailType<T>;
  selectedColumns: string[];
  setSelectedColumns: (selectedColumns: string[]) => void;
  className?: string;
};

export default function ColumnPicker<T>({
  fieldDetails,
  selectedColumns,
  setSelectedColumns,
  className,
}: Props<T>) {
  function handleClick(column: string) {
    if (selectedColumns.includes(column)) {
      const updatedColumns = selectedColumns.filter((id) => id !== column);
      setSelectedColumns(updatedColumns);
      return;
    }
    setSelectedColumns([...selectedColumns, column]);
  }

  return (
    <Popover
      placement="top"
      title={null}
      content={
        <div className="max-h-[60vh] overflow-auto">
          {fieldDetails.map(({ name, id }, i) => {
            const classNameVar = classNames({
              "cursor-pointer text-sm p-1": true,
              "text-[#6366f1]": selectedColumns.includes(id as string),
            });

            return (
              <div
                key={i}
                className={classNameVar}
                onClick={() => handleClick(id as string)}
              >
                {name}
              </div>
            );
          })}
        </div>
      }
      trigger="click"
    >
      <Button className={`mr-4 ${className}`} icon={<TableOutlined />} />
    </Popover>
  );
}
