export default class LocalStorage {
  static PREFIX = 'todo_wild.';

  getItem(name: string): null|boolean|string {
    var v = window.localStorage.getItem(LocalStorage.PREFIX + name);
    if (v === null) {
      return v;
    }
    if (v.toLowerCase() === 'true' || v.toLowerCase() === 'false') {
      return eval(v);
    }
    return v;
  }
  setItem(name: string, value: boolean|string) {
    return window.localStorage.setItem(LocalStorage.PREFIX + name, value.toString());
  }
  unsetItem(name: string) {
    return window.localStorage.removeItem(LocalStorage.PREFIX + name);
  }
}