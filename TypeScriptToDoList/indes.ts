interface TodoItem {
  id: number;
  title: string;
  status: boolean; // true means done
}

class Todo {
  todoArray: TodoItem[] = [];
  todoId: number = 0;

  constructor(title: string) {
    const newTodo = { id: ++this.todoId, title, status: false };
    this.todoArray = [newTodo];
  }

  getTodoList = (): TodoItem[] => {
    return this.todoArray;
  };

  insertTodo = (title: string): void => {
    const newTodo = { id: ++this.todoId, title, status: false };
    this.todoArray = [...this.todoArray, newTodo];
  };

  changeTodoStatus = (title: string): void => {
    this.todoArray = this.todoArray.map((todo) =>
      todo.title === title ? { ...todo, status: !todo.status } : todo
    );
  };

  deleteTodo = (title: string): void => {
    const index = this.todoArray.findIndex((todo) => todo.title === title);
    if (index > -1) {
      this.todoArray.splice(index, 1);
    }
  };

  findTodo = (title: string): TodoItem | null => {
    return this.todoArray.find((todo) => todo.title === title) || null;
  };

  filterTodo = <K extends keyof TodoItem>(
    key: K,
    value: TodoItem[K]
  ): TodoItem[] => {
    return this.todoArray.filter((todo) => todo[key] === value);
  };
}

const todoList = new Todo("first todo");
console.log(todoList.getTodoList());
console.log(todoList.findTodo("first todo"));
todoList.insertTodo("second todo");
todoList.insertTodo("third todo");
console.log(todoList.getTodoList());
