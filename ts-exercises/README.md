# 🏋🏻 [TypeScript Exercises](https://typescript-exercises.github.io/)

## Table of Contents

- [Introduction](#introduction)
  - [My goals](#my-goals)
  - [Things to cover](#things-to-cover)
  - [Rules and principles](#rules-and-principles)
- [Exercise 1. Objects](#exercise-1-objects)
  - [Problem](#problem)
  - [Solution](#solution)
- [Exercise 2. Union Types](#exercise-2-union-types)
  - [Problem](#problem-1)
  - [Solution](#solution-1)
- [Exercise 3. `in` Operator](#exercise-3--in--operator)
  - [Problem](#problem-2)
  - [Solution](#solution-2)
- [Exercise 4. Type Predicates](#exercise-4-type-predicates)
  - [Problem](#problem-3)
  - [Solution](#solution-3)
- [Exercise 5. Utility Types - Partial](#exercise-5-utility-types---partial)
  - [Problem](#problem-4)
  - [Solution](#solution-4)
- [Exercise 6. Function Overloads](#exercise-6-function-overloads)
  - [Problem](#problem-5)
  - [Solution](#solution-5)
  - [Bonus Exercise](#bonus-exercise)
  - [Bonus Exercise Solution](#bonus-exercise-solution)
- [Exercise 7. Generics](#exercise-7-generics)
  - [Problem](#problem-6)
  - [Solution](#solution-6)
- [Exercise 8. Utility Types - Omit, Pick](#exercise-8-utility-types---omit--pick)
  - [Problem](#problem-7)
  - [Solution](#solution-7)
- [Exercise 9. Generics](#exercise-9-generics)
  - [Problem](#problem-8)
  - [Solution](#solution-8)

<br>

## Introduction

### My goals

- TypeScript가 제공하는 다양한 기능들을 사용하며 TypeScript의 capability를 알기
- TypeScript의 원칙을 이해하기
- 단계별로 타입 에러가 발생한 이유, 해결한 코드와 방법을 정리하며 확실하게 배우기

### Things to cover

1. Basic typing.
2. Refining types.
3. Union types.
4. Merged types.
5. Generics.
6. Type declarations.
7. Module augmentation.
8. Advanced type mapping.

### Rules and principles

1. Avoid using "any" type at all costs.
2. Difficulty quickly grows one exercise after another.
3. Feel free to send pull-requests if you've come up with improvements!
4. Provide feedback to the creator of these exercises.
5. Enjoy. 😁

---

## Exercise 1. Objects

### Problem

- 주어진 데이터에 타입이 없다. `User` interface를 정의하고 사용해야 한다.

### Solution

```ts
export type User = {
  name: string;
  age: number;
  occupation: string;
};
```

- `user` 객체를 모델링하여 `User` type을 정의했다.

---

## Exercise 2. Union Types

### Problem

- 기존에는 `User` 타입만 있었지만 `Admin` 타입을 추가하려고 한다.
- `Person` 타입이 정의되어 있지 않기 때문에 이것을 정의하여 TS error를 고쳐야 한다.

### Solution

```ts
export type Person = User | Admin;
```

- Union type을 이용하여 `User`나 `Admin` 타입이 모두 허용되도록 정의했다.

---

## Exercise 3. `in` Operator

### Problem

  <img width="780" alt="image" src="https://user-images.githubusercontent.com/85419343/218946827-0fdee033-23c7-48ee-866a-a85aa186f5b3.png">

- `logPerson` 함수에서 발생하는 타입 에러를 고쳐야 한다.
- 이 함수는 `User`와 `Admin`을 모두 받을 수 있으며, 받은 인자에 따라 다른 결과를 출력해야 한다.
- `person` 객체가 User 타입이라면 `occupation`을, Admin 타입이라면 `role`을 출력한다.

### Solution

```ts
export function logPerson(person: Person) {
  let additionalInformation: string;
  if ('role' in person) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

- [`in` operator narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)을 활용했다.
  - narrowing이라고 하는 이유는, `in` operator가 `true` 또는 `false`를 반환하고, 이에 따라 type의 범위를 _좁히기_ 때문이다.
- [`in` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)는 JavaScript 문법으로서, object 혹은 그 object의 prototype chain에 지정된 property가 있다면 `true`를 반환한다.

---

## Exercise 4. Type Predicates

### Problem

<img width="776" alt="image" src="https://user-images.githubusercontent.com/85419343/218949308-90886910-75a4-4f5b-8a6c-79435b55048c.png">

- User와 Admin에게 "type"이라는 property를 추가하여 이 둘을 더 구분하기 쉽게 하였다.
- object type checking logic이 `isAdmin`, `isUser`로 별도의 로직으로 분리되었지만, 새로운 type error가 발생하고 있다.

### Solution

```ts
// 함수의 return type으로 type predicate를 적어준다.
export function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

export function isUser(person: Person): person is User {
  return person.type === 'user';
}
```

- narrowing을 하는 다양한 방법 중 하나인 [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)(타입 술어)를 활용했다.
- `isAdmin`, `isUser` 함수가 `person` 파라미터와 함께 호출될 때마다 TypeScript는 `person` 파라미터를 `Admin` 타입 혹은 `User` 타입으로 좁힐 것이다.

---

## Exercise 5. Utility Types - Partial

### Problem

<img width="723" alt="image" src="https://user-images.githubusercontent.com/85419343/218958482-c1ccc87c-ca26-4d06-aecd-8eace259d567.png">

- 특정한 조건을 받아 이 조건을 만족하는 user만 필터링하여 반환하는 함수가 있다. filterUser 함수의 타입 정의를 수정하여 type Error를 고쳐야 한다.
- filter criteria는 user의 일부 정보만 들어가며, "type"은 제외한다.

### Solution

```ts
export function filterUsers(persons: Person[], criteria: Partial<User>): User[] {
  ...
}
```

- criteria 인자의 타입을 명시할 때 [Utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) 종류 중 하나인 [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)을 사용하여 해결했다.

```ts
// Partial<User> 는 다음과 같다.
interface PartialUser {
  type?: 'user';
  name?: string;
  age?: number;
  occupation?: string;
}
```

- `User` Type의 모든 property가 optional로 설정된 타입을 만들게 된다. 즉, Partial은 주어진 타입의 모든 하위 집합(subset)을 나타내는 타입을 반환한다.

```ts
export function filterUsers(persons: Person[], criteria: Partial<Exclude<User, 'type'>>): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof User)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}
```

- 여기서 type 부분은 제외하려면 추가적으로 `Exclude`을 활용할 수 있다. User 타입에서 "type" property를 제외한 타입을 생성한다.

```ts
export function filterUsers(persons: Person[], criteria: Partial<Omit<User, 'type'>>): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof Omit<User, 'type'>)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}
```

- type을 제외하기 위해 Exclude 대신 `Omit`을 활용할 수도 있다. Omit은 User 타입에서 모든 property를 선택한 후, 'type'을 제거하여 타입을 생성한다.
- 하지만 이때 `Object.keys(criteria) as (keyof User)[];` 라고 하면 다음과 같은 에러가 발생한다. 따라서 `keyof Omit<User, 'type'>`라고 명시해야 한다.

```
Element implicitly has an 'any' type because expression of type 'keyof User' can't be used to index type 'Partial<Omit<User, "type">>'.
  Property 'type' does not exist on type 'Partial<Omit<User, "type">>'.ts(7053)
```

> 🧐 궁금한 점
> Exclude를 사용하면 keyof User로만 명시해도 에러가 나지 않는데, Omit을 사용하면 에러가 난다.
> Utility type의 Exclude와 Omit의 정확한 차이는 무엇일까?

---

## Exercise 6. Function Overloads

### Problem

![image](https://user-images.githubusercontent.com/85419343/219267953-360172b4-af43-4b12-975d-37f6f1ee43e8.png)

- 필터링 요구사항이 늘어서 이젠 User뿐만 아니라 모든 종류의 Person도 필터링을 해야 한다.
- Fix typing for the filterPersons so that it can filter users and return User[] when personType='user' and return Admin[] when personType='admin'.
- Also filterPersons should accept partial User/Admin type according to the personType.
- `criteria` argument should behave according to the `personType` argument value.
- `type` field is not allowed in the `criteria` field.

### Solution

- function overloads라는 타입스크립트 기능을 (처음으로!) 활용해 보았다.
  - 함수가 받아야 하는 인수의 개수나 type이 다양할 때 활용할 수 있다.
  - 함수의 인수가 다르면 결과값도 다를 때 사용하면 유용하다.
    - 이번 문제에서도 함수의 인수 중 personType이 user이면 결과는 User[]로 나와야 하고, admin이면 결과는 Admin[]으로 나와야 했다.
  - 자바스크립트로 컴파일하면 overload 부분은 사라진다.
- 2개의 function overload signature를 작성하였다.

```ts
// Overload signature 1
export function filterPersons(
  persons: Person[],
  personType: 'user',
  criteria: Partial<Omit<User, 'type'>>
): User[];

// Overload signature 2
export function filterPersons(
  persons: Person[],
  personType: 'admin',
  criteria: Partial<Omit<Admin, 'type'>>
): Admin[];

// Implementation signature
export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: Partial<Omit<Person, 'type'>>
): unknown[] {
  ...
}
```

### Bonus Exercise

```ts
let criteriaKeys = Object.keys(criteria) as (keyof User)[];
// ->
let criteriaKeys = getObjectKeys(criteria);
```

- `getObjectKeys()`라는 함수를 구현한다. 이걸 사용하면 cast를 할 필요가 없다.

### Bonus Exercise Solution

```ts
const getObjectKeys = <T>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};
```

- Generics를 사용하여 인수로 받은 객체의 타입을 "캡쳐"할 수 있다.
  - 이렇게 붙잡은 객체의 타입은 함수의 내부에서 활용할 수 있다. [`keyof` type operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)를 사용해서, 객체의 key의 문자열이나 숫자 리터럴 합집합(union)을 생성한다. 이 문제의 경우 함수에서 리턴되는 결과물은 personType이 admin이라면 `("name" | "age" | "role")[]`일 것이고 user라면 `("name" | "age" | "occupation")[]`일 것이다.
- 그러나 Object.keys(obj)의 obj 부분에 빨간 밑줄이 그어지며 다음과 같은 ts error가 발생한다.
  ![image](https://user-images.githubusercontent.com/85419343/219934461-c0a6c3b2-6852-462d-8135-2f5c08ac85ff.png)
- T 타입의 인수는 object 타입의 매개변수에 할당할 수 없다고 나오고 있다.
  - `Object.keys`는 인수로 object 타입만 받을 수 있는데 T 타입을 넘겨주니 이러한 에러가 나오는 것이다.
  - 결국 Type assertion을 사용해서 에러를 해결했다.

```ts
const getObjectKeys = <T>(obj: T) => {
  return Object.keys(obj as {}) as (keyof T)[];
};
```

---

## Exercise 7. Generics

### Problem

![image](https://user-images.githubusercontent.com/85419343/219268333-19dcc083-434e-4b22-a77a-6daaa3db18bd.png)

- Implement swap which receives 2 persons and returns them in the reverse order. The function itself is already there, actually. **We just need to provide it with proper types.**
- **Also this function shouldn't necessarily be limited to just Person types, lets type it so that it works with any two types specified.**

### Solution

```ts
export function swap<T1, T2>(v1: T1, v2: T2): [T2, T1] {
  return [v2, v1];
}
```

- TypeScript의 강력한 기능 중 하나인 Generics를 사용하여 문제를 해결했다.
  - 타입을 마치 변수처럼 쓸 수 있다.(Type variable) 이것을 사용하여 값 자체가 아닌 type에 대해 작동하도록 한다. 타입을 "capture", 즉 붙잡을 수 있게 된다. `swap` 함수는 인자 2개의 타입에 대한 정보를 잃지 않는다.

---

## Exercise 8. Utility Types - Omit, Pick

### Problem

- Define type PowerUser which should have all fields from both User and Admin (except for type)
  - also have type 'powerUser' without duplicating all the fields in the code

### Solution

```ts
type PowerUser = Omit<Admin, 'type'> & Pick<User, 'occupation'> & { type: 'powerUser' };
```

- 'type'을 제외한 모든 필드를 가져오기 위해 Utility types와 여러 타입을 하나로 결합하는 [Intersection Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types)(&)를 활용했다.
  - Admin에서는 name, age, role을 가져왔다.
  - User에서는 occupation을 가져왔다.
  - 추가적으로 필요한 필드(`{ type: 'powerUser' }`)를 추가해줬다.

---

# Exercise 9. Generics

### Problem

```ts
type UsersApiResponse =
  | {
      status: 'success';
      data: User[];
    }
  | {
      status: 'error';
      error: string;
    };

type AdminsApiResponse =
  | {
      status: 'success';
      data: Admin[];
    }
  | {
      status: 'error';
      error: string;
    };
```

- Remove UserApiResponse and AdminsApiResponse types and use generic type ApiResponse
  - to specify API response formats for each of the functions

### Solution

```ts
export type ApiResponse<T> =
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: string;
    };
```

- generic type을 활용해 data 부분만 다르고 동일한 필드를 가진 두 개의 응답 타입을 하나로 합쳤다.
  - 타입의 재사용성을 높일 수 있었다.

---
