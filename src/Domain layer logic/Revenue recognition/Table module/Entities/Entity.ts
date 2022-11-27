export default abstract class Entity {
  public abstract save(): Promise<boolean>;
}
