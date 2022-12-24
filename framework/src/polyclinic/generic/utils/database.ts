import { Test } from "@nestjs/testing";
import { AppModule } from "../../../app.module";
import { PolyclinicModule } from "../../polyclinic.module";
import { EntityManager } from "@mikro-orm/sqlite";

export {
  makeEntityManager,
}

const makeEntityManager = (): Promise<EntityManager> => {
  return Test.createTestingModule({
    imports: [
      AppModule,
      PolyclinicModule
    ],
  })
    .compile()
    .then(app => app.get(EntityManager).fork());
}
