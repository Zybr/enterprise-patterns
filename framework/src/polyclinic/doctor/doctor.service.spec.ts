import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite';
import { makeEntityManager } from "../generic/utils/database";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { faker } from '@faker-js/faker';
import Doctor from "./entities/doctor.entity";
import { DoctorService } from "./doctor.service";
import DoctorType from "./enums/doctor-type.enum";

describe('DoctorService', () => {
  let em: EntityManager;
  let repository: EntityRepository<Doctor>;
  let service: DoctorService;
  let records: Doctor[];
  const repositoryToken = getRepositoryToken(Doctor);

  beforeAll(async () => {
    em = await makeEntityManager()
    repository = em.getRepository(Doctor)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: repositoryToken,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
  })

  beforeEach(async () => {
    records = await repository.findAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('create()', async () => {
    const data = {
      type: DoctorType.THERAPIST,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const entity = await service.create(data);
    expect(entity.id).not.toBeNull();
    expect(entity.firstName).toEqual(data.firstName);
    expect(entity.lastName).toEqual(data.lastName);
  });

  test('findAll()', async () => {
    const entities = await service.findAll();
    expect(entities.length).toEqual(records.length)
    expect(entities[0]).toBeInstanceOf(Doctor);
  });

  test('find()', async () => {
    const id = records[0].id;
    const entity = await service.findOne(id);
    expect(entity?.id).toEqual(id);
  });

  test('update()', async () => {
    const id = records[0].id;
    const data = {
      type: DoctorType.CARDIOLOGIST,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };

    const entity = await service.update(id, data);
    expect(entity.id).toEqual(id)
    expect(entity.firstName).toEqual(data.firstName);
    expect(entity.lastName).toEqual(data.lastName);

    const record = await repository.findOne(id);
    expect(record.id).toEqual(id)
    expect(record.firstName).toEqual(data.firstName);
    expect(record.lastName).toEqual(data.lastName);
  });

  test('remove()', async () => {
    const id = records[0].id;
    await service.remove(id);
    expect(await repository.findOne({id})).toBeNull()
  });
});
