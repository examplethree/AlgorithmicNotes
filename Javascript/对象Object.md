### `for in`在循环内
 和 `in`操作符一样，`for in`循环同样在查找对象属性时遍历原型链上的所有属性

### 对象的属性
 JavaScript 中所有变量都可以当作对象使用，除了两个例外 `null` 和 `undefined`
 `false.toString(); // 'false'`
 数字的字面值也可以当作对象使用，但通常会因为JavaScript解析器的错误让人误以为这样不行。  
 通常需要将字面量使用括号包围，使得解析正常进行
 `(2).toString(); //2先被计算`

 #### 对象作为数据类型
 JavaScript 的对象可以作为 *哈希表* 使用，主要用来保存命名的键与值的对应关系。
 #### 访问属性（动态创建对象）
 ```
    var foo = {name: 'kitten'}
    foo.name; // kitten
    foo['name']; // kitten

    var get = 'name'; //将属性名存储在一个变量里
    foo[get]; // kitten

    foo.1234; // SyntaxError
    foo['1234']; // works 中括号操作的特点
 ```
 两种语法是等价的，但是中括号操作符在下面两种情况下依然有效
 * 动态设置属性
 * 属性名不是一个有效的变量名（**注：**比如属性名中包含空格，或全数字，或是 JS 的关键词）
 #### 属性名的语法
 ```
    var test = {
        'case': 'I am a keyword so I must be notated as a string',
        delete: 'I am a keyword too so me' // 出错：SyntaxError
    };
 ```
 对象的属性名可以使用 *字符串* 或者*普通字符* 声明。但是由于 JavaScript 解析器的另一个错误设计， 上面的第二种声明方式在 ECMAScript 5 之前会抛出 `SyntaxError` 的错误。  

 这个错误的原因是 `delete` 是 JavaScript 语言的一个关键词；因此为了在更低版本的 JavaScript 引擎下也能正常运行， 必须使用字符串字面值声明方式。

 ### `hasOwnProperty` 函数
 `hasOwnProperty`是唯一一个JavaScript中处理属性但是**不**查找原型链的函数
 >  在支持 `Object.hasOwn` 的浏览器中，建议使用 `Object.hasOwn()`，而非 `hasOwnProperty()`。

 ### 原型
 JavaScript 不包含传统的类继承模型，而是使用 `prototype` 原型模型。

 虽然这经常被当作是 JavaScript 的缺点被提及，其实基于原型的继承模型比传统的类继承还要强大。 例如，很容易通过 *原型继承实现传统的类继承模型*，但是反过来，通过传统的类继承模型来实现原型继承模型就困难得多。

 > **注意:** 简单的使用 `Bar.prototype = Foo.prototype` 将会导致两个对象共享相同的原型。 因此，改变任意一个对象的原型都会影响到另一个对象的原型，在大多数情况下这不是希望的结果。  

 常见的继承方式(从原型链继承)：
 ```
   function Foo() {
      this.value = 42;
   }
   Foo.prototype = {
      method: function() {}
   };

   function Bar() {}

   // 1.设置 Bar 的 prototype 属性为 Foo 的实例对象
   Bar.prototype = new Foo();
   Bar.prototype.foo = 'Hello World';

   // 2.修正 Bar.prototype.constructor 为 Bar 本身
   Bar.prototype.constructor = Bar;

   var test = new Bar(); // 创建Bar的一个新实例

   // 原型链
   test [Bar的实例]
      Bar.prototype [Foo的实例] 
         { foo: 'Hello World', value: 42 }
         Foo.prototype
               {method: ...};
               Object.prototype
                  {toString: ... /* etc. */};
 ```
 > 需要注意的是 `new Bar()` 不会创造出一个新的 `Foo` 实例，而是 重复使用它原型上的那个实例；因此，所有的 `Bar` 实例都会共享相同的 `value` 属性。

 #### 实现传统的继承
 * 上文中 *使用原型链的继承* 方式存在一个问题———从父类继承下来的属性是由所有子类实例共享的，也就是说一个子类实例改动这些属性值，其他子类实例中的属性值也会被改变
 * 而调用构造函数的方法则通过父类的构造函数，为自己创建的独立的属性，不再共享。但这个方法的缺点也很明显，就是无法访问父类的原型链（父类原型链上的函数也就无法使用）。
 * 组合的方法实现继承，则是以上两种方法的结合，在调用构造函数后，再将子类的原型指向一个父类的实例，完成原型链继承的步骤。
 