import PutEvent from "../Events/PutEvent";
import RemovedEvent from "../Events/RemovedEvent";
import ClearedEvent from "../Events/ClearedEvent";

export default interface IChangesObserver {
  put(event: PutEvent);

  removed(event: RemovedEvent);

  cleared(event: ClearedEvent);
}
