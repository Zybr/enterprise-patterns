import UndefinedPatient from "./UndefinedPatient";

describe('UndefinedPatient', () => {
  const patient = new UndefinedPatient();

  test('getFirstName()', () => {
    expect(patient.getFirstName()).toEqual('[Not found person]');
  });

  test('getLastName()', () => {
    expect(patient.getLastName()).toEqual('');
  });
});
