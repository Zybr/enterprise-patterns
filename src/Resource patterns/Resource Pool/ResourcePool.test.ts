import ResourcePool from "./ResourcePool";
import { commonDbm } from "../../../database/databases";

const DB_PATH = commonDbm.getDbPath();
const SQL = "SELECT COUNT(*) as count FROM products"

describe('DbPool', () => {
  beforeAll(async () => commonDbm.init());

  test('Get a resource', async () => {
    const pool = new ResourcePool(3, DB_PATH);

    const resource = pool.getResource();
    const row = await resource.selectOne(SQL, []);
    expect(row['count']).not.toBeUndefined();
  });

  test('Get all resources', async () => {
    const connectionsNum = 3;
    const pool = new ResourcePool(connectionsNum, DB_PATH);

    for (let i = 0; i < connectionsNum; i++) {
      const resource = pool.getResource();
      const row = await resource.selectOne(SQL, []);
      expect(row['count']).not.toBeUndefined();
    }

    expect(() => pool.getResource()).toThrow(new Error('There are not available resources.'));
  });

  test('Close resource', async () => {
    const connectionsNum = 1;
    const pool = new ResourcePool(connectionsNum, DB_PATH);

    // Make resource

    const resourceA = pool.getResource();
    const rowA = await resourceA.selectOne(SQL, []);
    expect(rowA['count']).not.toBeUndefined();
    expect(() => pool.getResource()).toThrow(new Error('There are not available resources.'));

    // Close resource

    resourceA.close();
    expect(() => resourceA.selectOne("", [])).toThrow(new Error('Resource is closed.'));

    // Make new resource from released connection

    const resourceB = pool.getResource();
    const rowB = await resourceB.selectOne(SQL, []);
    expect(rowB['count']).not.toBeUndefined();
  });

  test('Expire resource', async () => {
    const connectionsNum = 1;
    const pool = new ResourcePool(connectionsNum, DB_PATH);

    // Make resource

    const resourceA = pool.getResource();
    const rowA = await resourceA.selectOne(SQL, []);
    expect(rowA['count']).not.toBeUndefined();

    // Expect unit resource expire

    await new Promise(resolve => setTimeout(() => resolve(null), 1100));

    expect(() => resourceA.selectOne("", [])).toThrow(new Error('Resource is closed.'));
  });
});
