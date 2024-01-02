#### onclick是什么
  `onclick` 是一个HTML属性，每个元素只能有一个`onclick`处理程序.
  `addEventListener()` 是一个方法。

#### 
  * 使用addEventListener()有利于代码分离和可维护性

#### 区别
1. `addEventListener()`方法可以对一个元素绑定多个事件，执行顺序从上到下依次。而 `onclick`一个元素只能绑定一个事件，前面出现的事件会被覆盖

2. `addEventListener()`可以控制执行什么机制——冒泡或捕获机制。通过`addEventListener()`的第三个参数（Boolean），默认为`false`，执行冒泡机制，`true`执行捕获机制。

4. `addEventListener()`移除事件需要使用`removeListener()`方法，`onclick`只需要使指针指向null也就是赋值为null即可。

3. 注册`addEventListener()`事件不需要写on，`onclick`事件必须加on

