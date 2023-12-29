#### new 做了什么
 当代码 new Foo(...) 执行时，会发生以下事情：

 1. 一个继承自 Foo.prototype 的新对象被创建。
 2. 使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
 3. 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤 1 创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

* 代码实现
```
function myNew(constructor, ...args){
  const obj = Object.create(constructor.prototype);
  
  // 构造函数可能显示返回了一个对象
  const result = constrctor.apply(obj, args);

  // 如果没有显式返回对象，则使用obj对象（也就是第一行创建的对象）
  return result instanceof Object ? result : obj;
}
```