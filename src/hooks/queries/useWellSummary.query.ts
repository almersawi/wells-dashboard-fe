import { useWellId } from "hooks/useWellId";
import { ENTITIES } from "models/entities";
import { useQuery } from "react-query";
import Api from "services/api/api.service";
import ReactQueryUtil from "utils/reactQuery.util";

export const useQueryKey = () => {
  const wellId = useWellId();
  return [ENTITIES.WELL_SUMMARY, wellId];
};

export function useWellSummary() {
  const wellId = useWellId();
  const queryKey = useQueryKey();

  const query = useQuery(
    queryKey,
    () => Api.entities.wellSummary.getById({ entityId: wellId }),
    { staleTime: 0 }
  );

  return ReactQueryUtil.processGetByIdQuery(query);
}
