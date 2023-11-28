* task和microtask有哪些
 * tasks: setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering
 * microtasks: process.nextTick, Promises, queueMicrotask, MutationObserver 

- 基本概念：
 - 每个 "线程 "都有自己的事件循环，因此每个web worker都有自己的事件循环，可以独立执行，而同一源上的所有标签页则共享一个事件循环，因为它们可以同步通信
 - 事件循环有一个或以上的任务队列
 - 每个事件循环有一个微任务队列
 - 一个任务要么进入任务队列，要么进入微任务队列
 - 每个JavaScript脚本代码整体也是一个任务

为什么promise作为微任务——微任务可以避免一些不必要的延迟，避免一些性能问题。
微任务在当前的栈空时即可调用，