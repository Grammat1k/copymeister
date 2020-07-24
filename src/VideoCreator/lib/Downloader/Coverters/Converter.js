export default class Converter {
  constructor() {
    if (new.target === Converter) {
      throw new TypeError(`Cannot construct ${new.target.constructor.name} instances directly!`);
    }
  }

  async convert(source, target) {
    throw new TypeError('Cannot call abstract method directly!');
  }
}
