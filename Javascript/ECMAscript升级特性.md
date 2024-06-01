#### ES5的关键升级
 - 数组的方法：map()  filter()等方法
 - 另外还引入了 Object.create(), Object.defineProperty(), getters and setters, strict mode, 以及 JSON 对象

### ES6的升级
 #### for of的用法
   - 是什么：是一个用于可迭代对象，甚至是为了数组而设计的对象。`for in`以字符串为值作为循环索引

 #### 模板字符串
   - 模板中替换的代码可以是任何表达式，包括函数调用、计算式等。
   - 如果替换的值不是字符串，则按常规转换为字符串，如，对对象值调用其toString()方法.
   - 模板内使用反引号应该使用反斜杠\转义，包括$ { }字符。
   - 模板字符串中的所有空格（包括换行符和缩进）都逐字包含在输出中

 #### 箭头函数
   - 箭头函数需要返回一个对象时，如果不显式使用`return`语句，则应该将该对象使用括号包含，如下：
   ``` javascript
   var chewToys = puppies.map(puppy => {});   // BUG!
   var chewToys = puppies.map(puppy => ({})); // ok
   ```

   * JavaScript的this如何工作的，不容易弄清楚
   **常用下文局部变量方法指向`Foo`对象**
 ``` javascript
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
 内部函数**不会**继承外部函数的 this 值。在内部函数内， this 将是 window 或 undefined .临时变量 that 用于将 的 this 外部值偷运到内部函数中。（另一种方法是在内部函数上使用 .bind(this) 。这两种方式都不是特别漂亮。

 #### 解构和赋值
   - 可以解构部分，剩下的使用rest模式统一解构：
   ``` javascript
   var [head, ...tail] = [1, 2, 3, 4];
   console.log(tail);
   // [2, 3, 4]
   ```

   - 解构赋值适用于*任何可迭代对象*

   - 解构对象可将属性值赋给变量。但属性名和变量名一致时，可省略后者对象中的属性名。如下：
   ``` javascript
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
   - 主要用于解决命名冲突
   - 对象中的属性检查方法会忽略Symbol属性，如`for-in` 循环  `Object.keys(obj)` 和 `Object.getOwnPropertyNames(obj)`。但仍然可以使用新的 API， `Object.getOwnPropertySymbols(obj)` 来列出对象的符号键
   - symbol一旦创建就不能改变，不能在其上定义属性。这点上类似String

   * 如何使用symbol
     1. `Symbol()`调用，每次都返回一个新的唯一的symbol
     2. `Symbol.for()`将访问一组称为符号注册表的现有符号。与 定义的唯一符号不同 Symbol() ，符号注册表中的符号是共享的。如果调用 `Symbol.for("cat")` 30 次，则每次都会返回相同的符号。当多个网页或同一网页中的多个模块需要共享一个符号时，注册表非常有用。
     `c=Symbol.for('a'); d=Symbol.for('a') //c === d true`
     `a=Symbol('a'); b=Symbol('a'); // a !== b !== c`
     3. 使用标准定义的符号，如 `Symbol.iterator` 。一些符号由标准本身定义。每一个都有自己的特殊用途。
     
     *最后一个类别很有趣，因为它们显示了符号在实践中已经被证明是有用的。*

 #### Map和Set——Collections
   - Set和Map均可迭代

 #### Proxy和Reject
   * 示例：一个没有proxy就不能做到的事。使用Proxy实现Tree()方法，能够一次性定义3个属性。
   ``` javascript
   > var tree = Tree();
   > tree
   { }
   > tree.branch1.branch2.twig = "green";
   > tree
   { branch1: { branch2: { twig: "green" } } }
   > tree.branch1.branch3.twig = "yellow";
   { branch1: { branch2: { twig: "green" },
   branch3: { twig: "yellow" }}}
   ```
   
   * Proxy的局限
     * 内建对象具有“内部插槽”，对这些对象的访问无法被代理。请参阅上文中的解决方法。
     * 私有类字段也是如此，因为它们也是在内部使用插槽实现的。因此，代理方法的调用必须具有目标对象作为 `this` 才能访问它们。
     * 对象的严格相等性检查 === 无法被拦截。
     * 性能：基准测试（benchmark）取决于引擎，但通常使用最简单的代理访问属性所需的时间也要长几倍。实际上，这仅对某些“瓶颈”对象来说才重要。