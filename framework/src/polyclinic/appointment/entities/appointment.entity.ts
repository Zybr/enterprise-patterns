import BaseEntity from "../../generic/entities/base-entity";
import Doctor from "../../doctor/entities/doctor.entity";
import { Entity, ManyToOne } from "@mikro-orm/core";
import Patient from "../../patient/entities/patient.entity";

@Entity()
export default class Appointment extends BaseEntity {
  @ManyToOne(
    () => Patient,
    {
      onDelete: 'cascade'
    }
  )
  public patient!: Patient;

  @ManyToOne(
    () => Doctor,
    {
      onDelete: 'cascade'
    }
  )
  public doctor!: Doctor;
}
