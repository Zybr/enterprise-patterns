import IResource from "./IResource";
import PulledResource from "./PulledResource";
import { Database } from "sqlite3";
import Db from "./Db";

export default class ResourcePool {
  private freeResources: IResource[] = [];
  private usedResources: IResource[] = [];

  public constructor(connectionsNumber: number, filePath: string) {
    while (connectionsNumber-- > 0) {
      this.freeResources.push(
        new Db(new Database(filePath))
      );
    }
  }

  public getResource(): IResource {
    if (!this.freeResources.length) {
      throw new Error('There are not available resources.');
    }

    return new PulledResource(this, this.freeResources.pop());
  }

  public releaseDb(db: IResource): void {
    this.usedResources = this.usedResources.filter(availableDb => availableDb !== db);
    this.freeResources.push(db);
  }
}
