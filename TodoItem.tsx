import { useState } from "react"
import type { Todo } from "../types"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, Calendar, Flag } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

interface TodoItemProps {
  todo: Todo
  updateTodo: (todo: Todo) => void
  deleteTodo: (id: number) => void
}

export function TodoItem({ todo, updateTodo, deleteTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(todo.text)

  const handleUpdate = () => {
    updateTodo({ ...todo, text: editedText })
    setIsEditing(false)
  }

  const priorityColors = ["bg-gray-200", "bg-yellow-200", "bg-orange-200", "bg-red-200"]

  return (
    <li
      className={`flex items-start justify-between p-4 rounded-lg ${priorityColors[todo.priority]} dark:bg-opacity-20`}
    >
      <div className="flex items-start space-x-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => updateTodo({ ...todo, completed: !todo.completed })}
        />
        <div>
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleUpdate}
              onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
              className="border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.text}</span>
          )}
          <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{format(new Date(todo.dueDate), "MMM d, yyyy")}</span>
            <Flag className="w-4 h-4 ml-2 mr-1" />
            <span>Priority: {todo.priority}</span>
            <span className="ml-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">{todo.category}</span>
          </div>
        </div>
      </div>
      {todo.image && (
        <div className="ml-4">
          <Image src={todo.image || "/placeholder.svg"} alt="Todo" width={80} height={80} className="rounded" />
        </div>
      )}
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </li>
  )
}

