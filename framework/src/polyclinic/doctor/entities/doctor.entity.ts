import Person from "../../generic/entities/person.entity";
import { Collection, Entity, Enum, OneToMany } from "@mikro-orm/core";
import DoctorType from "../enums/doctor-type.enum";
import Appointment from "../../appointment/entities/appointment.entity";

@Entity()
export default class Doctor extends Person {
  @Enum(() => DoctorType)
  public type!: DoctorType;

  @OneToMany({
    entity: () => Appointment,
    mappedBy: 'doctor',
  })
  public appointments = new Collection<Appointment>(this);
}
