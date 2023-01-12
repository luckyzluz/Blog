const fs = require('fs');

module.exports = {
    /**
     * 
     * @param {*} data 要查询的数据（格式[{},{}]）
     * 
     * @param {*} p 要进行时间排序的key名 ""xxxx-xx-xx-xx xx:xx:xx
     * 
     * @param {*} sort 选择条件,为1时间正序，其他为倒序
     */
    DateSort : function (data, p, sort) {
        for (i = 0; i < data.length - 1; i++) {
            for (j = 0; j < data.length - 1 - i; j++) {
                if (sort == 1 ? Date.parse(data[j][p]) > Date.parse(data[j + 1][p]) : Date.parse(data[j][p]) < Date.parse(data[j + 1][p])) {
                    var temp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = temp;
                }
            }
        }
        return data;
    },
    /**
     * 
     * @param {*} data 要查询的数据（格式[{},{}]）
     * 
     * @param {*} p 要进行时间排序的key名 ""时间戳排序
     * 
     * @param {*} sort 选择条件,为1时间正序，其他为倒序
     */
    compare : function (property) {
        return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
    DateSortx : function (data, p, sort) {
        data.sort(compare(p));
    },
    /**
     * 文件大小转换
     * @param {*} bytes 要转换的文件
     * 
     * @param {*} p 要进行时间排序的key名 ""
     * 
     * @param {*} sort 选择条件,为1时间正序，其他为倒序
     */
    // var formatBytes = function (bytes, decimals = 2) {
    //     if (bytes === 0) return '0 Bytes';
    //     const k = 1024;
    //     const dm = decimals < 0 ? 0 : decimals;
    //     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    //     const i = Math.floor(Math.log(bytes) / Math.log(k));
    //     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    // }
    formatBytes : function (a, b) { if (0 == a) return "0 Bytes"; var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c)); return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f] },
    /**
     * 延迟函数
     * @param {*} interval 
     * @returns 
     */
    delay : function (interval) {
        typeof interval !== 'number' ? interval === 1000 : interval;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, interval);
        });
    },
    /**
     * 用于检测是否存在用于存放文件的路径，不存在则创建路径
     * @param {*} folder 要检测的路径 './uploads/'
     * 
     */
    createFolder : function (folder) {
        try {
            fs.accessSync(folder);
        } catch (e) {
            fs.mkdirSync(folder);
        }
    },
    /**
     * 文件是否存在
     * @param filePath 文件路径
     * @returns {Promise<boolean>} true:存在;false:不存在
     */
    ifExist : function (filePath) {
        if (fs.existsSync(filePath)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 检查上传文件  名是否冲突 并  自动加一
     * @param filePath 文件路径（不包括文件名称）
     * @param fname 文件名称  不包括后缀名
     * @param index 文件后缀名 
     * @returns {Promise<boolean>} true:存在;false:不存在
     */
    ifFileName : function (filePath, fname, index) {
        if (ifExist(`${filePath}/${fname}.${index}`)) {
            if (fname.substr(fname.length - 1, 1) == ')') {
                fname = `${fname.split("(")[0]}(${Number(fname.match(/\((\S*)\)/)[1]) + 1})`
                ifFileName(filePath, fname, index)
                return fname;
            } else {
                fname = `${fname}(0)`
                return fname
            }
        } else {
            return fname
        }
    },
    /**
     * 检测一些数字是否连续
     * @param arr 将数字弄到一个数组里  传入
     * @returns {} 返回多个数组，即存在断点(arrange(arr).length>1)
     */
    arrange : function (arr) {
        var result = [],
            temp = [];
        arr.sort(function (source, dest) {
            return source - dest;
        }).concat(Infinity).reduce(function (source, dest) {
            temp.push(source);
            if (dest - source > 1) {
                result.push(temp);
                temp = [];
            }
            return dest;
        });
        return result;
    },
    /**
     * 判断n连续数字缺失的m个数字
     * @param arr 要检测的连续数字数组
     * @param start 起始值
     * @param end 结束值
     * @result {} 返回缺失数字数组
     */
    checkSeriesNum : function (arr, start = 0, end) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = parseInt(arr[i]);
        }
        var result = []
        if (end && (arr.indexOf(end) < 0)) {
            arr.push(end)
            result.push(end)
        }
        for (i = 0; i < arr.length; i++) {
            var x1 = arr[i] - i;
            var x2 = i + start;
            while (x1 != start) {
                result.push(x2);
                x2++;
                start++;
            }
        }
        return result.sort((a, b) => {//将结果排序
            return a - b
        });
    },
    /**
     * 获取当前时间戳(秒)
     */
    getNowSceond : function (){
        return Math.floor(Date.now() / 1000);
    },
    /**
     * 根据时间戳获取年,月,日,时,分,秒
     * @param {*} nTimeStamps 
     */
    getTimeInfo : function (nTimeStamps) {
        //转毫秒
        var date = new Date(nTimeStamps * 1000);
        //返回数据
        // var retData = {
        //     nYear: date.getFullYear(),
        //     nMonth: date.getMonth() + 1,
        //     nDay: date.getDate(),
        //     nHour: date.getHours(),
        //     nMinutes: date.getMinutes(),
        //     nSeconds: date.getSeconds()
        // };
    var retData=`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return retData;
    },
    createSixNum : function () {
        var Num = "";
        for (var i = 0; i < 6; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    },
    removeByVal : function (arrylist , val) {
        for(var i = 0; i < arrylist .length; i++) {
            if(arrylist [i] == val) {
                arrylist .splice(i, 1);
                break;
            }
        }
    },
    getMachine : function (req) {
        var deviceAgent = req.headers["user-agent"].toLowerCase();
        var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
        if (agentID) {
            return "Mobile";
        } else {
            return "PC";
        }
    },
    /**
     * 
     * @param {*} format "yyyy-MM-dd hh:mm:ss:S q"(年-月-日 时:分:秒:毫秒 季度)
     * @returns ps:2023-01-09 13:39:01:347 1 
     */
    formatNowDate : function(format){
        var nowDate = new Date();
        var o = {
            "M+" : nowDate.getMonth()+1, //month月 1
            "d+" : nowDate.getDate(),    //day日   8
            "h+" : nowDate.getHours(),   //hour时  19
            "m+" : nowDate.getMinutes(), //minute分 16
            "s+" : nowDate.getSeconds(), //second秒  45
            "q+" : Math.floor((nowDate.getMonth()+3)/3),  //quarter季度 1
            "S" : nowDate.getMilliseconds() //millisecond毫秒  936
        }
        if(/(y+)/.test(format)) // 验证是否包含一个及以上的字符 y
        // format=format.replace(RegExp.$1,
        // (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        // format=format.replace((/(y+)/.exec(format)||[])[1],(this.getFullYear()+"").substr(4 - (/(y+)/.exec(format)||[])[1].length)) // 进行yyyy替换
        format=format.replace((/(y+)/.exec(format)||[])[1],(nowDate.getFullYear()+"").substr(4 - (/(y+)/.exec(format)||[])[1].length)) // 进行yyyy替换
        for(var k in o){
            if(new RegExp("("+ k +")").test(format)) // 验证是否包含相关的字符
                // format = format.replace(RegExp.$1,
                // RegExp.$1.length==1 ? o[k] :
                // ("00"+ o[k]).substr((""+ o[k]).length));
                format=format.replace((format.match("("+ k +")")||[])[1], 
                (format.match("("+ k +")")||[])[1].length == 1 ? o[k] : 
                ("00" + o[k]).substr(("" + o[k]).length));
        }
        return format;
    }
}