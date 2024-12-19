// 使用示例
// const testFn = () => {
//     const n = Math.random    ();
//     return n > 0.1     ? Promise.reject    () : Promise.resolve    ();
// }
// Retry(testFn, 3)
// .then(res => console.log(`执行${3 - res}次成功`))
// .catch(e => console.log(e));

function retry(promiseFn, times){
    let count=0;
    return new Promise((resolve, reject) => {
        promiseFn()
        .then()
        .catch(()=>{
            if(count < times){
                retry()
            }
        })
    })
}