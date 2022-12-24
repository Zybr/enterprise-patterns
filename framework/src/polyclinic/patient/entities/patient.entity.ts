import Person from "../../generic/entities/person.entity";
import { Collection, Entity, OneToMany } from "@mikro-orm/core";
import Appointment from "../../appointment/entities/appointment.entity";

@Entity()
export default class Patient extends Person {
  @OneToMany({
    entity: () => Appointment,
    mappedBy: 'patient',
  })
  public appointments = new Collection<Appointment>(this);
}
