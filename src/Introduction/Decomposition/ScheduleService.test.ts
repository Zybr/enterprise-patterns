import ScheduleService from "./ScheduleService";
import { faker } from '@faker-js/faker';
import TherapistDoctor from "./Doctors/TherapistDoctor";
import TimeInterval from "./TimeInterval";
import Patient from "./Patient";
import Doctor from "./Doctors/Doctor";

const makeInterval = ([startHours, startMinutes], [endHours, endMinutes]): TimeInterval => {
  const start = new Date();
  const end = new Date();

  start.setHours(startHours);
  start.setMinutes(startMinutes);
  start.setSeconds(0);
  start.setMilliseconds(0);

  end.setHours(endHours);
  end.setMinutes(endMinutes);
  end.setSeconds(0);
  end.setMilliseconds(0);

  return new TimeInterval(start, end);
}

describe('ScheduleService', () => {
  const scheduleSrv = new ScheduleService()
  let doctor: Doctor;
  const patient = new Patient(
    faker.name.firstName(),
    faker.name.lastName()
  )

  describe('enrolToDoctor() & isDoctorFree()', () => {
    beforeEach(() => {
      doctor = new TherapistDoctor(
        faker.name.firstName(),
        faker.name.lastName()
      );
    });

    test('Not intersected intervals', () => {
      expect(scheduleSrv.isFreeDoctor(
        doctor,
        makeInterval([8, 0], [8, 30]))
      ).toEqual(true);

      scheduleSrv.enrolToDoctor(
        doctor,
        patient,
        makeInterval([8, 0], [8, 30])
      );

      [
        [[7, 30], [8, 0], false],
        [[7, 30], [7, 59], true],
        [[8, 1], [8, 10], false],
        [[7, 50], [8, 40], false],
        [[8, 20], [8, 40], false],
        [[8, 31], [8, 50], true],
        [[8, 30], [8, 50], false],
      ]
        .forEach(
          ([start, end, isFree]) =>
            expect(scheduleSrv.isFreeDoctor(
              doctor,
              makeInterval(start as [number, number], end as [number, number]))
            ).toEqual(isFree)
        );
    });

    test('Intersected intervals - throw an exception', () => {
      scheduleSrv.enrolToDoctor(
        doctor,
        patient,
        makeInterval([8, 0], [8, 30])
      );
      expect(
        () => scheduleSrv.enrolToDoctor(
          doctor,
          patient,
          makeInterval([8, 20], [8, 50])
        )
      ).toThrow(
        new Error('Doctor is not available at passed time.')
      );
    });
  });
});
