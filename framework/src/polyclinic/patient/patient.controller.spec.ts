import { Test, TestingModule } from '@nestjs/testing';
import { makeEntityManager } from "../generic/utils/database";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/sqlite";
import { PatientController } from "./patient.controller";
import Patient from "./entities/patient.entity";
import { faker } from "@faker-js/faker";
import { PatientService } from "./patient.service";

describe('PatientController', () => {
  let controller: PatientController;
  let repository: EntityRepository<Patient>;
  let records: Patient[];

  beforeAll(async () => {
    const em = await makeEntityManager()
    const repositoryToken = getRepositoryToken(Patient);
    repository = em.getRepository(Patient)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: repositoryToken,
          useValue: repository,
        },
      ],
      controllers: [
        PatientController,
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
  });

  beforeEach(async () => records = await repository.findAll())

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('create()', async () => {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const updatedPatient = await controller.create(data)

    expect(updatedPatient).toBeInstanceOf(Patient)
    expect(updatedPatient.firstName).toEqual(data.firstName);
    expect(updatedPatient.lastName).toEqual(data.lastName);
  });

  test('findAll()', async () => {
    const patients = await controller.findAll();

    expect(patients[0]).toBeInstanceOf(Patient);
    expect(records.length).toEqual(patients.length)
  });

  test('findOne()', async () => {
    const id = records[0].id;
    const patient = await controller.findOne(id);

    expect(patient).toBeInstanceOf(Patient);
    expect(patient.id).toEqual(id)
  });

  test('update()', async () => {
    const id = records[0].id;
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const updatedPatient = await controller.update(id, data)

    expect(updatedPatient.id).toEqual(id);
    expect(updatedPatient.firstName).toEqual(data.firstName);
    expect(updatedPatient.lastName).toEqual(data.lastName);
  });

  test('remove()', async () => {
    const id = records[0].id;
    await controller.remove(id)
  });
});
