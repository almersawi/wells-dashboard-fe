import { VertApiEntity, VertApiService } from "@verg/api-service";
import { ENTITIES } from "models/entities";
import { Schematic } from "models/schematic";
import { Well } from "models/well";
import { TrajectoryEntityModel } from "./models/trajectoryEntityModel";

export type Params = {
  vertApiInstance: VertApiService<ENTITIES>;
};
export type VertApiEntityModel<TEntity> = VertApiEntity<ENTITIES, TEntity>;

export default class Entities {
  [ENTITIES.WELL]: VertApiEntityModel<Well>;
  [ENTITIES.SCHEMATIC]: VertApiEntityModel<Schematic>;
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
