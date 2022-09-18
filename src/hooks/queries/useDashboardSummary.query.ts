import { ENTITIES } from "models/entities";
import { useQuery } from "react-query";
import Api from "services/api/api.service";
import ReactQueryUtil from "utils/reactQuery.util";

export const useQueryKey = () => {
  return [ENTITIES.DASHBOARD];
};

export function useDashboardSummary() {
  const queryKey = useQueryKey();
  const query = useQuery(
    queryKey,
    () => Api.entities.dashboard.getById({ entityId: ENTITIES.DASHBOARD }),
    { staleTime: 0 }
  );

  return ReactQueryUtil.processGetByIdQuery(query);
}
