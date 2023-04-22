/**
 * @desc 函数节流
 * @param fn 函数
 * @param time 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export function throttle(fn, time = 500 ,type = 2) {
    let previous,timeout
    if(type===1){
         previous = 0
    }
    return function() {
        let context = this
        let args = arguments
        if(type===1){
            let now = Date.now()
            if (now - previous > time) {
                fn.apply(context, args);
                previous = now
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null
                    fn.apply(context, args)
                }, time)
            }
        }
    }
}

/**
 * @desc 函数防抖
 * @param fn 函数
 * @param delay 延迟执行毫秒数
 */
export function  debounce(fn, delay) {
    // 定时器
    let timer = null
 
    // 将debounce处理结果当作函数返回
    return function () {
        // 保留调用时的this上下文
        let context = this
        // 保留调用时传入的参数
        let args = arguments
 
        // 每次事件被触发时，都去清除之前的旧定时器
        if(timer) {
            clearTimeout(timer)
        }
        // 设立新定时器
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}


