// 实现一个 sum 函数，满足 sum(1)(2)(3).value() = 6
// 实现一个 sum 函数，满足 
// sum(1)(2)(3).value() = 6
// 输入描述
// [1,2,3]
// 输出描述 :6

/**
 * charGPT 回答
 */
function sum(a){
    let add = (b) => {
        sum(a+b);
    }
    add.value = ()=>a;
    return add;
}

// 以下自己实现的方法问题在于，第一次返回的add方法没有value属性
// function sum(num1){
//     function inner(init){
//         this.value=function(){
//             return init;
//         }
//         this.add=function(num){
//             return new inner(num+init);
//         }
//     }
//     let tmp = new inner(num1)
//     return tmp.add
// }

// sum(1).value()