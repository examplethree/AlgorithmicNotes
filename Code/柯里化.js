// function curry(func){
//     return function subCurry(...args){
//         // 如果当前参数个数大于等于func需要的参数
//         if(args.length >= func.length){
//             // 直接执行
//             return func.apply(this, args);
//         }
//         else{
//             // 否则重新返回一个函数继续接收参数
//             return function(...moreArgs){
//                 // 这里返回什么，用谁调用，易错
//                 return subCurry.apply(this, args.concat(moreArgs));
//             }
//         }
//     }
// }

// 只能执行指定函数指定个数的参数，传回少了也不行多了会被截断

// function curry(func){
//     return function curried(...args){
//         if(args.length > func.length){
//             return func.apply(this, args);
//         } else {
//             return (moreArgs) => curried.apply(this, args.concat(moreArgs))
//         }
//     }
// }

function curry(func){
    return function curried(...args){
        if(args.length >= func.length){
            func.apply(this, args)
        } else {
            return function(...moreArgs){
                curried.apply(this, moreArgs.concat(args))
            }
        }
    }
}