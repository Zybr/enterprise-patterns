import IdMixin from "./Mixins/IdMixin";
import { ProductType } from "../../Enums/ProductType";
import Entity from "./Entity";
import { dateToDatabase, handlePromiseError } from "../../../../Utils/utils";
import { commonDbm } from "../../../../../database/databases";

export default class ProductEntity extends IdMixin(Entity) {
  private readonly contractId: number;
  private readonly type: ProductType;
  private price: number = 0;
  private startDate: Date;

  public constructor(contractId: number, type: ProductType) {
    super();

    this.type = type;
    this.setStartDate(new Date())
  }

  public save(): Promise<this> {
    const self = this;

    return this.isNew()
      ? new Promise<this>(
        (resolve, reject) => commonDbm.getDb().run(
          `INSERT INTO products(contract_id, type, start_date, price)
           VALUES (?, ?, ?, ?)`,
          [
            this.contractId,
            this.type,
            dateToDatabase(this.startDate),
            this.price,
          ],
          function(err) {
            handlePromiseError(reject, err);
            self.setId(this.lastID)
            resolve(self);
          }
        )
      )
      : new Promise<this>(
        (resolve, reject) => commonDbm.getDb().run(
          `UPDATE contracts
           SET money = ?
           WHERE id = ?`,
          [self.getMoney(), self.getId()],
          (err) => {
            handlePromiseError(reject, err);
            resolve(self);
          }
        )
      );
  }

  public getType(): ProductType {
    return this.type;
  }

  public setStartDate(date: Date): this {
    this.startDate = new Date(date.getTime())
    this.startDate.setMinutes(0)
    this.startDate.setHours(0)
    this.startDate.setSeconds(0)
    this.startDate.setMilliseconds(0)

    return this;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public setPrice(price: number): this {
    this.price = price;

    return this;
  }

  public getPrice(): number {
    return this.price;
  }
}
