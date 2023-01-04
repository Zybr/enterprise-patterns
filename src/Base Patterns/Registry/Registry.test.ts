import Registry from "./Registry";
import PersonTableGateway from "../Layer Supertype/PersonTableGateway";
import { Database } from "sqlite3";

describe('Registry', () => {
  const registry = new Registry();

  test('getService() by class', () => {
    expect(registry.getService(Database.name)).toBeInstanceOf(Database);
    expect(registry.getService(PersonTableGateway.name)).toBeInstanceOf(PersonTableGateway);
  });

  test('getService() by class - not defined', () => {
    expect(() => registry.getService(Registry.name)).toThrow(`Service "Registry" is not defined.`);
  });

  test('getService() by alias', () => {
    expect(registry.getService('db')).toBeInstanceOf(Database);
    expect(registry.getService('person.gateway')).toBeInstanceOf(PersonTableGateway);
  });

  test('getService() by alias - not defined', () => {
    expect(() => registry.getService('not-existed')).toThrow(`Service "not-existed" is not defined.`);
  });

  test('getConfig()', () => {
    expect(registry.getConfig('databases.main.name')).toEqual('postgres');
    expect(registry.getConfig('databases.main.port')).toEqual(5432);
  });

  test('getConfig() - not defined', () => {
    expect(() => registry.getConfig('databases.invalid.path')).toThrow('Config property is node defined.');
  });
});
