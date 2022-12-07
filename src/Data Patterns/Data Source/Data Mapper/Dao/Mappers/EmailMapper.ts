import EntityMapper from "./EntityMapper";
import EmailPropsSet from "../Entities/EmailPropsSet";

export default class EmailMapper extends EntityMapper<EmailPropsSet, EmailPropsSet> {
  public mapEntity(email: EmailPropsSet, props: EmailPropsSet): EmailPropsSet {
    if (this.isInt(props.id)) {
      email.id = props.id;
    }

    if (this.isString(props.mail)) {
      email.mail = props.mail as string;
    }

    return email;
  }

  public makePropsSet(entity: EmailPropsSet): EmailPropsSet {
    return Object.assign({}, entity);
  }

  public getTableName(): string {
    return "emails";
  }

  public getColumnsNames(): string[] {
    return [
      'id',
      'mail',
    ]
  }
}
