import TodoStatus from "../enums/TodoStatus"

/**
 * open = done or undone
 * closed = archived
 */
export default class Todo {
  id: number
  todo: string
  status: TodoStatus

  isClosed() {
    return this.isArchived()
  }

  isOpen() {
    return this.isDone() || this.isUndone()
  }

  isDone() {
    return this.status === TodoStatus.Done
  }

  isUndone() {
    return this.status === TodoStatus.Undone
  }

  isArchived() {
    return this.status === TodoStatus.Archived
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