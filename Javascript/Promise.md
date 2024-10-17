### 是什么，为什么出现
  * Promise是一个异步微任务，可以用来解决异步回调嵌套的问题。Promise是一个构造函数，可以用它new一个Promise实例，它接收一个函数executor作为参数，这个函数接收两个参数。

  ```
  let promise = new Promise(function(resolve, reject) {
    // 当 promise 被构造完成时，自动执行此函数
  
    // 1 秒后发出工作已经被完成的信号，并带有结果 "done"
    setTimeout(() => resolve("done"), 1000);
  });
  ```
  通过运行上面的代码，我们可以看到两件事儿：
   * executor 被自动且立即调用（通过 new Promise）。
   * executor 接受两个参数：resolve 和 reject。这些函数由 JavaScript 引擎预先定义，因此我们不需要创建它们。我们只需要在准备好（译注：指的是 executor 准备好）时调用其中之一即可。
  经过 1 秒的“处理”后，executor 调用 resolve("done") 来产生结果。这将改变 promise 对象的`state`：Pending → Fulfilled，`result`由`undefined`变为`"done"`.
  
  >`state` 和 `result` 都是内部的
  > Promise 对象的 `state` 和 `result` 属性都是内部的。我们无法直接访问它们。但我们可以对它们使用 `.then`/`.catch`/`.finally` 方法。我们在下面对这些方法进行了描述。

##### then
  **执行成功或失败都可以在then中处理**。
  * .then 的第一个参数是一个函数，该函数将在 promise `resolved` 且接收到结果后执行。
  * .then 的第二个参数也是一个函数，该函数将在 promise `rejected` 且接收到 error 信息后执行。

  ```
  promise.then(
    function(result) { /* handle a successful result */ },
    function(error) { /* handle an error */ }
  );
  ```

##### catch
  `.catch(f)` 调用是 `.then(null, f)` 的完全的模拟，它只是一个简写形式。
  
##### finally
  调用 `.finally(f)` 类似于 `.then(f, f)`，因为当 promise settled 时 f 就会执行：无论 promise 被 resolve 还是 reject。
