// 使用Promise，不使用循环和setInterval
// 实现 function repaet(func, times, wait){} ,使得执行如下语句后，
// repeatConsole=repeat(console.log, 4，3000); repeatConsole('HelloWord')
// 实现执行4次console.log('HelloWord')，每次间隔3秒

function repeat(func, times, wait){
    return (...args) => {
        function helper(count){
            if(count > 0){
                func(...args);
                return new Promise(resolve =>{
                    setTimeout(()=>{
                        resolve(helper(count-1));
                    }, wait)
                })
            } else {
                return Promise.resolve()
            }
        }

        helper(times);
    }
}

let repeatConsole = repeat(console.log, 4, 3000)
repeatConsole('Hello World!')