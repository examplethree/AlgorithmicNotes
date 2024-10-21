// 使用Promise，不使用循环和setInterval
// 实现 function repaet(func, times, wait){} ,使得执行如下语句后，
// repeatConsole=repeat(console.log, 4，3000); repeatConsole('HelloWord')
// 实现执行4次console.log('HelloWord')，每次间隔3秒

function repeat(func, times, wait) {
    return function (...args) {
        // 定义递归函数来处理多次执行
        const execute = (count) => {
            if (count > 0) {
                func(...args);
                // 使用 Promise 延迟后递归调用下一次
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(execute(count - 1));
                  }, wait);
                });
            } else {
                return Promise.resolve(); // 执行完成，返回 resolved 的 Promise
            }
        };

        execute(times);
    };
}
  
// 测试调用
const repeatConsole = repeat(console.log, 4, 3000);
repeatConsole('HelloWord'); // 每隔3秒打印一次 'HelloWord'，共4次
  
// 提及尾递归