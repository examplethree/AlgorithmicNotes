// 1.检测数据是否符合要求"xxx-xxx-xxxx"，xx代表数字。比如"800-555-1212" 返回true

function test(str){
    let chararr=[];
    if(str.length !== 12){ 
        return false;
    }
    chararr = str.split('-');
    let len=chararr.length;
    if(len !== 3){
        return false;
    }
    for(let i=0; i<len; i++){
        if(Number(chararr[i]) !== Number(chararr[i])){
             return false; 
        }
    }
    return true;
}

// 2. flatten数组，[1, [2, [3, [4]]]] -> [1,2,3,4]
function flatten(array){
    let res=[], cur=array, i, stack=[], p=-1;

    stack.push(array); p++;
    while(p !== -1){
        cur = stack.shift(); p--;
        len = cur.length;
        for(i=0; i<len; i++){
            if(cur[i] instanceof Array){
                stack.push(cur[i]); p++;
            }
            else{
                res.push(cur[i]);
            }
        }
    }
    console.log(res);
    return res;
}

// 3. 整数翻转，233 ->332
function reserve(num){
    let str=num.toString();
}


function throttle(cb, delay){
    let shouldwait=false;

    return function(...args){
        if(!shouldwait){
            cb(...args);
            shouldwait = true;
            setTimeout(()=>{
                shouldwait = false;
            }, delay);
        }
    };
}

function throttle2(cb, delay){
    let shouldwait=false, argwaiting=null;

    function timeoutFunc(){
        if(argwaiting){
            cb(...args);
            argwaiting = null;
            setTimeout(timeoutFunc, delay);
        } 
        else{
            shouldwait = false;
        }
    }

    return function(...args){
        if(!shouldwait){
            cb(...args);
            shouldwait = true;
            setTimeout(timeoutFunc, delay);
        }
        else{
            argwaiting = args;
        }
    };
}