import { default as IBaseILine } from "../../generic/Storage/ILine";

export default interface ILockableLine extends IBaseILine {
  isLocked: boolean;
}
