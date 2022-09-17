import { Card, Table } from "antd";
import ProductionDataForm from "components/ProductionDataForm";
import {
  useDeleteProductionData,
  useProductionData,
  useProductionFieldsDetail,
} from "hooks/queries/useProductionData.query";
import { useDeleteTableItems } from "hooks/useDeleteTableItems";
import { useModalForm } from "hooks/useModalForm";
import { isEmpty } from "lodash";
import { ProductionData } from "models/production-data";
import { PAGINATION_CONFIG, TABLE_CONFIG } from "styles/constants";
import { AddButton, DeleteButton } from "UI/Buttons";
import { CardHeader } from "UI/Card";
import IF from "UI/IF";
import { editColumn } from "UI/TableComponents/Columns";
import TableUtil from "utils/table.util";

export default function ProductionDataTable() {
  const {
    data: { data },
    isLoading,
  } = useProductionData();

  const fieldsDetail = useProductionFieldsDetail();

  const { mutate: deleteWell, isLoading: isDeleteLoading } =
    useDeleteProductionData();

  const { handleDelete, selectedRowKeys, setSelectedRowKeys } =
    useDeleteTableItems(deleteWell);

  const { modalForm, add, edit, reset } = useModalForm<ProductionData>();

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
        <Table<ProductionData>
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
            editColumn<ProductionData>({ onClick: edit }),
            ...TableUtil.columnsFromFieldsDetail(fieldsDetail, ["name"]),
          ]}
          {...TABLE_CONFIG}
        />
      </Card>

      <IF
        condition={modalForm.visible}
        trueComponent={
          <ProductionDataForm
            selected={modalForm?.selected!}
            closeHandler={reset}
            fieldDetails={fieldsDetail}
          />
        }
      />
    </>
  );
}
