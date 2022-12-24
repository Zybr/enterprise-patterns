import { Test, TestingModule } from '@nestjs/testing';
import { makeEntityManager } from "../generic/utils/database";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/sqlite";
import { DoctorController } from "./doctor.controller";
import Doctor from "./entities/doctor.entity";
import { faker } from "@faker-js/faker";
import { DoctorService } from "./doctor.service";
import FakerFactory from "../../services/faker.factory";
import DoctorType from "./enums/doctor-type.enum";

describe('DoctorController', () => {
  let controller: DoctorController;
  let repository: EntityRepository<Doctor>;
  let records: Doctor[];

  beforeAll(async () => {
    const em = await makeEntityManager()
    const repositoryToken = getRepositoryToken(Doctor);
    repository = em.getRepository(Doctor)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: repositoryToken,
          useValue: repository,
        },
      ],
      controllers: [
        DoctorController,
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
  });

  beforeEach(async () => records = await repository.findAll())

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('create()', async () => {
    const data = {
      type: FakerFactory.randomItem(Object.values(DoctorType)),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const updatedDoctor = await controller.create(data as any)

    expect(updatedDoctor).toBeInstanceOf(Doctor)
    expect(updatedDoctor.firstName).toEqual(data.firstName);
    expect(updatedDoctor.lastName).toEqual(data.lastName);
  });

  test('findAll()', async () => {
    const doctors = await controller.findAll();

    expect(doctors[0]).toBeInstanceOf(Doctor);
    expect(records.length).toEqual(doctors.length)
  });

  test('findOne()', async () => {
    const id = records[0].id;
    const doctor = await controller.findOne(id);

    expect(doctor).toBeInstanceOf(Doctor);
    expect(doctor.id).toEqual(id)
  });

  test('update()', async () => {
    const id = records[0].id;
    const data = {
      type: FakerFactory.randomItem(Object.values(DoctorType)),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const updatedDoctor = await controller.update(id, data)

    expect(updatedDoctor.id).toEqual(id);
    expect(updatedDoctor.firstName).toEqual(data.firstName);
    expect(updatedDoctor.lastName).toEqual(data.lastName);
  });

  test('remove()', async () => {
    const id = records[0].id;
    await controller.remove(id)
  });
});
