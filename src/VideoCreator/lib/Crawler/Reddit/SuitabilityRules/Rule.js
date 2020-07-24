export default class Rule {
  constructor() {
    if (new.target === Rule) {
      throw new TypeError('Cannot construct Rule instances directly!');
    }
  }

  validate(post, opts) {
    throw new TypeError('Cannot call abstract method directly!');
  }
}
