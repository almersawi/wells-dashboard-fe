import { Form, Modal } from "antd";
import { useAddWell, useUpdateWell } from "hooks/queries/useWells.query";
import { FormProps } from "models/form-props";
import { Well } from "models/well";
import { FORM_CONFIG, MODAL_BODY_STYLE, MODAL_CONFIG } from "styles/constants";
import { SubmitFormButton } from "UI/Buttons";
import FormFields from "UI/FormFields";
import { Title } from "UI/Typography";
import FormUtil from "utils/form.util";

export default function WellsForm({
  closeHandler,
  selected,
  fieldDetails,
}: FormProps<Well>) {
  const [form] = Form.useForm();
  const formId = "wells-data-form";
  const initialValues = selected
    ? FormUtil.formatDateValues(selected, fieldDetails)
    : {};

  const { mutateAsync: addWell, isLoading: isAddWellLoading } = useAddWell();
  const { mutateAsync: updateWell, isLoading: isUpdateWellLoading } =
    useUpdateWell();

  const submitHandeler = async (data: Well) => {
    if (selected) {
      await updateWell({ body: { ...data, id: selected?.id } });
    } else {
      await addWell({ body: data });
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
          loading={isAddWellLoading || isUpdateWellLoading}
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
