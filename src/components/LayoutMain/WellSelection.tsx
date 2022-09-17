import { SearchOutlined } from "@ant-design/icons";
import { RefSelectProps } from "antd/lib/select";
import { Select } from "antd";
import { useWells } from "hooks/queries/useWells.query";
import { useAppRouter } from "hooks/useAppRouter";
import { ROUTE_PATH } from "models/routes";
import { useRef } from "react";

export default function WellSelection() {
  const selectRef = useRef<RefSelectProps>(null);
  const { navigate } = useAppRouter();
  const {
    data: { data: wells },
    isLoading,
  } = useWells();
  const locationSplit = window.location.pathname?.split("/");

  const handleWellClick = (wellId: string) => {
    const section = locationSplit?.[3] ? `/${locationSplit?.[3]}` : "";
    const subSection = locationSplit?.[4] ? `/${locationSplit?.[4]}` : "";
    navigate({
      to: `${ROUTE_PATH.WELLS}/${wellId}${section}${subSection}`,
      replace: true,
    });
    selectRef?.current?.blur();
  };

  return (
    <div>
      <Select
        size="middle"
        className="!w-[300px] !text-sm"
        ref={selectRef}
        suffixIcon={<SearchOutlined />}
        value={isLoading ? undefined : locationSplit?.[2]}
        onChange={handleWellClick}
        showSearch
        placeholder="Search Well..."
        optionFilterProp="children"
        filterOption={(input, option) =>
          // @ts-ignore
          option?.children?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
        }
      >
        {wells.map((well) => (
          <Select.Option key={well.id} value={well.id?.toString()}>
            {well.name ?? "Name not set"}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
