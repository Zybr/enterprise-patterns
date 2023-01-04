import { default as BasePersonData } from "../../Data Patterns/Data Source/Types/PersonData";

type PersonData = BasePersonData & {
  created_at: string,
};

export default PersonData;
