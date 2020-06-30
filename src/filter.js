/*
 * @Description: 
 * @Date: 2020-06-29 15:05:43
 * @LastEditors: Astronautics across the sea of stars
 * @LastEditTime: 2020-06-30 16:27:56
 */ 

 /**
 * @desc 小数 
 * @param {*} dataStr 
 */
export function toFixed(dataStr, num) {
    return dataStr.toFixed(num)
}

/**
 * @desc 转换时间戳 
 * @param {*} dataStr 
 */
export function time(dataStr, num) {
    let time = new Date(dataStr * 1000);
    function timeAdd0(str) { if (str < 10) { str = '0' + str; } return str; }
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    if( num == 6 ){
        return `${y}-${timeAdd0(m)}-${timeAdd0(d)} ${timeAdd0(h)}:${timeAdd0(mm)}:${timeAdd0(s)}`;
    }
    if( num == 4 ){
        return `${y}-${timeAdd0(m)}-${timeAdd0(d)}`;
    }
    
}