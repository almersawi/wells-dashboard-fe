import { Link } from "@tanstack/react-location";
import { FIELD_DETAIL_TYPE } from "@verg/api-service";
import { Card, Table } from "antd";
import WellsForm from "components/WellsForm";
import {
  useDeleteWell,
  useWellFieldsDetail,
  useWells,
} from "hooks/queries/useWells.query";
import { useDeleteTableItems } from "hooks/useDeleteTableItems";
import { useModalForm } from "hooks/useModalForm";
import { isEmpty } from "lodash";
import { Well } from "models/well";
import { PAGINATION_CONFIG, TABLE_CONFIG } from "styles/constants";
import { AddButton, DeleteButton } from "UI/Buttons";
import { CardHeader } from "UI/Card";
import IF from "UI/IF";
import { editColumn } from "UI/TableComponents/Columns";
import TableUtil from "utils/table.util";

export default function WellsTable() {
  const {
    data: { data: wells },
    isLoading,
  } = useWells();

  const fieldsDetail = useWellFieldsDetail();

  const { mutate: deleteWell, isLoading: isDeleteLoading } = useDeleteWell();

  const { handleDelete, selectedRowKeys, setSelectedRowKeys } =
    useDeleteTableItems(deleteWell);

  const { modalForm, add, edit, reset } = useModalForm<Well>();

  return (
    <>
      <Card
        loading={isLoading}
        className="h-full"
        title={
          <CardHeader title="Wells">
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
        <Table<Well>
          className="primary-table clickable"
          dataSource={wells}
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
            editColumn<Well>({ onClick: edit }),
            TableUtil.getColumn({
              id: "name",
              title: "Name",
              type: FIELD_DETAIL_TYPE.STRING,
              render: (name, row) => (
                <Link className="font-medium" to={row?.id}>
                  {name}
                </Link>
              ),
            }),
            ...TableUtil.columnsFromFieldsDetail(fieldsDetail, ["name"]),
          ]}
          {...TABLE_CONFIG}
        />
      </Card>

      <IF
        condition={modalForm.visible}
        trueComponent={
          <WellsForm
            selected={modalForm?.selected!}
            closeHandler={reset}
            fieldDetails={fieldsDetail}
          />
        }
      />
    </>
  );
}
