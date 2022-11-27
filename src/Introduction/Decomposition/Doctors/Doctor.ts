import Person from "../Person";
import Dairy from "../Dairy";
import TimeInterval from "../TimeInterval";
import Patient from "../Patient";
import Appointment from "../Appointment";

export default abstract class Doctor extends Person {
  private readonly dairy: Dairy = new Dairy();

  public isFree(interval: TimeInterval): boolean {
    return this.dairy.isFree(interval);
  }

  public addAppointment(patient: Patient, interval: TimeInterval): Appointment {
    return this.dairy.addAppointment(patient, interval);
  }
}
