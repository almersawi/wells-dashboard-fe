import { VertApiEntity, VertApiService } from "@verg/api-service";
import { DashboardSummary } from "models/dashboard-summary";
import { ENTITIES } from "models/entities";
import { ProductionData } from "models/production-data";
import { Schematic } from "models/schematic";
import { Well } from "models/well";
import { WellSummary } from "models/well-summary";
import { TrajectoryEntityModel } from "./models/trajectoryEntityModel";

export type Params = {
  vertApiInstance: VertApiService<ENTITIES>;
};
export type VertApiEntityModel<TEntity> = VertApiEntity<ENTITIES, TEntity>;

export default class Entities {
  [ENTITIES.WELL]: VertApiEntityModel<Well>;
  [ENTITIES.SCHEMATIC]: VertApiEntityModel<Schematic>;
  [ENTITIES.PRODUCTION_DATA]: VertApiEntityModel<ProductionData>;
  [ENTITIES.WELL_SUMMARY]: VertApiEntityModel<WellSummary>;
  [ENTITIES.DASHBOARD]: VertApiEntityModel<DashboardSummary>;
  [ENTITIES.TRAJECTORY]: TrajectoryEntityModel;

  constructor({ vertApiInstance }: Params) {
    // Add to this array the entities that have non VertApiEntity class
    const entitiesToOmit: Array<ENTITIES> = [ENTITIES.TRAJECTORY];
    const entitiesToCreate = Object.values(ENTITIES).filter(
      (value) => !entitiesToOmit.includes(value)
    );
    entitiesToCreate.forEach((entity) => {
      // @ts-ignore
      this[entity] = new VertApiEntity({
        vertApiInstance,
        entity,
      });
    });

    this[ENTITIES.TRAJECTORY] = new TrajectoryEntityModel({ vertApiInstance });
  }
}
