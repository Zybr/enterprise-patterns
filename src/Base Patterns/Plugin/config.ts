import DoctorType from "../../Data Patterns/Data Source/Framework DAO/Enums/DoctorType";
import { default as CardiologistFactory } from "./Plugins/Doctor/Cardiologist/Factory";
import { default as OncologistFactory } from "./Plugins/Doctor/Oncologist/Factory";
import { default as TherapistFactory } from "./Plugins/Doctor/Therapist/Factory";
import { default as UndefinedFactory } from "./Plugins/Doctor/Undefined/Factory";

export default {
  doctorFactories: {
    [DoctorType.Cardiologist]: CardiologistFactory,
    [DoctorType.Oncologist]: OncologistFactory,
    [DoctorType.Therapist]: TherapistFactory,
    undefined: UndefinedFactory,
  }
}
