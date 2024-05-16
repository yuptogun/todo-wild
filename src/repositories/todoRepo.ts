import { openDB } from "idb"
import { instanceToPlain } from "class-transformer"
import Todo from "../entities/todo"
import Create from "../dtos/todo/create"

const dbName = 'todo-wild'
const storeName = 'todos'
const version = 1

export default class TodoRepo {
  async getDB() {
    return await openDB(dbName, version, {
      upgrade: (db) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
        }
      }
    })
  }

  async getAll() {
    const db = await this.getDB()
    return await db.getAll(storeName)
  }

  async create(dto: Create) {
    const db = await this.getDB()
    db.add(storeName, instanceToPlain(dto))
  }

  async update(todo: Todo) {
    const db = await this.getDB()
    db.put(storeName, instanceToPlain(todo), `${todo.id}`)
  }

  async delete(todo: Todo) {
    const db = await this.getDB()
    db.delete(storeName, `${todo.id}`)
  }
}
