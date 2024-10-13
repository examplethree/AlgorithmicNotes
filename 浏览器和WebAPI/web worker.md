是一个 WebAPI，Web Worker 使得在独立于 Web 应用程序主执行线程，在后台线程中运行脚本成为可能。

1. Worker是一个使用构造函数创建的实例，例如 Worker()。
2. worker不能直接操作DOM元素，也不能访问window（属性和方法）
3. 数据通信：worker和主线程使用onmessage和postMessage通信。其中的数据是从主线程**复制的，而非共享。**
4. 同源：worker需要和主线程托管在同一个origin中。worker可以使用 XMLHttpRequest 来访问网络，但 XMLHttpRequest 的 responseXML 和 channel 属性始终返回 null。（出于线程隔离和安全性考虑，浏览器在 Worker 中禁用了直接访问或解析 DOM 的能力，这包括 responseXML 返回的 DOM 对象。）

#### 类型
1. 专用worker，供单个脚本使用。
2. 共享worker，是可以由在不同窗口、IFrame 等中运行的多个脚本使用的 worker，只要它们与 worker 在同一域中。它们比专用的 worker 稍微复杂一点——脚本必须通过活动端口进行通信。
3. Service Worker，基本上是作为代理服务器，位于 web 应用程序、浏览器和网络（如果可用）之间。它们的目的是（除开其他方面）创建有效的离线体验、拦截网络请求，以及根据网络是否可用采取合适的行动并更新驻留在服务器上的资源。它们还将允许访问推送通知和后台同步 API。

* 专用worker的使用
 1. 创建 Web Worker 文件
首先，创建一个单独的文件（如 worker.js），该文件中的代码将在 Web Worker 中执行
```javascript
  // worker.js
  self.onmessage = function(e) {
    console.log('Worker: Message received from main script');
    const result = e.data[0] * e.data[1];
    self.postMessage(result);
    console.log('Worker: Posting message back to main script');
  };
```
2.  在主线程中使用 Web Worker
```javascript
  // main.js
  if (window.Worker) {
    const myWorker = new Worker('worker.js');
  
    const num1 = 10;
    const num2 = 20;
  
    // 发送消息给 Web Worker
    myWorker.postMessage([num1, num2]);
    console.log('Main: Message posted to worker');
  
    // 接收 Web Worker 处理完成的消息
    myWorker.onmessage = function(e) {
      console.log('Main: Message received from worker', e.data);
    };
  
    myWorker.onerror = function(e) {
      console.log('Main: There was an error with the worker', e.message);
    };
  }
```