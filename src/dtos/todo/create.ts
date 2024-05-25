import TodoStatus from "../../enums/TodoStatus"

export default class Create {
  todo: string
  status: TodoStatus

  constructor(todo: string) {
    this.todo = todo
    this.status = TodoStatus.Undone
  }
}
