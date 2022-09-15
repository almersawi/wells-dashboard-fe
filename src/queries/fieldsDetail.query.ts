import { FieldDetail } from "@verg/api-service";
import { ENTITIES } from "models/entities";
import { useQuery } from "react-query";
import api from "services/api/api.service";

const FIELDS_DETAIL_QUERY_KEY = "fieldsDetails";

export function useFieldsDetail<TEntityModel>(entity: ENTITIES) {
  const query = useQuery(
    [FIELDS_DETAIL_QUERY_KEY, entity],
    () => api.base.getFieldsDetail<FieldDetail<TEntityModel>>({ entity }),
    {
      staleTime: 20 * 60 * 1000,
    }
  );
  return { ...query, data: query?.data?.data?.base_fields || [] };
}
