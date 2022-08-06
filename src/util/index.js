/**
 *
 */
"use strict";

//属性自运行

const userAgent = window.navigator.userAgent.toLowerCase();


export default {
    isIOS: /iphone|ipad|ipod/.test(userAgent),
    isAndrid: (/android/.test(userAgent)),
    // Android system version detect, return [] if detect failed or iOS device.
    androidSysVersionArray: (() => {
        const matchArray = userAgent.match(/(Android) [\d+\.]{3,5}/i);
        if(matchArray && matchArray.length) {
            const version = matchArray[0].replace(/Android /i,'');
            if(version) {
                return version.split('.');
            }
        }

        return [];
    })(),

    isFunction(o) {
        return typeof o === "function" || toString.call(o) === "[object Function]";
    },

    /**
     * 将URL查询参数转换为Object
     * @param str：可选参数，如果不传入默认解析当前页面查询参数
     * @returns {{object}}
     */
    url2Obj(str) {
        if (!str) {
            /*
             * 单页面 hash 模式下 search ='';
             * ?from=singlemessage#yourhash?key=value  (微信分享出来 会追加 ?from=singlemessage)
             */
            str = window.location.search/* || window.location.hash*/;
        }

        const query = {};

        str.replace(/([^?&=]*)=([^?&=]*)/g, function (m, a, d) {
            if (typeof query[a] !== 'undefined') {
                query[a] += ',' + decodeURIComponent(d);
            } else {
                query[a] = decodeURIComponent(d);
            }
        });

        return query;
    },


    isArray(o) {
        return typeof o === "object" && o instanceof Array;
    },

    isPromise(value) {
        return value && typeof value.then === "function";
    },

    /**
     * 格式化时间为yyyymmddhhmmss
     */
    formatTimestamp(ts) {
        return ts && ts.replace(/\.\d+$/, '').replace(/[-:\s]/g, '');
    },

    /**
     * 拼接 对象数据 函数
     * @param params
     * @param joinChar
     * @returns {string}
     */
    joinParams(params, joinChar='&') {
        const _urls = [];
        for (let key in params) {
            params[key] && _urls.push(key + "=" + encodeURIComponent(params[key]));
        }
        return _urls.join(joinChar);
    },
    /*
       * 获取当前页面所在目录：html文件层
       */
    currentPath() {
        const path = window.location.origin + window.location.pathname;
        return path.replace(/\/(\w)+(\.html)/g, '/');
    },
    /*
     * 获取当前文件所在部署根目录 ： html父级文件层
     * \w 字母和下划线
     */
    rootPath() {
        const path = window.location.origin + window.location.pathname;
        return path.replace(/(\/(\w|-)+){1,2}\.html/, '/');
    },

    /**
     * 普通的页面跳转
     * @param url 地址
     * @param params 参数
     */
    goPage(url, params) {
        params = params || {};

        url += /\?/.test(url) ? "&" : "?";

        url += this.joinParams(params);

        window.window.location.href = (url || params.url);
    },


    loadScript(url, callback) {
        const script = document.createElement('script');
        let loaded;

        script.type = 'text/javascript';
        script.src = url;

        if (typeof callback === 'function') {
            script.onreadystatechange = script.onload = function () {
                if (!loaded) {
                    callback();
                }

                loaded = true;
            };
        }

        document.getElementsByTagName('head')[0].appendChild(script);
    },

    loadStylesheet(url) {
        const fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", url);
        document.getElementsByTagName('head')[0].appendChild(fileref);
    },

    isValidEmail(email) {
        /**
         *  https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
         *
         *  https://en.wikipedia.org/wiki/Email_address
         *
         *  Domain
         The domain name part of an email address has to conform to strict guidelines: it must match the requirements for a hostname, a list of dot-separated DNS labels, each label being limited to a length of 63 characters and consisting of:[6]:§2

         uppercase and lowercase Latin letters A to Z and a to z;
         digits 0 to 9, provided that top-level domain names are not all-numeric;
         hyphen -, provided that it is not the first or last character.
         This rule is known as the LDH rule (letters, digits, hyphen). In addition, the domain may be an IP address literal, surrounded by square brackets [], such as jsmith@[192.168.2.1] or jsmith@[IPv6:2001:db8::1], although this is rarely seen except in email spam. Internationalized domain names (which are encoded to comply with the requirements for a hostname) allow for presentation of non-ASCII domains. In mail systems compliant with RFC 6531 and RFC 6532 an email address may be encoded as UTF-8, both a local-part as well as a domain name.

         Comments are allowed in the domain as well as in the local-part; for example, john.smith@(comment)example.com and john.smith@example.com(comment) are equivalent to john.smith@example.com.
         *
         *  TODO: case: user@[2001:DB8::1]
         */
        // const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        /*
          邮件正则表达式，前期正则参考 https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript，经测试
          Emoji：允许
          颜色文字： 不允许
          中文： 允许

          按照测试要求，如上三种字符均不允许输入。
          参考W3C文档，编写了邮件新正则表达式参考W3C文档，编写了邮件新正则表达式
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
         */
        // http://emailregex.com
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        return regex.test(email);
    },

    triggerEvent(evtName) {
        if(evtName && typeof evtName === 'string') {
            const event = document.createEvent('Event');
            event.initEvent(evtName, false, false);
            document.dispatchEvent(event);
        }
    },
}
