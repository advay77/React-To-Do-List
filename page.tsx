"use client"

import { useState, useEffect } from "react"
import { TodoList } from "./components/TodoList"
import { AddTodoModal } from "./components/AddTodoModal"
import { FilterSort } from "./components/FilterSort"
import { Button } from "@/components/ui/button"
import { Plus, Moon, Sun } from "lucide-react"
import type { Todo } from "./types"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("todos")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("date")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo])
    setIsModalOpen(false)
  }

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "all") return true
      if (filter === "active") return !todo.completed
      if (filter === "completed") return todo.completed
      return todo.category === filter
    })
    .sort((a, b) => {
      if (sort === "date") return b.id - a.id
      if (sort === "priority") return b.priority - a.priority
      return 0
    })

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? "dark" : ""}`}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-800 dark:to-pink-900">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Enhanced Todo List</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-white dark:bg-gray-800"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <FilterSort filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Todo
            </Button>
          </div>
          <TodoList todos={filteredTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </div>
      </div>
      <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addTodo} />
    </div>
  )
}

