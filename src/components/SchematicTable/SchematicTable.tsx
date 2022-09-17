import { Card, Table } from "antd";
import {
  useDeleteWellSchematic,
  useSchematicData,
  useSchematicFieldsDetail,
} from "hooks/queries/useSchematic.query";
import { useDeleteTableItems } from "hooks/useDeleteTableItems";
import { useModalForm } from "hooks/useModalForm";
import { isEmpty } from "lodash";
import { Schematic } from "models/schematic";
import SchematicForm from "SchematicForm";
import { PAGINATION_CONFIG, TABLE_CONFIG } from "styles/constants";
import { AddButton, DeleteButton } from "UI/Buttons";
import { CardHeader } from "UI/Card";
import IF from "UI/IF";
import { editColumn } from "UI/TableComponents/Columns";
import TableUtil from "utils/table.util";

export default function SchematicTable() {
  const {
    data: { data },
    isLoading,
  } = useSchematicData();

  const fieldsDetail = useSchematicFieldsDetail();

  const { mutate: deleteWell, isLoading: isDeleteLoading } =
    useDeleteWellSchematic();

  const { handleDelete, selectedRowKeys, setSelectedRowKeys } =
    useDeleteTableItems(deleteWell);

  const { modalForm, add, edit, reset } = useModalForm<Schematic>();
  return (
    <>
      <Card
        loading={isLoading}
        className="min-h-[600px]"
        title={
          <CardHeader title="Well Schematic Data">
            <div>
              <AddButton className="mx-4" onClick={add} />
              <DeleteButton
                disabled={isEmpty(selectedRowKeys)}
                onClick={handleDelete}
              />
            </div>
          </CardHeader>
        }
      >
        <Table<Schematic>
          className="primary-table clickable"
          dataSource={data}
          loading={isDeleteLoading}
          pagination={{
            ...PAGINATION_CONFIG,
            simple: true,
          }}
          showSorterTooltip={false}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          scroll={{ x: "max-content" }}
          columns={[
            editColumn<Schematic>({ onClick: edit }),
            ...TableUtil.columnsFromFieldsDetail(fieldsDetail, ["name"]),
          ]}
          {...TABLE_CONFIG}
        />
      </Card>

      <IF
        condition={modalForm.visible}
        trueComponent={
          <SchematicForm
            selected={modalForm?.selected!}
            closeHandler={reset}
            fieldDetails={fieldsDetail}
          />
        }
      />
    </>
  );
}
