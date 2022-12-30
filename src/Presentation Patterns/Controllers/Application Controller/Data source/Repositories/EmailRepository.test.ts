import RepositoryFactory from "../RepositoryFactory";
import ManagerFactory from "../../../../../Data Patterns/Data Source/Data Mapper/Dao/ManagerFactory";
import { faker } from '@faker-js/faker';
import { assertReject } from "../../../../../utils/tests";

describe('EmailRepository', () => {
  const manager = new ManagerFactory().makeEmailManager();
  const repository = new RepositoryFactory().makeEmailRepository();

  test('find()', async () => {
    const savedEmail = await manager.save(
      {
        id: null,
        mail: faker.internet.email()
      });

    // Success
    expect(await repository.find(savedEmail.id)).toEqual(savedEmail);

    // Not found
    expect(await repository.find(Math.pow(10, 10))).toBeNull();
  });

  test('findOrFail()', async () => {
    const savedEmail = await manager.save(
      {
        id: null,
        mail: faker.internet.email()
      });

    // Success
    expect(await repository.findOrFail(savedEmail.id)).toEqual(savedEmail);

    // Not found
    const notExistId = Math.pow(10, 10);
    await assertReject(
      repository.findOrFail(notExistId),
      `There is not a model with ID ${notExistId}`
    );
  });
});
