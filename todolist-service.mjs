export class TodoListService {
  todoList = ["yahoooo", "yoo", "yooooo"];

  getJsonTodoList() {
    return JSON.stringify({
      code: 200,
      status: "ok",
      data: this.todoList.map((todo, index) => {
        return {
          id: index,
          todo: todo,
        };
      }),
    });
  }

  getTodoList(req, res) {
    res.write(this.getJsonTodoList());
    res.end();
  }

  createTodo(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      this.todoList.push(body.todo);

      res.write(this.getJsonTodoList());
      res.end();
    });
  }

  updateTodo(req, res) {
    req.addListener("data", (data) => {
      const body = JSON.parse(data.toString());
      if (this.todoList[body.id]) {
        this.todoList[body.id] = body.todo;
      }

      res.write(this.getJsonTodoList());
      res.end();
    });
  }

  deleteTodo(req, res) {
    req.addListener("data", (data) => {
        const body = JSON.parse(data.toString());
        if (this.todoList[body.id]) {
          this.todoList.splice(body.id, 1);
        }
  
        res.write(this.getJsonTodoList());
        res.end();
      });
  }
}
