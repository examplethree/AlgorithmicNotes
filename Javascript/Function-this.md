## `this` 的工作原理
 在**五**种不同的情况下 ，`this` 指向的各不相同
 
 ### 全局范围内
 当在全部范围内使用 this，它将会指向全局对象。
 ### 函数调用
 **易出错，见后文示例**
 ```foo();```
 ### 方法调用
 ```test.foo();```
 这个例子中，this 指向 test 对象。
 ### 调用构造函数
 ```new foo();```
 如果函数倾向于和 `new` 关键词一块使用，则我们称这个函数是 构造函数。 在函数内部，`this` 指向新创建的对象。
 ### 显式的设置 `this`
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
        }
        test();
    };
 ```