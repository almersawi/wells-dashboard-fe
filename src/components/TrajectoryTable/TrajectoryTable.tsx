import { Card, Table } from "antd";
import CsvReader from "components/CsvReader";
import {
  useAddTrajectory,
  useTrajectoryData,
  useTrajectoryFieldsDetail,
} from "hooks/queries/trajectory.query";
import { useModalForm } from "hooks/useModalForm";
import { Trajectory } from "models/trajectory";
import { PAGINATION_CONFIG, TABLE_CONFIG } from "styles/constants";
import { ReadCsvButton } from "UI/Buttons";
import { CardHeader } from "UI/Card";
import IF from "UI/IF";
import TableUtil from "utils/table.util";

export default function TrajectoryTable() {
  const {
    data: { data },
    isLoading,
  } = useTrajectoryData();

  const fieldsDetail = useTrajectoryFieldsDetail();

  const { mutateAsync: uploadTrajectory, isLoading: isUploadLoading } =
    useAddTrajectory();

  const { isCsvFormVisible, readCsv, reset } = useModalForm<Trajectory>();

  const doneHandeler = async (data: Trajectory[]) => {
    await uploadTrajectory(data);
  };

  const fileredFieldsIds = ["tvd", "north", "east"];

  return (
    <>
      <Card
        loading={isLoading}
        className="min-h-[600px]"
        title={
          <CardHeader title="Well Trajectory Data">
            <div>
              <ReadCsvButton onClick={readCsv} />
            </div>
          </CardHeader>
        }
      >
        <Table<Trajectory>
          className="primary-table clickable"
          dataSource={data}
          loading={isUploadLoading}
          pagination={{
            ...PAGINATION_CONFIG,
            defaultPageSize: 15,
            simple: true,
          }}
          showSorterTooltip={false}
          rowKey="id"
          scroll={{ x: "max-content" }}
          columns={[
            ...TableUtil.columnsFromFieldsDetail(fieldsDetail, ["name"]),
          ]}
          {...TABLE_CONFIG}
        />
      </Card>

      <IF
        condition={isCsvFormVisible}
        trueComponent={
          <CsvReader<Trajectory>
            closeHandler={reset}
            fieldsDetail={fieldsDetail.filter(
              (x) => !fileredFieldsIds.includes(x.id)
            )}
            doneHandeler={doneHandeler}
          />
        }
      />
    </>
  );
}
