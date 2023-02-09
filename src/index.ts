interface Tag {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  content: string;
  isCompleted: boolean;
  category: string;
  tags?: Tag[];
}

interface CreateTodo {
  (todo: Pick<Todo, 'content' | 'category' | 'tags'>): Promise<Todo | void>;
}

const createTodo: CreateTodo = async (todo) => {};

interface GetTodos {
  (): Promise<Todo[] | void>;
}

const getTodos: GetTodos = async () => {};

interface GetTodoById {
  (id: Pick<Todo, 'id'>): Promise<Todo | void>;
}

const getTodoById: GetTodoById = async (id) => {};

interface UpdateTodo {
  (todo: Todo): Promise<Todo | void>;
}

const updateTodo: UpdateTodo = async (todo) => {};

interface UpdateTags {
  (id: Pick<Todo, 'id'>, tags: Tag[]): Promise<Todo | void>;
}

const updateTags: UpdateTags = async (id, tags) => {};

interface DeleteAllTodos {
  (): Promise<void>;
}

const deleteAllTodos: DeleteAllTodos = async () => {};

interface DeleteById {
  (id: Pick<Todo, 'id'>): Promise<void>;
}

const deleteTodoById: DeleteById = async (id) => {};

const deleteAllTags: DeleteById = async (id) => {};

interface DeleteTag {
  (id: Pick<Todo, 'id'>, tagId: Pick<Tag, 'id'>): Promise<Todo | void>;
}

const deleteTag: DeleteTag = async (id, tagId) => {};
