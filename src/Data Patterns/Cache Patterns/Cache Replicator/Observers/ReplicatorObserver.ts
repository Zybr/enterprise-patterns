import IChangesObserver from "./IChangesObserver";
import Cache from "../../Cache/Cache";
import ClearedEvent from "../Events/ClearedEvent";
import PutEvent from "../Events/PutEvent";
import RemovedEvent from "../Events/RemovedEvent";

export default class ReplicatorObserver implements IChangesObserver {
  private readonly cache: Cache;

  public constructor(cache: Cache) {
    this.cache = cache;
  }

  put(event: PutEvent) {
    this.cache.put(event.key, event.value);
  }

  cleared(event: ClearedEvent) {
    this.cache.clear();
  }

  removed(event: RemovedEvent) {
    this.cache.remove(event.key);
  }
}
