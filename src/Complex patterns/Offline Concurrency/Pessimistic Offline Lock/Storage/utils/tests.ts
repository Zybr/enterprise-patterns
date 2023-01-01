import { faker } from "@faker-js/faker";
import LockableRecord from "../LockableRecord";
import Record from "../../../generic/Storage/Record";

export {
  makeLockableRecord,
  makeRecord,
}

const makeLockableRecord = (): LockableRecord =>
  new LockableRecord()
    .setData({value: faker.word.noun()});

const makeRecord = (): Record =>
  new Record()
    .setData({value: faker.word.noun()});
