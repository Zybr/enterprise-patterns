import Appointment from "./Appointment";
import Patient from "./Patient";
import TimeInterval from "./TimeInterval";

export default class Dairy {
  private readonly appointments: Appointment[] = [];

  public isFree(interval): boolean {
    return !this.appointments.some(
      (appointment) => this.areIntersectedIntervals(interval, appointment.getInterval())
    )
  }

  public addAppointment(patient: Patient, interval: TimeInterval): Appointment {
    if (!this.isFree(interval)) {
      throw new Error('Doctor is not available at passed time.');
    }

    const appointment = new Appointment(patient, interval);
    this.appointments.push(appointment)

    return appointment;
  }

  private areIntersectedIntervals(intervalA: TimeInterval, intervalB: TimeInterval): boolean {
    if (intervalA.getStart() > intervalB.getStart()) {
      return this.areIntersectedIntervals(intervalB, intervalA);
    }

    return intervalA.getEnd() >= intervalB.getStart();
  }
}
