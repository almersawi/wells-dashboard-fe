import { ROUTES_QUERYSTRING } from "models/routes";
import { useAppRouter } from "./useAppRouter";

export function useWellId() {
  const router = useAppRouter();
  const wellId = router?.params?.[ROUTES_QUERYSTRING.WELL_ID];
  return wellId;
}
