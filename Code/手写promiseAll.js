// function promiseAll(promiseArr){
//     return new Promise((resolve, reject)=>{
//         if(!Array.isArray(promiseArr)){
//             reject('Not Array');
//         }

//         let cnt=0;
//         let res=[];
//         for(let i=0; i<promiseArr.length; i++){
//             Promise.resolve(promiseArr[i]).then((result)=>{
//                 cnt++;
//                 res[i] = result;
//                 if(cnt===promiseArr.length){
//                     resolve(res);
//                 }
//             }).catch(e => {reject(e)});
//         }
//     })
// }

function promiseAll(promiseArr){
    
}

let arr = [
    new Promise((res, rej) => {
        setTimeout(() => {
            res('p1')
        }, 1000)
    }),
    new Promise((resolve, reject)=>{
        setTimeout(()=>reject(2), 2000);
    }),
    new Promise((res, rej) => {
        setTimeout(() => {
            res('p3')
        }, 3000)
    })
]
