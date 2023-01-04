import PersonTableGateway from "../Layer Supertype/PersonTableGateway";
import { commonDbm } from "../../../database/databases";
import { Database } from "sqlite3";
import config from "./config.json";

export default class Registry {
  private readonly servicesMaps = [];
  private readonly config = {};

  public constructor() {
    this.config = config;
    this.initServices();
  }

  public getService<T>(name: string): T {
    const map = this.servicesMaps.find(map => map.service.constructor.name === name || map.alias === name);

    if (!map) {
      throw new Error(`Service "${name}" is not defined.`);
    }

    return map.service as T;
  }

  public getConfig(path: string): object {
    return this.getConfigValue(path.split('.'), this.config);
  }

  /** TODO: lazy load */
  private initServices(): void {
    this.servicesMaps.push(
      {
        service: commonDbm.getDb(),
        alias: 'db',
      },
    );
    this.servicesMaps.push(
      {
        service: new PersonTableGateway(this.getService<Database>('db')),
        alias: 'person.gateway',
      }
    );
  }

  private getConfigValue(path: string[], structure: Object | any): any {
    const field = path.shift();
    if (!field) {
      return structure;
    }

    if (undefined === structure[field]) {
      throw new Error('Config property is node defined.');
    }

    return this.getConfigValue(path, structure[field]);
  }
}
