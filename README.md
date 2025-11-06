# Task 2 – React Frontend (Vite + Tailwind)

Frontend UI to **Add / Edit / Delete / View** tasks using Flask CRUD APIs.

## Run (Development)
```bash
# 1) install
npm install

# 2) set API base (optional; defaults to http://127.0.0.1:5000/api)
cp .env.example .env
# then edit VITE_API_BASE_URL in .env if needed

# 3) start dev server (http://localhost:5173)
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## API
By default the app uses `VITE_API_BASE_URL=http://127.0.0.1:5000/api`.
Endpoints expected:
- `GET    /tasks`            – list tasks
- `POST   /tasks`            – create task
- `PATCH  /tasks/:id`        – update task title/description (JSON body)
- `DELETE /tasks/:id`        – delete task

> If you're using the backend I shared earlier, add these two quick endpoints to enable Edit/Delete:
```py
# app/routes/tasks.py
@tasks_bp.patch("/tasks/<int:task_id>")
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    payload = request.get_json(silent=True) or {}
    if "title" in payload: task.title = payload["title"]
    if "description" in payload: task.description = payload["description"]
    db.session.commit()
    return task_schema.jsonify(task), 200

@tasks_bp.delete("/tasks/<int:task_id>")
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task); db.session.commit()
    return jsonify({"message": "deleted"}), 200
```
