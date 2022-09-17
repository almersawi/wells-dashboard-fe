import { Form, Select } from "antd";
import React from "react";

export type SelectOptions = Array<{
  label: string;
  value: string | boolean | number;
}>;

type Props = {
  defaultValue?: string;
  disabled?: boolean;
  id: string;
  label: string;
  options: SelectOptions;
  onChange?: (str: string) => void;
  required?: boolean;
  mode?: "multiple" | "tags" | undefined;
  className?: string;
};

export default function SelectOtherField({
  defaultValue,
  disabled,
  label,
  id,
  options,
  onChange,
  required,
  mode,
  className,
}: Props) {
  return (
    <Form.Item
      key={id}
      label={label}
      name={id}
      rules={[{ required, message: "Required" }]}
      className={className}
    >
      <Select
        mode={mode}
        defaultValue={defaultValue}
        onChange={(value) => onChange && onChange(value as string)}
        disabled={disabled}
        className="!w-full"
        filterOption={(input, option) =>
          String(option?.children)
            ?.toLowerCase()
            ?.indexOf(input?.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          String(optionA?.children)
            ?.toLowerCase()
            ?.localeCompare(String(optionB?.children)?.toLowerCase())
        }
      >
        {options?.map((option, i) => (
          <Select.Option key={i} value={option?.value}>
            {option?.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
