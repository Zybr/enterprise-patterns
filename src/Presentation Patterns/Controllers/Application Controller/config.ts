import PersonTemplateView from "../../View Patterns/Two Step View/PersonTemplateView";
import RepositoryFactory from "./Data source/RepositoryFactory";
import Person from "../../../Data Patterns/Data Source/Data Mapper/Domain/Models/Person";

const personRep = new RepositoryFactory().makeRepository(Person.name);
const personView = new PersonTemplateView();

const config = {
  'get-person': {
    command: personRep.find.bind(personRep),
    view: personView.render.bind(personView),
  }
}

export default config;
