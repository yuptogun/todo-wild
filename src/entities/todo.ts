import TodoStatus from "../enums/TodoStatus"

export default class Todo {
  id: number
  todo: string
  status: TodoStatus

  isClosed() {
    return this.status === TodoStatus.Archived
  }

  isOpen() {
    return this.status === TodoStatus.Undone
        || this.status === TodoStatus.Done
  }

  isDone() {
    return this.status === TodoStatus.Done
  }

  markDone() {
    this.status = TodoStatus.Done
  }

  markUndone() {
    this.status = TodoStatus.Undone
  }

  archive() {
    this.status = TodoStatus.Archived
  }
}