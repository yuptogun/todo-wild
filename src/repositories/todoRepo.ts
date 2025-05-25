import { openDB } from "idb";
import { instanceToPlain } from "class-transformer";
import Todo from "../entities/todo";
import List from "../entities/list";
import CreateTodo from "../dtos/todo/create";
import CreateList from "../dtos/list/create";

const version = 2;
const dbName = 'todo-wild';
const storeTodos = 'todos';
const storeLists = 'todo_lists';

export default class TodoRepo {
  async getDB() {
    return await openDB(dbName, version, {
      upgrade: (db, oldVersion, newVersion, tx) => {
        if (oldVersion < 1) {
          db.createObjectStore(storeTodos, { keyPath: 'id', autoIncrement: true });
        }
        if (oldVersion < 2) {
          db.createObjectStore(storeLists, { keyPath: 'id', autoIncrement: true });
          tx.objectStore(storeTodos).createIndex('list_id', 'list_id');
        }
      }
    });
  }

  async getAllTodo(listID: number|null): Promise<Todo[]> {
    const db = await this.getDB();
    return listID === null
      ? await db.getAll(storeTodos)
      : await db.getAllFromIndex(storeTodos, 'list_id', listID);
  }

  async createTodo(dto: CreateTodo) {
    const db = await this.getDB();
    return db.add(storeTodos, instanceToPlain(dto));
  }

  async updateTodo(todo: Todo) {
    const db = await this.getDB();
    return db.put(storeTodos, instanceToPlain(todo));
  }

  async deleteTodo(todo: Todo) {
    const db = await this.getDB();
    return db.delete(storeTodos, todo.id);
  }

  async getAllList(): Promise<List[]> {
    const db = await this.getDB();
    return db.getAll(storeLists);
  }

  async getList(listID: number): Promise<List> {
    const db = await this.getDB();
    return db.get(storeLists, listID);
  }

  async createList(dto: CreateList) {
    const db = await this.getDB();
    return db.add(storeLists, instanceToPlain(dto));
  }

  async updateList(list: List) {
    if (list.id) {
      const db = await this.getDB();
      return db.put(storeLists, instanceToPlain(list));
    }
  }

  async deleteList(list: List) {
    if (list.id) {
      const listID = list.id;
      const db = await this.getDB();
      // const tx = db.transaction([storeTodos, storeLists]);
      db.getAllFromIndex(storeTodos, 'list_id', listID).then((todos) => {
        return Promise.all(todos.map((t) => {
          var todo = instanceToPlain(t);
          todo.list_id = undefined;
          return db.put(storeTodos, todo);
        }));
      }).then(() => {
        return db.delete(storeLists, listID);
      });
    }
  }

  async exportDB() {
    const db = await this.getDB();
    return {
      version: db.version,
      storeTodos: await db.getAll(storeTodos),
      storeLists: await db.getAll(storeLists)
    };
  }
}
