import type { Todo } from "../types"
import { TodoItem } from "./TodoItem"

interface TodoListProps {
  todos: Todo[]
  updateTodo: (todo: Todo) => void
  deleteTodo: (id: number) => void
}

export function TodoList({ todos, updateTodo, deleteTodo }: TodoListProps) {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  )
}

