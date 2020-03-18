import axios from 'axios';

let req = axios.create({
    baseURL: 'http://localhost:80', // 基本路径
    timeout: 10000
})

// 获取用户登录数据
export function getlogin() {
    return req
}
//获取用户注册信息
export function getregister() {
    return req
}
//获取用户验证码信息
export function getcode() {
    return req.get('/valitecode.php')
}
//获取猜你喜欢房产列表
export function gethouseList(){
    return req.get('/gethouselist.php')
}