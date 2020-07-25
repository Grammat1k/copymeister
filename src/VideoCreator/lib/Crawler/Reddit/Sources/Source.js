export default class Source {
  constructor() {
    if (new.target === Source) {
      throw new TypeError(`Cannot construct ${new.target.constructor.name} instances directly!`);
    }
  }

  async retriveMetaData() {
    throw new TypeError('Cannot call abstract method directly!');
  }

  async download() {
    throw new TypeError('Cannot call abstract method directly!');
  }
}
