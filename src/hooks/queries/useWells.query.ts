import { FIELD_DETAIL_TYPE } from "@verg/api-service";
import { useWellId } from "hooks/useWellId";
import { ENTITIES } from "models/entities";
import { FieldsDetailType } from "models/fieldsDetail";
import { Well, WELL_STATUS, WELL_TYPE } from "models/well";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Api from "services/api/api.service";
import ReactQueryUtil from "utils/reactQuery.util";

export const useQueryKeyWell = () => {
  const wellId = useWellId();
  return [ENTITIES.WELL, wellId];
};

export const useWellFieldsDetail = () => {
  const fields: FieldsDetailType<Well> = [
    {
      id: "name",
      name: "Well Name",
      type: FIELD_DETAIL_TYPE.STRING,
      desc: "",
      unit: "",
      required: true,
    },
    {
      id: "lat",
      name: "Latitude",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "",
      required: true,
    },
    {
      id: "lon",
      name: "Longitude",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "",
      required: true,
    },
    {
      id: "status",
      name: "Status",
      type: FIELD_DETAIL_TYPE.ENUM_STRING,
      desc: "",
      unit: "",
      values: Object.values(WELL_STATUS),
      required: true,
    },
    {
      id: "type",
      name: "Type",
      type: FIELD_DETAIL_TYPE.ENUM_STRING,
      desc: "",
      unit: "",
      values: Object.values(WELL_TYPE),
      required: true,
    },
    {
      id: "chokeSize",
      name: "Choke Size",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "(1/64) in",
      required: true,
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

export function useWell() {
  const wellId = useWellId();
  const query = useQuery([ENTITIES.WELL, wellId], () =>
    Api.entities.well.getById({ entityId: wellId })
  );

  return ReactQueryUtil.processGetByIdQuery(query);
}

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

export function useAddWell() {
  const invalidateWellsQuery = useInvalidateQueryWells();
  const query = useMutation(Api.entities.well.create, {
    onSuccess: () => {
      invalidateWellsQuery();
    },
  });
  return query;
}

export function useUpdateWell() {
  const invalidateWellsQuery = useInvalidateQueryWells();
  const query = useMutation(Api.entities.well.update, {
    onSuccess: () => {
      invalidateWellsQuery();
    },
  });
  return query;
}
