import { useWellId } from "hooks/useWellId";
import { Filters } from "services/api/config";

export const useWellFilter = () => {
  const wellId = useWellId();
  return Filters.getWellIdFilter(wellId);
};
