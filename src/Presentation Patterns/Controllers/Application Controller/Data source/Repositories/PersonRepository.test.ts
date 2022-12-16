import RepositoryFactory from "../RepositoryFactory";
import ManagerFactory from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import Person from "../../../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";
import { fillPerson } from "../../../../../Data Patterns/Data Source/Data Mapper/utils/utils";
import PersonManager from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/Managers/PersonManager";
import PersonRepository from "./PersonRepository";

describe('PersonRepository', () => {
  const manager = new ManagerFactory().makeManager(Person.name) as PersonManager;
  const repository = new RepositoryFactory().makeRepository(Person.name) as PersonRepository;

  test('find()', async () => {
    const savedPerson = await manager.save(
      fillPerson(new Person())
    );

    // Success
    expect(await repository.find(savedPerson.id)).toEqual(savedPerson);

    // Not found
    expect(await repository.find(Math.pow(10, 10))).toBeNull();
  });

  test('findOrFail()', async () => {
    const savedPerson = await manager.save(
      fillPerson(new Person())
    );

    // Success
    expect(await repository.findOrFail(savedPerson.id)).toEqual(savedPerson);

    // Not found
    const notExistId = Math.pow(10, 10);
    expect(() => repository.findOrFail(notExistId))
      .rejects
      .toEqual(new Error(`There is not a model with ID ${notExistId}`))
  });
});
