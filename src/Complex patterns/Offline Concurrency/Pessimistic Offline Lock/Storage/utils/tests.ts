import { faker } from "@faker-js/faker";
import LockableRecord from "../LockableRecord";

export {
  makeRecord,
}

const makeRecord = (): LockableRecord =>
  new LockableRecord()
    .setData({value: faker.word.noun()});
