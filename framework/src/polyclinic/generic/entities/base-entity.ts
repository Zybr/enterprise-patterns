import { PrimaryKey } from "@mikro-orm/core";
import { BaseEntity as MikroBaseEntity } from "@mikro-orm/core";

export default abstract class BaseEntity extends MikroBaseEntity<BaseEntity, 'id'> {
  @PrimaryKey()
  public id: number
}
