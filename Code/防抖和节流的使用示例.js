//HTML文件省略
const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");


const updatDebounceText = debounce(() => {
  // debounceText.textContent = text;
  incrementCount(debounceText);
}, 250)

const updatThrottleText = throttle(() => {
  // throttleText.textContent = text;
  incrementCount(throttleText);
})

// 输入框模拟
// input.addEventListener("input", e => {
//   defaultText.textContent = e.target.value;
//   updatDebounceText(e.target.value);
//   updatThrottleText(e.target.value);
// })

function debounce(cb, delay = 1000){
  let timeoutId;

  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() =>{
      cb(...arg)
    }, delay);
  }
}

function throttle(cb, delay=1000){
  let shouldWait = false;
  let waitingArgs = null;

  const timeoutFunc = function(){
    if(waitingArgs !== null){
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
    else{
      shouldWait = false;
    }
  }

  return (...arg) => {
    if(shouldWait){
      waitingArgs = arg;
      return;   
    }
    cb(...arg);
    shouldWait = true;
    setTimeout(timeoutFunc, delay)
  }
}

// 简单版，可能有错
function throttle(cb, dalay){
  let shouldWait=false;

  return (...args) => {
    if(!shouldWait){
      cb(...agrs);
      shouldWait = true;
      setTimeout(()=>{
        shouldWait = false;
      }, delay);
    }
  }
}

// 利用鼠标移动模拟
document.addEventListener("mousemove", e => {
  incrementCount(defaultText);
  updatDebounceText();
  updatThrottleText();
})

function incrementCount(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1;
}
