import { TodoStatus } from "../enums/TodoStatus";

export default class Todo {
  id: null|number
  todo: string
  status: TodoStatus

  isClosed() {
    return this.status === TodoStatus.Archived
  }

  isOpen() {
    return this.status === TodoStatus.Undone
        || this.status === TodoStatus.Done
  }
}