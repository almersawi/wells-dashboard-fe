import { Form, Input } from "antd";
import React from "react";

type Props = {
  id: string;
  label: string;
  required?: boolean;
};

export default function TextAreaField({ id, label, required }: Props) {
  return (
    <Form.Item
      key={id}
      label={label}
      name={id}
      rules={[{ required, message: "Required" }]}
    >
      <Input.TextArea rows={4} />
    </Form.Item>
  );
}
