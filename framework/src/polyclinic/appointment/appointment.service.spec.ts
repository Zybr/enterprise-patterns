import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite';
import { makeEntityManager } from "../generic/utils/database";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import Appointment from "./entities/appointment.entity";
import { AppointmentService } from "./appointment.service";
import Patient from "../patient/entities/patient.entity";
import Doctor from "../doctor/entities/doctor.entity";

describe('AppointmentService', () => {
  let em: EntityManager;
  let repository: EntityRepository<Appointment>;
  let patientRep: EntityRepository<Patient>;
  let doctorRep: EntityRepository<Doctor>;
  let service: AppointmentService;
  let records: Appointment[];
  const repositoryToken = getRepositoryToken(Appointment);

  beforeAll(async () => {
    em = await makeEntityManager()
    repository = em.getRepository(Appointment);
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
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  })

  beforeEach(async () => {
    records = await repository.findAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('create()', async () => {
    const data = {
      patient: (await patientRep.findAll())[0].id,
      doctor: (await doctorRep.findAll())[0].id,
    };

    const entity = await service.create(data);

    expect(entity.id).not.toBeNull();
    expect(entity.patient.id).toEqual(data.patient);
    expect(entity.doctor.id).toEqual(data.doctor);
  });

  test('findAll()', async () => {
    const entities = await service.findAll();
    expect(entities.length).toEqual(records.length)
    expect(entities[0]).toBeInstanceOf(Appointment);
  });

  test('find()', async () => {
    const id = records[0].id;
    const entity = await service.findOne(id);
    expect(entity?.id).toEqual(id);
  });

  test('update()', async () => {
    const data = {
      patient: (await patientRep.findAll())[0].id,
      doctor: (await doctorRep.findAll())[0].id,
    };

    const entity = await service.create(data);

    expect(entity.id).not.toBeNull();
    expect(entity.patient.id).toEqual(data.patient);
    expect(entity.doctor.id).toEqual(data.doctor);
  });

  test('remove()', async () => {
    const id = records[0].id;
    await service.remove(id);
    expect(await repository.findOne({id})).toBeNull()
  });
});
