const PREFIX = 'todo_wild.';

export default class LocalStorage {
  getItem(name: string): null|boolean|string {
    var v = window.localStorage.getItem(PREFIX + name);
    if (v === null) {
      return v;
    }
    if (v.toLowerCase() === 'true' || v.toLowerCase() === 'false') {
      return eval(v);
    }
    return v;
  }
  setItem(name: string, value: boolean|string) {
    return window.localStorage.setItem(PREFIX + name, value.toString());
  }
  unsetItem(name: string) {
    return window.localStorage.removeItem(PREFIX + name);
  }
}