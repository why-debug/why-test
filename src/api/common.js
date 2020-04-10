const withoutPermission = "/home" //"/withoutPermission"

export const validateMobilePhone = (phone) => {
    var Errors = new Array("", "请输入正确的手机号", "请输入手机号",
        "手机号必须为中国移动号码");
    var mbphno = /^(13[4-9])|(147)|(15[0-2])|(15[7-9])|(18[2-4])|(187)|(188)|(198)|(172)|(178)/;
    var num11 = /^\d{11}$/; // 11位数字;
    if (phone != "") {
        if (num11.exec(phone)) {
            if (mbphno.exec(phone)) {
                return Errors[0];
            } else {
                return Errors[3];
            }
        } else {
            return Errors[1];
        }
    } else {
        return Errors[2];
    }
    return "";
}

export const jumpHtml = (role, pathUrl) => {
    if(!!!pathUrl) return pathUrl

    if(pathUrl.indexOf("circle-list") > -1) {
        if(role == "1") {
            return pathUrl
        }

        if(role == "2") {
            return "/manage-list"
        }

        if(role == "3") {
            return "/circle-detail"
        }

        return withoutPermission
    }

    if(pathUrl.indexOf("manage-video") > -1) {
        if(role == "1" || role == "2" || role == "4") {
            return pathUrl
        }

        return withoutPermission
    }

    if(pathUrl.indexOf("service-ring") > -1) {
        // if(role == "4") {
        //     return "/upload-list"
        // }

        if(role == "4" || role == "5") {
            return "/service-ring"
        }

        return withoutPermission
    }

    if(pathUrl.indexOf("mine") > -1) {
        if(role == "1") {
            return withoutPermission
        }

        if(role == "2") {
            return "/manage-list"
        }

        if(role == "3") {
            return "/circle-detail"
        }

        return pathUrl
    }
    return pathUrl
}

export class Storage {
    constructor(props) {
        this.props = props || {}
        this.source = this.props.source || window.localStorage
        this.initRun();
    }

    initRun() {
        /*
        * set 存储方法
        * @ param {String}     key 键
        * @ param {String}     value 值，存储的值可能是数组/对象，不能直接存储，需要转换 JSON.stringify
        * @ param {String}     expired 过期时间，以分钟为单位
        */
        const reg = new RegExp("__expires__");
        let data = this.source;
        let list = Object.keys(data);
        if (list.length > 0) {
            list.map((key, v) => {
                if (!reg.test(key)) {
                    let now = Date.now();
                    let expires = data[`${key}__expires__`] || Date.now + 1;
                    if (now >= expires) {
                        this.remove(key);
                    }
                    ;
                }
                ;
                return key;
            });
        }
        ;
    }

    set(key, value, expired) {
        /*
        * set 存储方法
        * @ param {String}     key 键
        * @ param {String}     value 值，
        * @ param {String}     expired 过期时间，以毫秒为单位，非必须
        */
        let source = this.source;
        source[key] = JSON.stringify(value);
        if (expired) {
            source[`${key}__expires__`] = Date.now() + expired
        }
        ;
        return value;
    }

    get(key) {
        /*
        * get 获取方法
        * @ param {String}     key 键
        * @ param {String}     expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
        */
        const source = this.source,
            expired = source[`${key}__expires__`] || Date.now + 1;
        const now = Date.now();

        if (now >= expired) {
            this.remove(key);
            return;
        }
        const value = source[key] ? JSON.parse(source[key]) : source[key];
        return value;
    }

    remove(key) {
        const data = this.source,
            value = data[key];
        delete data[key];
        delete data[`${key}__expires__`];
        return value;
    }

}
