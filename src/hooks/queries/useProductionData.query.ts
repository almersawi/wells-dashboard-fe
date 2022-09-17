import { FIELD_DETAIL_TYPE } from "@verg/api-service";
import { useWellId } from "hooks/useWellId";
import { ENTITIES } from "models/entities";
import { FieldsDetailType } from "models/fieldsDetail";
import { ProductionData } from "models/production-data";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Api from "services/api/api.service";
import ReactQueryUtil from "utils/reactQuery.util";

export const useQueryKey = () => {
  const wellId = useWellId();
  return [ENTITIES.PRODUCTION_DATA, ENTITIES.WELL, wellId];
};

export const useProductionFieldsDetail = () => {
  const fields: FieldsDetailType<ProductionData> = [
    {
      id: "date",
      name: "Date",
      type: FIELD_DETAIL_TYPE.DATE,
      desc: "",
      unit: "",
      required: true,
    },
    {
      id: "rate",
      name: "Rate",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "bbl/day",
      required: true,
    },
    {
      id: "wellheadPressure",
      name: "Wellhead Pressure",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "psi",
      required: true,
    },
  ];

  return fields;
};

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();
  const queryKey = useQueryKey();
  const invalidateQuery = () => queryClient.invalidateQueries(queryKey);
  return invalidateQuery;
};

export function useProductionData() {
  const queryKey = useQueryKey();
  const wellId = useWellId();
  const query = useQuery(queryKey, () =>
    Api.entities.productionData.get({
      extraPath: `/wellId/${wellId}`,
    })
  );
  return ReactQueryUtil.processGetQuery(query);
}

export function useDeleteProductionData() {
  const invalidateQuery = useInvalidateQuery();
  const query = useMutation(
    (entityId: string) => Api.entities.productionData.delete({ entityId }),
    {
      onSuccess: () => {
        invalidateQuery();
      },
    }
  );
  return query;
}

export function useAddProductionData() {
  const invalidateQuery = useInvalidateQuery();
  const wellId = useWellId();
  const query = useMutation(
    (payload: ProductionData) =>
      Api.entities.productionData.create({ body: { ...payload, wellId } }),
    {
      onSuccess: () => {
        invalidateQuery();
      },
    }
  );
  return query;
}

export function useUpdateProductionData() {
  const invalidateQuery = useInvalidateQuery();
  const query = useMutation(
    (payload: ProductionData) =>
      Api.entities.productionData.update({ body: { ...payload } }),
    {
      onSuccess: () => {
        invalidateQuery();
      },
    }
  );
  return query;
}
