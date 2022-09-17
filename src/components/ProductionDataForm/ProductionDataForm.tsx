import { Form, Modal } from "antd";
import {
  useAddProductionData,
  useUpdateProductionData,
} from "hooks/queries/useProductionData.query";
import { FormProps } from "models/form-props";
import { ProductionData } from "models/production-data";
import { FORM_CONFIG, MODAL_BODY_STYLE, MODAL_CONFIG } from "styles/constants";
import { SubmitFormButton } from "UI/Buttons";
import FormFields from "UI/FormFields";
import { Title } from "UI/Typography";
import FormUtil from "utils/form.util";

export default function ProductionDataForm({
  closeHandler,
  selected,
  fieldDetails,
}: FormProps<ProductionData>) {
  const [form] = Form.useForm();
  const formId = "production-data-form";
  const initialValues = selected
    ? FormUtil.formatDateValues(selected, fieldDetails)
    : {};

  const { mutateAsync: addProductionData, isLoading: isAddLoading } =
    useAddProductionData();
  const { mutateAsync: updateProductionData, isLoading: isUpdateLoading } =
    useUpdateProductionData();

  const submitHandeler = async (data: ProductionData) => {
    if (selected) {
      await updateProductionData({ ...data, id: selected?.id });
    } else {
      await addProductionData(data);
    }
    closeHandler();
  };

  return (
    <Modal
      {...MODAL_CONFIG}
      bodyStyle={{ ...MODAL_BODY_STYLE }}
      destroyOnClose
      title={<Title text={FormUtil.getFormLabel(!!selected)} />}
      onCancel={() => closeHandler()}
      footer={
        <SubmitFormButton
          formId={formId}
          loading={isAddLoading || isUpdateLoading}
        />
      }
      visible
    >
      <Form
        initialValues={initialValues}
        id={formId}
        onFinish={submitHandeler}
        {...FORM_CONFIG}
        form={form}
      >
        <FormFields
          fieldsDetails={fieldDetails}
          requiredFields={fieldDetails
            .filter((x) => x.required)
            .map((x) => x.id)}
        />
      </Form>
    </Modal>
  );
}
