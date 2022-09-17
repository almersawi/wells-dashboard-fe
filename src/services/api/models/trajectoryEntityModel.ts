import { VertApiEntity, VertApiService } from "@verg/api-service";
import { ENTITIES } from "models/entities";
import { Trajectory } from "models/trajectory";

export class TrajectoryEntityModel extends VertApiEntity<ENTITIES, Trajectory> {
  private base: VertApiService<ENTITIES>;
  constructor({
    vertApiInstance,
  }: {
    vertApiInstance: VertApiService<ENTITIES>;
  }) {
    super({ vertApiInstance, entity: ENTITIES.TRAJECTORY });

    this.base = vertApiInstance;
  }

  async addBulk({ wellId, data }: { wellId: string; data: Array<Trajectory> }) {
    await this.base.createEntity({
      entity: ENTITIES.TRAJECTORY,
      body: {
        wellId,
        data,
      },
    });
  }
}
