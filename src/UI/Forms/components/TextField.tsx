import React from "react";
import { Form, Input } from "antd";

type Props = {
  disabled?: boolean;
  id: string;
  label: string;
  required?: boolean;
  dataCy?: string;
};

export default function TextField({
  disabled,
  id,
  label,
  required,
  dataCy,
}: Props) {
  return (
    <Form.Item
      key={id}
      label={label}
      name={id}
      rules={[{ required, message: "Required" }]}
    >
      <Input disabled={disabled} data-cy={dataCy} />
    </Form.Item>
  );
}
