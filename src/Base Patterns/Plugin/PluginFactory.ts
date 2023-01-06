import IDoctorFactory from "./IDoctorFactory";
import DoctorType from "../../Data Patterns/Data Source/Framework DAO/Enums/DoctorType";
import config from "./config";

export default class PluginFactory {
  private readonly config = config
  private type: DoctorType | null = null;

  public setType(type: DoctorType): this {
    this.type = type;
    return this;
  }

  public getDoctorFactory(): IDoctorFactory {
    return new (this.config.doctorFactories[this.type] || this.config.doctorFactories.undefined)();
  }
}
