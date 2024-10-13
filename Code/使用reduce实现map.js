// Array.prototype.myMap = function (func) {
//     return this.reduce((acc, cur, index, arr) => {
//         acc.push(func(cur, index, arr));
//         return acc;
//     }, []);
// }

// let arr=[1,2,3];
// let res = arr.myMap((item) => item * 2);
// console.log(res);

Array.prototype.mapCopy = function (callbackFunc) {
    return this.reduce((acc, value, index)=>{
        acc.push(callbackFunc(value, index));
        return acc;
    }, [])
}

function fandou(cb, delay){
    return (...args) => {
        
    }
}