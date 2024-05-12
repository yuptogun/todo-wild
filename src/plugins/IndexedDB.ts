import { openDB } from "idb";

/**
 * `todos` 오브젝트를 가진 `todo-wild` 데이터베이스가 Indexed DB에 생성되도록 보장한다. 그 이상의 기능은 없음.
 */
export default {
  install: async () => {
    await openDB('todo-wild', 1, {
      upgrade: (db) => {
        if (!db.objectStoreNames.contains('todos')) {
          db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }
}
