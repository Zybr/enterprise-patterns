export default class FakerFactory {
  public static randomItem<T>(list: T[]): T {
    const inx = Math.floor(Math.random() * list.length);
    return list[inx];
  }
}
