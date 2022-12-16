import config from "../config";

/**
 * Inject command and view into action item
 *
 * @param name Key of config
 */
export default function action(name: string) {
  const {command, view} = config[name];

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = (...args) => method.apply(this, [...args, command, view]);
  }
}
