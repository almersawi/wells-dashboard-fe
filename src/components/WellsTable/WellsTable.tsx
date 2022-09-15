import { Card, Table } from "antd";
import {
  useDeleteWell,
  useWellFieldsDetail,
  useWells,
} from "hooks/queries/useWells.query";
import { useDeleteTableItems } from "hooks/useDeleteTableItems";
import { isEmpty } from "lodash";
import { Well } from "models/well";
import { PAGINATION_CONFIG, TABLE_CONFIG } from "styles/constants";
import { AddButton, DeleteButton } from "UI/Buttons";
import { CardHeader } from "UI/Card";
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

  return (
    <Card
      loading={isLoading}
      title={
        <CardHeader title="Wells">
          <div>
            <AddButton className="mx-4" onClick={() => {}} />
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
        columns={TableUtil.columnsFromFieldsDetail(fieldsDetail)}
        {...TABLE_CONFIG}
      />
    </Card>
  );
}
