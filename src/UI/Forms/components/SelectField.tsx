import { Form, Select } from "antd";
import React from "react";

type Props = {
  disabled?: boolean;
  id: string;
  label: string;
  options: string[] | number[];
  onChange?: (str: string) => void;
  required?: boolean;
  dataCy?: string;
  defaultValue?: string | number | null;
};

export default function SelectField({
  disabled,
  label,
  id,
  options,
  onChange,
  required,
  dataCy,
  defaultValue,
}: Props) {
  return (
    <React.StrictMode>
      <Form.Item
        key={id}
        label={label}
        name={id}
        rules={[{ required, message: "Required" }]}
        initialValue={defaultValue}
      >
        <Select
          onChange={(value) => onChange && onChange(value as string)}
          disabled={disabled}
          data-cy={dataCy}
          className="!w-full"
          listItemHeight={10} // render up to 250/10 (25 items)
          listHeight={250}
        >
          {options?.map((option) => (
            <Select.Option
              key={option}
              value={option}
              data-cy={`${dataCy}-option`}
            >
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </React.StrictMode>
  );
}
