import PluginFactory from "./PluginFactory";
import DoctorType from "../../Data Patterns/Data Source/Framework DAO/Enums/DoctorType";
import TherapistDoctor from "../../Introduction/Decomposition/Doctors/TherapistDoctor";
import CardiologistDoctor from "../../Introduction/Decomposition/Doctors/CardiologistDoctor";
import OncologistDoctor from "../../Introduction/Decomposition/Doctors/OncologistDoctor";
import UndefinedDoctor from "../Special Case/Doctors/UndefinedDoctor";

describe('PluginFactory', () => {
  const factory = new PluginFactory();

  test('getDoctorFactory()', () => {
    expect(
      factory
        .getDoctorFactory()
        .getDoctor()
    )
      .toBeInstanceOf(UndefinedDoctor)

    expect(
      factory
        .setType(DoctorType.Cardiologist)
        .getDoctorFactory()
        .getDoctor()
    )
      .toBeInstanceOf(CardiologistDoctor)

    expect(
      factory
        .setType(DoctorType.Oncologist)
        .getDoctorFactory()
        .getDoctor()
    )
      .toBeInstanceOf(OncologistDoctor)

    expect(
      factory
        .setType(DoctorType.Therapist)
        .getDoctorFactory()
        .getDoctor()
    )
      .toBeInstanceOf(TherapistDoctor)
  });
});
