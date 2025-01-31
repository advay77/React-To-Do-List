import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Todo } from "../types"

interface AddTodoModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (todo: Todo) => void
}

export function AddTodoModal({ isOpen, onClose, onAdd }: AddTodoModalProps) {
  const [text, setText] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("0")
  const [category, setCategory] = useState("personal")
  const [image, setImage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      priority: Number.parseInt(priority),
      category,
      image,
    }
    onAdd(newTodo)
    setText("")
    setDueDate("")
    setPriority("0")
    setCategory("personal")
    setImage("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="text">Task</Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter task description"
              required
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Low</SelectItem>
                <SelectItem value="1">Medium</SelectItem>
                <SelectItem value="2">High</SelectItem>
                <SelectItem value="3">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL" />
          </div>
          <Button type="submit">Add Todo</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

