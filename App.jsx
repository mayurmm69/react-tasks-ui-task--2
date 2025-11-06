import React, { useEffect, useState } from 'react'
import { listTasks, createTask, updateTask, deleteTask } from './api/api.js'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function refresh() {
    try {
      setLoading(true)
      const data = await listTasks()
      setTasks(data)
    } catch (e) {
      setError(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  async function handleCreate(payload) {
    await createTask(payload)
    await refresh()
  }

  async function handleUpdate(id, payload) {
    await updateTask(id, payload)
    await refresh()
  }

  async function handleDelete(id) {
    await deleteTask(id)
    await refresh()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-gray-600">Simple CRUD UI powered by Flask API.</p>
      </header>

      <section className="rounded-2xl border bg-white p-5 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-3">Add a Task</h2>
        <TaskForm onSubmit={handleCreate} />
      </section>

      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Your Tasks</h2>
          <button onClick={refresh} className="rounded-xl border px-3 py-1.5 hover:bg-gray-50">Refresh</button>
        </div>
        {loading ? <p>Loading...</p> : error ? <p className="text-red-600">{String(error)}</p> : <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />}
      </section>
    </div>
  )
}
