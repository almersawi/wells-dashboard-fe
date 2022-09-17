import { Title } from "UI/Typography";
import { Button, Modal } from "antd";
import { useCSVReader } from "react-papaparse";
import { MODAL_BODY_STYLE, MODAL_CONFIG } from "styles/constants";
import { useRef, useState } from "react";
import CsvReaderTable from "./CsvReaderTable";
import IF from "UI/IF";
import { FieldsDetailType } from "models/fieldsDetail";

type Props<T> = {
  closeHandler: () => void;
  fieldsDetail: FieldsDetailType<T>;
  doneHandeler: (data: Array<any>) => void;
};

export default function CsvReader<T>({
  closeHandler,
  fieldsDetail,
  doneHandeler,
}: Props<T>) {
  const { CSVReader: Reader } = useCSVReader();
  const [parsedData, setParsedData] = useState<Array<any>>([]);
  const [fileHeaders, setFileHeaders] = useState<Array<string>>([]);
  const [parsed, setParsed] = useState(false);
  const csvTableRef = useRef(null);
  const [valid, setValid] = useState(false);

  const deleteHandeler = (id: string) => {
    setParsedData((prev) => prev?.filter((x) => x._id !== id));
  };

  const dataArrayToDataObj = ({
    data,
    headers,
  }: {
    data: Array<number>;
    headers: Array<string>;
  }) => {
    return data.map((x, i) => {
      const obj = {_id: i};
      headers?.forEach((header, i) => {
        //@ts-ignore
        obj[header] = x[i]?.replace(",", "");
      });
      return obj;
    });
  };

  const resetHandeler = () => {
    setParsedData([]);
    setFileHeaders([]);
    setParsed(false);
  };

  const beforeDoneHandeler = () => {
    //@ts-ignore
    const mappedData = csvTableRef?.current?.getMappedData();
    console.log({mappedData})
    doneHandeler(mappedData);
    closeHandler();
  };

  return (
    <Modal
      {...MODAL_CONFIG}
      className="!w-[80vw]"
      bodyStyle={{ ...MODAL_BODY_STYLE, padding: "10px 24px" }}
      destroyOnClose
      title={<Title text="Read Csv" />}
      onCancel={() => closeHandler()}
      footer={
        <>
          <Button type="primary" onClick={beforeDoneHandeler} disabled={!valid}>
            Submit
          </Button>
        </>
      }
      visible
    >
      <IF
        condition={parsed}
        trueComponent={
          <CsvReaderTable
            deleteHandeler={deleteHandeler}
            data={parsedData}
            fieldsDetail={fieldsDetail}
            fileHeaders={fileHeaders}
            resetHandeler={resetHandeler}
            ref={csvTableRef}
            setValidation={setValid}
          />
        }
        falseComponent={
          <Reader
            onUploadAccepted={(results: any) => {
              const convertedData = dataArrayToDataObj({
                data: (results?.data as any[])?.slice(1),
                headers: results?.data?.[0],
              });
              setParsedData(convertedData);
              setFileHeaders(results?.data?.[0]);
              setParsed(true);
            }}
          >
            {/* @ts-ignore */}
            {({ getRootProps, acceptedFile }) => (
              <>
                <div
                  {...getRootProps()}
                  className="w-100 flex items-center justify-center"
                >
                  {acceptedFile ? (
                    <></>
                  ) : (
                    <div className="border-2 p-2 border-dashed rounded-md cursor-pointer hover:border-secondary transition-colors">
                      Click to choose .csv file
                    </div>
                  )}
                </div>
              </>
            )}
          </Reader>
        }
      />
    </Modal>
  );
}
