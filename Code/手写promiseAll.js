function promiseAll(promiseArr){
    return new Promise((resolve, reject)=>{
        if(!Array.isArray(promiseArr)){
            reject('Not Array');
        }

        let cnt=0;
        let res=[];
        for(let i=0; i<promiseArr.length; i++){
            Promise.resolve(promiseArr[i]).then((result)=>{
                cnt++;
                res[i] = result;
                if(cnt===promiseArr.length){
                    resolve(res);
                }
            }).catch(e => {reject(e)});
        }
    })
}

// function myPromiseAll(promisesArray) {
//     return new Promise((resolve, reject) => {
//         let results = [];
//         let completedPromises = 0;

//         for (let i = 0; i < promisesArray.length; i++) {
//             Promise.resolve(promisesArray[i]).then((result) => {
//                 results[i] = result;
//                 completedPromises++;

//                 console.log('completedPromises', completedPromises);
//                 if (completedPromises === promisesArray.length) {
//                     console.log("into ===")
//                     resolve(results);
//                 }
//             }).catch((error) => {
//                 reject(error);
//             });
//         }

//         if (promisesArray.length === 0) {
//             resolve(results);
//         }
//     });
// }

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
