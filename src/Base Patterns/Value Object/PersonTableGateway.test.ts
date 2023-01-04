import { commonDbm } from "../../../database/databases";
import { createPersonData } from "../../Data Patterns/Data Source/Utils/database";
import PersonTableGateway from "./PersonTableGateway";
import PersonData from "./PersonData";
import { dbStringToDateTime } from "../../utils/utils";
import DateRange from "./DateRange";
import { makeDate } from "./utils/time";

describe('PersonTableGateway', () => {
  const gateway = new PersonTableGateway(commonDbm.getDb());
  const dateTimeFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  let personData: PersonData;

  beforeAll(async () => {
    await commonDbm.init();
    personData = await createPersonData() as PersonData;
    personData = await gateway.find(personData.id);
  });

  test('findBy', async () => {
    expect(personData.created_at).toMatch(dateTimeFormat)
  });

  test('findCreatedAtRange', async () => {
    const dateTime = dbStringToDateTime(personData.created_at);
    const range = new DateRange(dateTime, dateTime)

    expect(await gateway.findCreatedAtRange(range)).toHaveLength(1);

    const rangeBefore = new DateRange(
      makeDate(-2),
      makeDate(-1),
    )
    expect(await gateway.findCreatedAtRange(rangeBefore)).toHaveLength(0);

    const rangeAfter = new DateRange(
      makeDate(1),
      makeDate(2),
    )
    expect(await gateway.findCreatedAtRange(rangeAfter)).toHaveLength(0);
  });
});
