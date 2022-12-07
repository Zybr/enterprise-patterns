import EntityManager from "./EntityManager";
import EmailPropsSet from "../Entities/EmailPropsSet";

export default class EmailManager extends EntityManager<EmailPropsSet, EmailPropsSet> {
  protected makeEntity(): EmailPropsSet {
    return {
      id: null,
      mail: '',
    };
  }
}
