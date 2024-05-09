* 任务(task)和微任务（microtask）有哪些
 * 任务: setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O事件, UI rendering
 * 微任务: process.nextTick（setImmediate）, Promises, queueMicrotask, MutationObserver 
 
* process.nextTick和setImmediate的一个重要区别，也是**微任务和任务的区别**：
  微任务的回调总是在本次循环执行完，而任务的回调在下次循环触发，因此前者**执行效率也高**。
  多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。事实上，这正是Node.js 10.0版*添加setImmediate方法的原因*，否则像下面这样的递归调用process.nextTick，将会陷入死循环，主线程根本不会去读取"事件队列"！
  ```
    process.nextTick(function foo() {
      process.nextTick(foo);
    });
  ```

- 基本概念：
 - 每个 "线程 "都有自己的事件循环，因此每个web worker都有自己的事件循环，可以独立执行，*而同一源上的所有标签页则共享一个事件循环*，因为它们可以同步通信
 - 事件循环有一个或以上的任务队列
 - 每个事件循环有一个微任务队列
 - 一个任务要么进入任务队列，要么进入微任务队列
 - 每个JavaScript脚本代码整体也是一个任务

为什么promise作为微任务——微任务可以避免一些不必要的延迟，避免一些性能问题。微任务在当前执行栈空时调用，

 * 对于使用`setTimeout()`设置的DOM的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每16毫秒执行一次。这时使用`requestAnimationFrame()`固定每1000/60毫秒执行一次，效果要好于`setTimeout()`。