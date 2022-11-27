import Appointment from "./Appointment";
import Doctor from "./Doctors/Doctor";
import Patient from "./Patient";
import TimeInterval from "./TimeInterval";

export default class ScheduleService {
  public isFreeDoctor(doctor: Doctor, interval: TimeInterval): boolean {
    return doctor.isFree(interval);
  }

  public enrolToDoctor(doctor: Doctor, patient: Patient, interval: TimeInterval): Appointment {
    return doctor.addAppointment(patient, interval);
  }
}
