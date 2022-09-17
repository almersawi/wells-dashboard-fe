import { FIELD_DETAIL_TYPE } from "@verg/api-service";
import { useWellId } from "hooks/useWellId";
import { ENTITIES } from "models/entities";
import { FieldsDetailType } from "models/fieldsDetail";
import { Trajectory } from "models/trajectory";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Api from "services/api/api.service";
import ReactQueryUtil from "utils/reactQuery.util";

export const useQueryKey = () => {
  const wellId = useWellId();
  return [ENTITIES.TRAJECTORY, ENTITIES.WELL, wellId];
};

export const useTrajectoryFieldsDetail = () => {
  const fields: FieldsDetailType<Trajectory> = [
    {
      id: "md",
      name: "MD",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "ft",
      required: true,
    },
    {
      id: "inc",
      name: "Inclination",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "",
      required: true,
    },
    {
      id: "azi",
      name: "Azimuth",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "",
      required: true,
    },
    {
      id: "tvd",
      name: "TVD",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "ft",
      required: false,
    },
    {
      id: "north",
      name: "North",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "",
      required: false,
    },
    {
      id: "east",
      name: "East",
      type: FIELD_DETAIL_TYPE.NUMBER,
      desc: "",
      unit: "",
      required: false,
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

export function useTrajectoryData() {
  const queryKey = useQueryKey();
  const wellId = useWellId();
  const query = useQuery(queryKey, () =>
    Api.entities.trajectory.get({
      extraPath: `/wellId/${wellId}`,
    })
  );
  return ReactQueryUtil.processGetQuery(query);
}

export function useAddTrajectory() {
  const invalidateQuery = useInvalidateQuery();
  const wellId = useWellId();
  const query = useMutation(
    (payload: Array<Trajectory>) =>
      Api.entities.trajectory.addBulk({ wellId, data: payload }),
    {
      onSuccess: () => {
        invalidateQuery();
      },
    }
  );
  return query;
}
