import IPersonSelectCriteria from "../Selection Factory/criteria/IPersonSelectCriteria";
import Person from "../models/Person";
import PersonPropsSet from "../Update Factory/properties/PersonPropSet";

/** How the PersonObjectAssembler could look */
export default interface IPersonObjectAssembler {
  read(criteria: IPersonSelectCriteria): Promise<Person[]>

  /**
   * @param props
   * @param target (!) Examples and schema have only one parameter
   */
  write(props: PersonPropsSet, target: PersonPropsSet | null): Promise<Person[]>;

  delete(Person): Promise<number>;
}
