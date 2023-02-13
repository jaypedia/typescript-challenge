// 원티드 프리온보딩 프론트엔드 수강생 염가희님의 모델링을 바탕으로 구현하였습니다.
// 모델링 출처 : https://github.com/yeomgahui/wanted-pre-onboarding-challenge-fe-2/blob/seconde-requirments/src/index.ts

import { v4 as uuidv4 } from 'uuid';

interface Todo {
  readonly id: string;
  contents: string;
  isCompleted: boolean;
  category?: string;
  tags?: string[];
}

interface CreateTodo extends Todo {
  isCompleted: false;
}

// todo 데이터가 들어갈 배열
const todoDB: Todo[] = [];

// 할 일을 내용 없이 추가할 수 없다.
const addTodo = (todo: Omit<CreateTodo, 'id' | 'isCompleted'>) => {
  const { contents, category, tags } = todo;
  const newTodo = {
    id: uuidv4(), // string type
    contents,
    isCompleted: false,
    category,
    tags,
  };
  todoDB.push(newTodo);
};

// ID를 제외한 모든 속성을 수정할 수 있다.
const updateTodoById = (selectedId: Todo['id'], modifiedTodo: Partial<Omit<Todo, 'id'>>) => {
  const todo = todoDB.find((todo) => todo.id === selectedId);
  if (!todo) return;
  const { contents, isCompleted, category, tags } = modifiedTodo;
  if (contents) {
    todo.contents = contents;
  }

  if (isCompleted) {
    todo.isCompleted = isCompleted;
  }

  if (category) {
    todo.category = category;
  }

  if (tags) {
    todo.tags = tags;
  }
};

// 특정 할 일의 특정 태그를 수정할 수 있다.
const updateTodoTagById = (selectedId: Todo['id'], oldTag: string, newTag: string) => {
  const todo = todoDB.find((todo) => todo.id === selectedId);
  if (!todo || !todo.tags || !todo.tags.length) return;
  const filteredTags = todo.tags.filter((tag) => tag !== oldTag);
  todo.tags = [...filteredTags, newTag];
};

// ID를 기반으로 특정 할 일을 삭제할 수 있다.
const deleteTodoById = (selectedId: Todo['id']) => {
  const todoIndex = todoDB.findIndex((todo) => todo.id === selectedId);
  todoDB.splice(todoIndex, 1);
};

// 모든 할 일을 제거할 수 있다.
const deleteTodoAll = () => {
  if (window.confirm('Are you sure you want to delete all todos?')) {
    todoDB.length = 0;
  }
};

// 특정 할 일의 모든 태그를 제거할 수 있다.
// 인수가 누락되어 구현 Pass.
const deleteTagAll = () => {};

// 특정 할 일의 특정 태그를 삭제할 수 있다.
const deleteTagByTagName = (selectedId: Todo['id'], tagName: string) => {
  const todo = todoDB.find((todo) => todo.id === selectedId);
  if (!todo || !todo.tags || !todo.tags.length) return;
  const filteredTags = todo.tags.filter((tag) => tag !== tagName);
  todo.tags = filteredTags;
};

// ID를 기반으로 특정 할 일을 조회할 수 있다.
const readTodoById = (selectedId: Todo['id']) => {
  return todoDB.find((todo) => todo.id === selectedId);
};

// 모든 할 일을 조회할 수 있다.
const readTodoAll = () => {
  return todoDB;
};
