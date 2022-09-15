import { useMatch, useNavigate, useRouter } from "@tanstack/react-location";
import { useMemo } from "react";

export function useAppRouter() {
  const match = useMatch();
  const params = match?.params;
  const navigate = useNavigate();
  const reactLocationRouter = useRouter();
  const pathname = reactLocationRouter?.state?.location?.pathname;
  return useMemo(
    () => ({ navigate, params, pathname }),
    [params, navigate, pathname]
  );
}
