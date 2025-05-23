import ResourcePool from "../ResourcePool";
import { commonDbm } from "../../../../../database/databases";
import Retryer from "./Retryer";
import { assertReject } from "../../../../utils/tests";

const pool = new ResourcePool(10, commonDbm.getDbPath());
const SQL = "SELECT COUNT(*) as count FROM persons";

describe('Retryer', () => {
  beforeAll(async () => await commonDbm.init());

  test('selectOne() - success', async () => {
    const resource = pool.getResource();
    const retryer = new Retryer(resource, 3);
    const row = await retryer.selectOne(SQL, []);

    expect(row['count']).not.toBeUndefined();

    resource.close();
  });

  test('selectOne() - fail', async () => {
    const resource = pool.getResource();
    const spy = jest.spyOn(resource, 'selectOne')
      .mockImplementation(() => Promise.reject(new Error('Error message')));
    const retryer = new Retryer(resource, 3);

    await assertReject(
      retryer.selectOne(SQL, []),
      'Error message'
    );

    expect(resource.selectOne).toBeCalled();
    expect(spy.mock.calls).toEqual([
      [SQL, []],
      [SQL, []],
      [SQL, []],
    ]);

    resource.close();
  });
});
