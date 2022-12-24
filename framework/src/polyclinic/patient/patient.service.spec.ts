import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite';
import { makeEntityManager } from "../generic/utils/database";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import Patient from "./entities/patient.entity";
import { PatientService } from "./patient.service";
import { faker } from '@faker-js/faker';

describe('PatientService', () => {
  let em: EntityManager;
  let repository: EntityRepository<Patient>;
  let service: PatientService;
  let records: Patient[];
  const repositoryToken = getRepositoryToken(Patient);

  beforeAll(async () => {
    em = await makeEntityManager()
    repository = em.getRepository(Patient)

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: repositoryToken,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
  })

  beforeEach(async () => {
    records = await repository.findAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('create()', async () => {
    const data = {
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
    expect(entities[0]).toBeInstanceOf(Patient);
  });

  test('find()', async () => {
    const id = records[0].id;
    const entity = await service.findOne(id);
    expect(entity?.id).toEqual(id);
  });

  test('update()', async () => {
    const id = records[0].id;
    const data = {
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
