import { Form, Modal } from "antd";
import {
  useAddWellSchematic,
  useUpdateWellSchematic,
} from "hooks/queries/useSchematic.query";
import { FormProps } from "models/form-props";
import { Schematic } from "models/schematic";
import { FORM_CONFIG, MODAL_BODY_STYLE, MODAL_CONFIG } from "styles/constants";
import { SubmitFormButton } from "UI/Buttons";
import FormFields from "UI/FormFields";
import { Title } from "UI/Typography";
import FormUtil from "utils/form.util";

export default function SchematicForm({
  closeHandler,
  selected,
  fieldDetails,
}: FormProps<Schematic>) {
  const [form] = Form.useForm();
  const formId = "schematic-data-form";
  const initialValues = selected
    ? FormUtil.formatDateValues(selected, fieldDetails)
    : {};

  const { mutateAsync: addWellSchematic, isLoading: isAddLoading } =
    useAddWellSchematic();
  const { mutateAsync: updateWellSchematic, isLoading: isUpdateLoading } =
    useUpdateWellSchematic();

  const submitHandeler = async (data: Schematic) => {
    if (selected) {
      await updateWellSchematic({ ...data, id: selected?.id });
    } else {
      await addWellSchematic(data);
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
