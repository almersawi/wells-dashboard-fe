import { DatePicker, Form } from 'antd';
import React from "react";
import DateService from 'services/date.service';

// TODO: Why is this file run before index.tsx?
DateService?.instance?.setMomentTimeZone();

type Props = {
  id: string;
  label: string;
  format?: string;
  showTime?: boolean;
  required?: boolean;
};

export default function DateField({
  id,
  label,
  format = "MMM DD YYYY",
  showTime = false,
  required,
}: Props) {
  return (
    <Form.Item
      key={id}
      label={label}
      name={id}
      rules={[{ required, message: "Required" }]}
    >
      <DatePicker
        className="!w-full"
        showTime={showTime}
        format={format}
        data-cy={id}
      />
    </Form.Item>
  );
}
