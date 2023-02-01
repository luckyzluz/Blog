var { redis, createClient } = require('redis');
var { REDIS_CONFIG } = require('../config/config.db');
// redis连接配置
const options = {
    host: REDIS_CONFIG.host,
    port: REDIS_CONFIG.port,
    password: REDIS_CONFIG.password,
    detect_buffers: REDIS_CONFIG.detect_buffers, // 传入buffer 返回也是buffer 否则会转换成String
    retry_strategy: function (options) {
    // 重连机制
    console.log(options.error.code)
    if (options.error && options.error.code === "ECONNREFUSED") {
        // 在出现特定错误时结束重新连接，并使用
        // 单个错误
        return new Error("The server refused the connection(服务器拒绝连接)");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
        // 在特定超时后结束重新连接并刷新所有命令
        // 有一个单独的错误
        return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
        // 结束重新连接并出现内置错误
        return undefined;
    }
    // 之后重新连接
    // return Math.min(options.attempt * 100, 3000);
    }
}
// 生成redis的client
const client = createClient(options);

client.on('ready', () => console.log('Redis Client Ready(连接成功)'));
client.connect();
// client.quit()

module.exports = client;