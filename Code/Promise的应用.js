// 使用Promise，不使用循环和setInterval
// 实现 function repeat(func, times, wait){} ,使得执行如下语句后，
// repeatConsole=repeat(console.log, 4, 3000); repeatConsole('HelloWord')
// 实现执行4次console.log('HelloWord')，每次间隔3秒


let repeatConsole = runWithRepeat(console.log, 4, 3000)
repeatConsole('Hello World!')

function runWithRepeat(fn, times, wait){
    return (...args) => {
        function repaet(restTimes){
            if(restTimes <= 0){
                return;
            }
            new Promise((resolve, reject) => {
                fn(...args, restTimes);
                setTimeout(()=>{
                    resolve();
                }, wait);
            })
            .then(() => {
                repaet(restTimes-1);
            })
        }
        repaet(times);
    }
}

//2025.03.11
// params没有用展开...params
function repeat(func, times, wait){
    return function(params){
        let helper = function(rest){
            if(rest<1){
                return;
            }

            func(params);
            setTimeout(()=>{
                helper(rest-1);
            }, wait);
            // Promise.resolve(func(params))
            // .then(
            //     ()=>{
            //         setTimeout(()=>{
            //             helper(rest-1);
            //         }, wait);
            //     }
            // )
        }
        helper(times);
    }
}

// 面试时的破烂实现
// function repeat(func, times, wait){
//     return (...args) => { 
//         function helper(count){
//             if(count > 0){
//                 func(...args);
//                 return new Promise(resolve =>{
//                     setTimeout(()=>{
//                         resolve(helper(count-1));
//                     }, wait)
//                 })
//             } else {
//                 return Promise.resolve()
//             }
//         }

//         helper(times);
//     }
// }
