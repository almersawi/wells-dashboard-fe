import { Button } from "antd";
import React from "react";

type Props = {
  // TODO: remove
  formId: string;
  loading?: boolean;
};

export default function SubmitFormButton({ formId, loading = false }: Props) {
  return (
    <div className="flex justify-center">
      <Button form={formId} type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </div>
  );
}
