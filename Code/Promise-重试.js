// 使用示例
// const testFn = () => {
//     const n = Math.random();
//     return n>0.1 ? Promise.reject() : Promise.resolve();
// }
// runWithRetry(testFn, 3)
// .then(res => console.log(`执行${3 - res}次成功`))
// .catch(e => console.log(e));

function runWithRetry(promiseFn, times){
    return new Promise((resolve, reject) => {
        function retry(restTimes){
            if(times <= 0){
                reject();
                return;
            }
            Promise.resolve(promiseFn())
            .then(
                (res) => {
                    resolve(res);
                    return;
                },
                () => {
                    retry(restTimes-1);
                }
            );
        }
        retry(times);
    })
}