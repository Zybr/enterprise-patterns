import { Test, TestingModule } from '@nestjs/testing';
import { makeEntityManager } from "../generic/utils/database";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/sqlite";
import { AppointmentController } from "./appointment.controller";
import Appointment from "./entities/appointment.entity";
import { AppointmentService } from "./appointment.service";
import Patient from "../patient/entities/patient.entity";
import Doctor from "../doctor/entities/doctor.entity";

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let repository: EntityRepository<Appointment>;
  let patientRep: EntityRepository<Patient>;
  let doctorRep: EntityRepository<Doctor>;
  let records: Appointment[];

  beforeAll(async () => {
    const em = await makeEntityManager()
    const repositoryToken = getRepositoryToken(Appointment);
    repository = em.getRepository(Appointment)
    patientRep = em.getRepository(Patient);
    doctorRep = em.getRepository(Doctor);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: repositoryToken,
          useValue: repository,
        },
      ],
      controllers: [
        AppointmentController,
      ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
  });

  beforeEach(async () => records = await repository.findAll())

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('create()', async () => {
    const data = {
      doctor: (await doctorRep.findAll())[0].id,
      patient: (await patientRep.findAll())[0].id,
    };

    const updatedAppointment = await controller.create(data)

    expect(updatedAppointment).toBeInstanceOf(Appointment)
    expect(updatedAppointment.doctor.id).toEqual(data.doctor);
    expect(updatedAppointment.patient.id).toEqual(data.patient);
  });

  test('findAll()', async () => {
    const appointments = await controller.findAll();

    expect(appointments[0]).toBeInstanceOf(Appointment);
    expect(records.length).toEqual(appointments.length)
  });

  test('findOne()', async () => {
    const id = records[0].id;
    const appointment = await controller.findOne(id);

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.id).toEqual(id)
  });

  test('update()', async () => {
    const id = records[0].id;
    const data = {
      doctor: (await doctorRep.findAll())[0].id,
      patient: (await patientRep.findAll())[0].id,
    };

    const updatedAppointment = await controller.update(id, data)

    expect(updatedAppointment).toBeInstanceOf(Appointment)
    expect(updatedAppointment.doctor.id).toEqual(data.doctor);
    expect(updatedAppointment.patient.id).toEqual(data.patient);
  });

  test('remove()', async () => {
    const id = records[0].id;
    await controller.remove(id)
  });
});
