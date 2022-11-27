import Patient from "./Patient";
import TimeInterval from "./TimeInterval";

export default class Appointment {
  public constructor(
    private readonly patient: Patient,
    private readonly interval: TimeInterval,
  ) {
  }

  public getPatient(): Patient {
    return this.patient;
  }

  public getInterval(): TimeInterval {
    return this.interval;
  }
}
