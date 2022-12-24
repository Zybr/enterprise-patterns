import { Property } from "@mikro-orm/core";
import BaseEntity from "./base-entity";

export default abstract class Person extends BaseEntity {
  @Property()
  public firstName!: string;

  @Property()
  public lastName!: string;
}
