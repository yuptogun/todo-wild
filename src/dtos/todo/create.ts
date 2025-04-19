import TodoStatus from "../../enums/TodoStatus"

export default class Create {
  todo: string
  status: TodoStatus
  list_id?: number

  constructor(todo: string, list_id?: number) {
    this.todo = todo
    this.status = TodoStatus.Undone
    this.list_id = list_id
  }
}
