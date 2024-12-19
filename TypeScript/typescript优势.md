### TypeScript作为强类型语言的优势
  * 静态类型检查：在编译阶段发现错误，避免潜在的运行时因类型带来的问题。
  * 开发效率：提供了方法签名，提示了类型参数等。
  * 支持泛型：可以提供类型的灵活性、约束、安全性支持。可以在类、方法和接口中使用。

### 语法：定义一个数据类型

1. 简单的数据结构: `interface` 通常就足够了。
```typescript
// 接口
interface User {
  id: number;
  name: string;
  email?: string; // 可选属性
  address: {
    street: string;
    city: string;
  };
}

// 创建一个符合 User 接口的对象
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  address: {
    street: "123 Main St",
    city: "Anytown",
  },
};
```

2. 类型别名（`type`） `type`。
```typescript
// type
type Point = {
  x: number;
  y: number;
};

// 定义一个表示矩形的类型别名
type Rectangle = {
  topLeft: Point;
  bottomRight: Point;
};

const rect: Rectangle = {
  topLeft: { x: 10, y: 20 },
  bottomRight: { x: 30, y: 40 },
};
```

3. 需要方法的数据结构: 使用`class`。
  ```typescript
  // 定义一个表示用户的类
  class User {
    id: number;
    name: string;
    email?: string;
  
    constructor(id: number, name: string, email?: string) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  
    greet(): void {
      console.log(`Hello, my name is ${this.name}`);
    }
  }

  const user = new User(1, "Jane Doe", "jane.doe@example.com");
  user.greet();
  ```


4. 固定数量元素的数组: 使用`tuple`。
  ```typescript
    let point: [number, number] = [10, 20];
    
    // 定义一个表示用户的元组
    let user: [number, string, string?] = [1, "Peter", "peter@example.com"];
  ```

5. 联合类型 (Union Type): 联合类型允许一个变量具有多种类型。

  ```typescript
  // 定义一个可以是字符串或数字的类型
  type StringOrNumber = string | number;
  
  let value: StringOrNumber = "hello";
  value = 123;
  ```
