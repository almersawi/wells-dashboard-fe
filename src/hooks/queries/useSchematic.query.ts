import { FIELD_DETAIL_TYPE } from "@verg/api-service";
import { WELL_SCHEMATIC_ITEM_TYPES } from "features/WellSchematic/models/well-schematic-config";
import { useWellId } from "hooks/useWellId";
import { ENTITIES } from "models/entities";
import { FieldsDetailType } from "models/fieldsDetail";
import { Schematic } from "models/schematic";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Api from "services/api/api.service";
import ReactQueryUtil from "utils/reactQuery.util";

export const useQueryKeyWell = () => {
  const wellId = useWellId();
  return [ENTITIES.SCHEMATIC, ENTITIES.WELL, wellId];
};

export const useSchematicFieldsDetail = () => {
  const fields: FieldsDetailType<Schematic> = [
    {
      id: "type",
      name: "Type",
      type: FIELD_DETAIL_TYPE.ENUM_STRING,
      desc: "",
      unit: "",
      values: Object.values(WELL_SCHEMATIC_ITEM_TYPES),
      required: true,
    },
    {
      id: "top",
      name: "Top",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "ft",
      required: true,
    },
    {
      id: "bottom",
      name: "Bottom",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "ft",
      required: true,
    },
    {
      id: "od",
      name: "OD",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "in",
      required: true,
    },
    {
      id: "toc",
      name: "Top of cement",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "ft",
      required: false,
    },
  ];

  return fields;
};

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();
  const queryKey = useQueryKeyWell();
  const invalidateQuery = () => queryClient.invalidateQueries(queryKey);
  return invalidateQuery;
};

export function useSchematicData() {
  const queryKey = useQueryKeyWell();
  const wellId = useWellId();
  const query = useQuery(queryKey, () =>
    Api.entities.schematic.get({
      extraPath: `/wellId/${wellId}`,
    })
  );
  return ReactQueryUtil.processGetQuery(query);
}

export function useDeleteWellSchematic() {
  const invalidateQuery = useInvalidateQuery();
  const query = useMutation(
    (entityId: string) => Api.entities.schematic.delete({ entityId }),
    {
      onSuccess: () => {
        invalidateQuery();
      },
    }
  );
  return query;
}

export function useAddWellSchematic() {
  const invalidateQuery = useInvalidateQuery();
  const wellId = useWellId();
  const query = useMutation(
    (payload: Schematic) =>
      Api.entities.schematic.create({ body: { ...payload, wellId } }),
    {
      onSuccess: () => {
        invalidateQuery();
      },
    }
  );
  return query;
}

export function useUpdateWellSchematic() {
  const invalidateQuery = useInvalidateQuery();
  const wellId = useWellId();
  const query = useMutation(
    (payload: Schematic) =>
      Api.entities.schematic.update({ body: { ...payload, wellId } }),
    {
      onSuccess: () => {
        invalidateQuery();
      },
    }
  );
  return query;
}
