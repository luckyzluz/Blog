import storage from '@/utils/storage.js';
import store from '@/store/index.js';
const { dispatch, state } = store;
/**
 * @vuexFunc 调用vuex模块中的 Actions 并异步回调结果
 * @param modules {string} 调用指定的子模块 如果是全局的可以不传
 * @param funcName {string} 调用Actions 函数名称
 * @param data  {object} 
 * @param followUp  {string / object} 
 *  {
     data:{},
     followUp:string / object
     function(res){}
    },
 * data:当前调用接口需要的参数，
 * followUp 当前接口完成回调后 继续执行更新接口的 名称和参数 可以是请求地址字符串 可以是对象携带参数
 * followUp:'URL' / followUp:{url:'请求接口地址',query:{参数}}
 * function回调函数
 */
export function vuexFunc(modules = '', funcName = '', data = {}) {
    function send(followUp = '', query = null, lock = null) {
        // 消费凭证
        if (typeof lock === 'number') {
            console.log('已消费:', lock)
            lock = true
        };
        let url = ''; //vuex   模块名+action

        if (followUp) { // 二次调用
            console.log('followUp:'+followUp)
            url = followUp;
        } else { // 一次调用
            if (!modules && typeof modules !== 'boolean') { //模块名未设置，全局为false
                console.error('Actions函数名称是必填。');
                return;
            };
            url = `${modules?modules+'/':''}${funcName}`;
        };
        
        // 开发中使用 校验当前调用的vuex模块是否存在 
        if (process.env.NODE_ENV === 'development') {
            // 获取查询模块名
            let modulesName = followUp ? followUp.split('/')[0] : typeof modules === 'boolean' ? funcName :modules;
            // 确认模块存在
            if (storage.getItem('modulesKey').indexOf(modulesName) === -1) {
                console.error(`找不到Vuex Module: ${modulesName} 请检查！`);
                return;
            };
        };

        let queryData = {} // 请求参数数据
        if(typeof modules === 'boolean'){ // 未设置子模块
            queryData = data
            
        } else { // 设置了子模块
            // 1.先判断二次调用
            // 请求子模块请求参数存在
            console.log('followUp:'+followUp,'query:'+query)
            queryData = followUp ? (query ? query : {}) :(data.data && Object.keys(data.data).length?data.data:{});
        }
        console.log('url:'+url)
        // console.log('queryData:'+queryData)
        dispatch(url, {
            // data: followUp ? query ? query : {} : data.data,
            data: queryData,
            callback(res) {
                // 成功
                if (res !== 'failed') {
                    if (lock) {
                        console.log('停止了')
                        return
                    };
                    if (data.callback) {
                        data.callback(res);
                    };
                    if (data.followUp && typeof data.followUp === 'string') { // 二次调用无参数
                        console.log('开始后续回调')
                        send(data.followUp, null, Date.now());
                    } else if (data.followUp && Object.keys(data.followUp).length) { // 二次调用有参数
                        if (!data.followUp.url) {
                            console.error('缺少后续请求的url');
                            return;
                        };
                        if (!data.followUp.hasOwnProperty('query')) {
                            console.error('query字段 缺少后续请求的参数，没有参数直接传入 string Url 形参');
                            return;
                        };
                        send(data.followUp.url, data.followUp.query, Date.now())
                    };
                    // 失败 -1
                } else if (res === 'failed') {
                    // console.log('data.failed:'+data.failed)
                    if (data.failed) {
                        data.failed(res)
                    } else {
                        console.error('接口请求失败:'+url)
                    }
                };
            }
        });
    };
    send();
}

/**
 * @getState 获取vuex中state仓库
 * @param modules {string} 仓库名称 如果是子模块就传入子模块的名称
 */
export function getState(modules = '') {
    if (!modules) {
        console.error('state仓库名称是必填。');
        return;
    };
    return state[modules]
}
