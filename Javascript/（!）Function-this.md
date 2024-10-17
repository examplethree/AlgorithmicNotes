## `this` 的工作原理
 在**五**种不同的情况下 ，`this` 指向的各不相同
 
 1. 全局范围内
 当在全部范围内使用 this，它将会指向全局对象。

 2. 函数调用
 **易出错，见后文示例**
 ```foo();```

 3. 方法调用
 ```test.foo();```
 这个例子中，this 指向 test 对象。

 4. 调用构造函数
 ```new foo();```
 如果函数倾向于和 `new` 关键词一块使用，则我们称这个函数是 构造函数。 在函数内部，`this` 指向新创建的对象。

 5. 显式的设置 `this`
 ```
    function foo(a, b, c) {}                  
    var bar = {};
    foo.apply(bar, [1, 2, 3]); // 数组将会被扩展，如下所示
    foo.call(bar, 1, 2, 3); // 传递到 foo 的参数是：a = 1, b = 2, c = 3
 ```
 当使用 Function.prototype 上的 call 或者 apply 方法时，函数内的 this 将会被 显式设置为函数调用的第一个参数。

 ### ★常见误解
 ```
    Foo.method = function() {
        function test() {
            // this 将会被设置为全局对象（译者注：浏览器环境中也就是 window 对象）
        }
        test();
    };
 ```
 尽管大部分的情况都说的过去，不过第一个规则（译者注：这里指的应该是第二个规则，也就是直接调用函数时，`this` 指向全局对象） 被认为是 JavaScript 语言另一个错误设计的地方，因为它从来就没有实际的用途。
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
 * 内部函数不会继承外部函数的 this 值。在内部函数内， this 将是 window 或 undefined 。临时变量 that 用于将 的 this 外部值偷运到内部函数中。（另一种方法是在内部函数上使用 .bind(this) 。这两种方式都不是特别漂亮。
 
 * 这个时候使用箭头函数用于内部，就可以继承外部函数的 this。
 * 而对将使用 `OBJECT.METHOD()` 语法调用的方法应该使用非箭头函数，也就是**需要从一个对象的属性被调用的方法**，如果上述代码第一个function使用箭头函数，则`that`不会等于Foo，而是window。这个函数将从调用方接收有意义的 this 值的函数，如上的Foo就传给了非箭头函数。

* **子类中定义的普通函数无法覆盖父类同名箭头函数**，**父类中定义的箭头函数实际上会成为子类的实例方法**，同样，如果子类中也用箭头函数定义同名函数，则子类中定义的会覆盖父类中的。
 ```javascript
 class Parent {
   getName (){
     console.log(`Parent:${this.name}`);
   }
  //  getName=()=>{
  //    console.log(`Parent:${this.name}`);
  //  }
 }

 > extend以后，相当于在Child类上添加了getName的声明，声明方式与Parent中一致，实例调用getName时**实例方法“屏蔽”了原型方法**
 class Child extends Parent{
   constructor(name){
     super();
    //  定义在实例上的属性
     this.name = name;
   }
   getName(){
     console.log(`Child:${this.name}`);
   }
 }

 let fn = new Child('trip')
 let {getName} = new Child('trip')//this丢失
 console.log('fn',fn.getName())//如果要输出  Parent：trip。换成箭头函数定义父的getName
 //是用箭头函数定义的方法会成为实例方法，function定义的则是原型方法
 ```

