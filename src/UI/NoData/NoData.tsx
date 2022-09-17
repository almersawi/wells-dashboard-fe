import { Empty } from "antd";

type Props = {
  text?: string;
  defualtImg?: boolean;
};
const NoData = ({ text = "No Data", defualtImg = false }: Props) => {
  const image = defualtImg
    ? Empty.PRESENTED_IMAGE_DEFAULT
    : Empty.PRESENTED_IMAGE_SIMPLE;
  return (
    <div className="flex items-center h-full justify-center">
      <Empty image={image} description={text} />
    </div>
  );
};

export default NoData;
