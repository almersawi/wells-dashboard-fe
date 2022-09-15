import { FieldsDetails, FIELD_DETAIL_TYPE } from "@verg/api-service";
import { useWellId } from "hooks/useWellId";
import { ENTITIES } from "models/entities";
import { Well } from "models/well";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Api from "services/api/api.service";
import ReactQueryUtil from "utils/reactQuery.util";

export const useQueryKeyWell = () => {
  const wellId = useWellId();
  return [ENTITIES.WELL, wellId];
};

export const useWellFieldsDetail = () => {
  const fields: FieldsDetails<Well> = [
    {
      id: "name",
      name: "Well Name",
      type: FIELD_DETAIL_TYPE.STRING,
      desc: "",
      unit: "",
    },
    {
      id: "lat",
      name: "Latitude",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "",
    },
    {
      id: "lon",
      name: "Longitude",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "",
    },
  ];

  return fields;
};

export const useInvalidateQueryWell = () => {
  const key = useQueryKeyWell();
  const queryClient = useQueryClient();
  const invalidateQuery = () => queryClient.invalidateQueries(key);
  return invalidateQuery;
};

export const useInvalidateQueryWells = () => {
  const queryClient = useQueryClient();
  const invalidateQuery = () => queryClient.invalidateQueries([ENTITIES.WELL]);
  return invalidateQuery;
};

export function useWells() {
  const query = useQuery(ENTITIES.WELL, () => Api.entities.well.get());
  return ReactQueryUtil.processGetQuery(query);
}

export function useDeleteWell() {
  const invalidateWellsQuery = useInvalidateQueryWells();
  const query = useMutation(
    (entityId: string) => Api.entities.well.delete({ entityId }),
    {
      onSuccess: () => {
        invalidateWellsQuery();
      },
    }
  );
  return query;
}
