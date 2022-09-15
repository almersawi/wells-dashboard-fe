import { VertApiEntity, VertApiService } from "@verg/api-service";
import { ENTITIES } from "models/entities";
import { Well } from "models/well";

export type Params = {
  vertApiInstance: VertApiService<ENTITIES>;
};
export type VertApiEntityModel<TEntity> = VertApiEntity<ENTITIES, TEntity>;

export default class Entities {
  [ENTITIES.WELL]: VertApiEntityModel<Well>;

  constructor({ vertApiInstance }: Params) {
    // Add to this array the entities that have non VertApiEntity class
    const entitiesToOmit: Array<ENTITIES> = [];
    const entitiesToCreate = Object.values(ENTITIES).filter(
      (value) => !entitiesToOmit.includes(value)
    );
    entitiesToCreate.forEach((entity) => {
      this[entity] = new VertApiEntity({
        vertApiInstance,
        entity,
      });
    });
  }
}
