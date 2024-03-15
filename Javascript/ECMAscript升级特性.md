#### ES5的关键升级
 - 数组的方法：map()  filter()等方法
 - 另外还引入了 Object.create(), Object.defineProperty(), getters and setters, strict mode, 以及 JSON 对象

### ES6的升级
 #### for of的用法
   - 是什么：是一个用于可迭代对象，甚至是为了数组而设计的对象

 #### 模板字符串
   - 模板中替换的代码可以是任何表达式，包括函数调用、计算式等。
   - 如果替换的值不是字符串，则按常规转换为字符串，如，对对象值调用其toString()方法.
   - 模板内使用反引号应该使用反斜杠\转义，包括$ { }字符。
   - 模板字符串中的所有空格（包括换行符和缩进）都逐字包含在输出中

 #### 箭头函数
   - 箭头函数需要返回一个对象时，如果不显式使用`return`语句，则应该将该对象使用括号包含，如下：
   ```
   var chewToys = puppies.map(puppy => {});   // BUG!
   var chewToys = puppies.map(puppy => ({})); // ok
   ```

   * JavaScript的this如何工作的，不容易弄清楚
   **常用下文局部变量方法指向`Foo`对象**
 ```
    Foo.method = function() {
        var that = this;
        function test() {
            // 使用 that 来指向 Foo 对象
            console.log("test this", this);
            console.log("test that", that);
        }
        test();
    };
    //test this Window {window: Window, self: Window, document: document, name: '', location: Location, …}
    //test that {method: ƒ}
 ```
 内部函数不会继承外部函数的 this 值。在内部函数内， this 将是 window 或 undefined .临时变量 that 用于将 的 this 外部值偷运到内部函数中。（另一种方法是在内部函数上使用 .bind(this) 。这两种方式都不是特别漂亮。
 
 #### 解构和赋值
   - 可以解构部分，剩下的使用rest模式统一解构：
   ```
   var [head, ...tail] = [1, 2, 3, 4];
   console.log(tail);
   // [2, 3, 4]
   ```

   - 解构赋值适用于任何可迭代对象

   - 解构对象可将属性值赋给变量。但属性名和变量名一致时，可省略后者对象中的属性名。如下：
   ```
    var { foo, bar } = { foo: "lorem", bar: "ipsum" };
    console.log(foo);
    // "lorem"
    console.log(bar);
    // "ipsum"
   ```
   - 应声明变量
   - 使用对象模式赋值时，会将解构的值强制为Object；使用数组模式赋值，解构对象必须具有迭代器

   - 为未定义的要重构属性提供默认值
 
 #### Symbols
   - 主要用于内部的方法实现，