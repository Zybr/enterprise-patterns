import ResourcePool from "./ResourcePool";
import { commonDbm } from "../../../database/databases";

const DB_PATH = commonDbm.getDbPath();

describe('DbPool', () => {
  beforeAll(async () => commonDbm.init());

  test('Get one resource', async () => {
    const pool = new ResourcePool(3, DB_PATH);

    const resource = pool.getResource();
    const row = await resource.selectOne("SELECT COUNT(*) as count FROM products", []);
    expect(row['count']).not.toBeUndefined();
  });

  test('Get all resources', async () => {
    const connectionsNum = 3;
    const pool = new ResourcePool(connectionsNum, DB_PATH);

    for (let i = 0; i < connectionsNum; i++) {
      const resource = pool.getResource();
      const row = await resource.selectOne("SELECT COUNT(*) as count FROM products", []);
      expect(row['count']).not.toBeUndefined();
    }

    expect(() => pool.getResource()).toThrow(new Error('There are not available resources.'));
  });

  test('Get and close resource', async () => {
    const connectionsNum = 1;
    const pool = new ResourcePool(connectionsNum, DB_PATH);

    // Make resource

    const resourceA = pool.getResource();
    const rowA = await resourceA.selectOne("SELECT COUNT(*) as count FROM products", []);
    expect(rowA['count']).not.toBeUndefined();
    expect(() => pool.getResource()).toThrow(new Error('There are not available resources.'));

    // Close resource

    resourceA.close();
    expect(() => resourceA.selectOne("", [])).toThrow(new Error('Resource is closed.'));

    // Make new resource from released connection

    const resourceB = pool.getResource();
    const rowB = await resourceB.selectOne("SELECT COUNT(*) as count FROM products", []);
    expect(rowB['count']).not.toBeUndefined();
  });
});
