import { DeleteButton, ResetButton } from "UI/Buttons";
import { columnFromFieldsDetails } from "UI/TableComponents/Columns/columns";
import { Col, Row, Select, Table } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { PAGINATION_CONFIG, ROW_GUTTER } from "styles/constants";
import { Form } from "antd";
import { compact, without } from "lodash";
import { useDeleteTableItems } from "hooks/useDeleteTableItems";
import { FIELD_DETAIL_TYPE } from "@verg/api-service";
import { FieldDetailType, FieldsDetailType } from "models/fieldsDetail";

type Props = {
  data: Array<any>;
  fieldsDetail: FieldsDetailType<any>;
  fileHeaders: Array<string>;
  resetHandeler: () => void;
  deleteHandeler: (id: string) => void;
  setValidation: (valid: boolean) => void;
};

type FieldsDetailMap = {
  fieldDetailId: string;
  fieldDetailName: string;
  dataHeader?: string | undefined;
  required: boolean;
  type: FIELD_DETAIL_TYPE;
};

enum OPTIONS {
  IGNORE = "ignore",
}

const CsvReaderTable = forwardRef(
  (
    {
      data,
      fieldsDetail,
      fileHeaders = [],
      resetHandeler,
      deleteHandeler,
      setValidation,
    }: Props,
    ref
  ) => {
    const [fieldsMap, setFieldsMap] = useState<Array<FieldsDetailMap>>(
      //@ts-ignore
      fieldsDetail?.map((x) => ({
        fieldDetailId: x.id,
        required: x.required,
        fieldDetailName: x.name,
        type: x.type,
      }))
    );

    const { handleDelete, selectedRowKeys, setSelectedRowKeys } =
      useDeleteTableItems(deleteHandeler);

    const fileFieldDetails: Array<Partial<FieldDetailType<any>>> = fileHeaders?.map((x) => ({
      name: x,
      id: x,
      type: FIELD_DETAIL_TYPE?.NUMBER,
    }));

    const onFieldsMapChange = ({
      id,
      value,
    }: {
      id: string;
      value: string;
    }) => {
      setFieldsMap((prev) => {
        const newState = prev.map((x) => {
          if (x.fieldDetailId === id) {
            return { ...x, dataHeader: value };
          }
          return x;
        });
        setValidation(
          !newState?.find(
            (x) =>
              x.required && (!x.dataHeader || x.dataHeader === OPTIONS.IGNORE)
          )
        );

        return newState;
      });
    };

    const getMappedData = () => {
      const mappedData = data?.map((x) => {
        const mappedObj = { };
        fieldsMap?.forEach((field) => {
          if (field?.dataHeader && field.dataHeader !== OPTIONS.IGNORE)
          //@ts-ignore
            mappedObj[field?.fieldDetailId] =
              field?.type === FIELD_DETAIL_TYPE.NUMBER
                ? parseFloat(x[field?.dataHeader])
                : x[field?.dataHeader];
        });

        if (
          without(Object.values(mappedObj), NaN, undefined)?.length ===
          Object.values(mappedObj)?.length
        )
          return mappedObj;
      });

      return compact(mappedData);
    };

    useImperativeHandle(ref, () => ({
      getMappedData,
    }));

    return (
      <div>
        <div className="flex justify-end mb-2 w-full items-center">
          <div className="flex items-center">
            <ResetButton onClick={resetHandeler} className="mr-4" />
            <DeleteButton
              disabled={selectedRowKeys?.length === 0}
              onClick={handleDelete}
            />
          </div>
        </div>
        <Row gutter={ROW_GUTTER}>
          <Col span={18}>
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
              bordered
              //@ts-ignore
              columns={[...columnFromFieldsDetails(fileFieldDetails)]}
              dataSource={data.map((x, i) => {
                return { ...x, key: i, _id: i };
              })}
              size={"small"}
              pagination={{
                ...PAGINATION_CONFIG,
                pageSize: 10,
              }}
              rowKey={(row) => row?._id}
            />
          </Col>
          <Col span={6}>
            <Form layout="vertical">
              {fieldsMap?.map((field, i) => {
                return (
                  <Form.Item
                    required={field.required}
                    label={field.fieldDetailName}
                  >
                    <Select
                      id={field?.fieldDetailId}
                      onChange={(value: string) =>
                        onFieldsMapChange({ id: field?.fieldDetailId, value })
                      }
                    >
                      <Select.Option value={OPTIONS.IGNORE}>
                        Ignore
                      </Select.Option>
                      {fileHeaders?.map((header) => {
                        return (
                          <Select.Option
                            value={header}
                            disabled={
                              !!fieldsMap?.find((x) => x.dataHeader === header)
                            }
                          >
                            {header}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                );
              })}
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
);

export default CsvReaderTable;
