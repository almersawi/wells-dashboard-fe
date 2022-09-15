import { VertApiService } from "@verg/api-service";
import { AxiosInstance } from "axios";
import { ENTITIES } from "../../models/entities";
import Entities from "./entities.api";
import axiosInstanceCreated from "./axios.api";

class Api {
  base: VertApiService<ENTITIES>;
  entities: Entities;

  constructor({ axiosInstance }: { axiosInstance: AxiosInstance }) {
    this.base = new VertApiService({ axiosInstance });
    this.entities = new Entities({
      vertApiInstance: this.base,
    });
  }
}

const api = new Api({ axiosInstance: axiosInstanceCreated });

export default api;
