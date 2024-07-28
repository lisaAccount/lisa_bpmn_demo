
// 使用内置API，将URL装换成一个URL对象
function parseUrl(url) {
    try {
        const parsedUrl = new URL(url);
        return {
            href: parsedURL.href,
            protocol: parsedURL.protocol,    // 协议，例如 'http:' or 'https:'
            host: parsedURL.host,            // 完整的主机名，例如 'example.com:8080'
            hostname: parsedURL.hostname,    // 主机名，例如 'example.com'
            port: parsedURL.port,            // 端口，例如 '8080'
            pathname: parsedURL.pathname,    // 路径，例如 '/path/to/resource'
            search: parsedURL.search,        // 查询字符串，例如 '?query=123'
            hash: parsedURL.hash,            // 锚点，例如 '#hash'
            origin: parsedURL.origin,        // 原始URL，没有路径和查询字符串
            searchParams: Array.from(parsedURL.searchParams.entries())  // 查询参数，解析并转为数组
        };
    } catch(e) {
        console.log(e);
    }
}

// 解析URL参数  http://www.xxx.com?a=1&b=2&c=3

//  最基础版本split

function f1(url) {
    const params = url.split('?')[1];
    if(!params) return {};
    const obj = {};
    params.split('&').forEach(element => {
        const keyVal = element.split('=');
        const key = keyVal[0];
        let val = keyVal[1] || '';
        //  值可能是对象或者数组，一般都会JSON.stringify一下，解析的时候进行反序列化
        try {
            val = JSON.parse(decodeURIComponent(val));
        } catch(e) {
            val = decodeURIComponent(val);
        }
        obj[key] = val;
    });
    return obj;
}

// 用map、reduce实现
function f2(url) {
    let obj = {};
    url.slice(url.indexOf('?') + 1).split('&').map((ele) => {
        let [key, val] = ele.split('=');
        obj[key] = val;
    })
    return obj;
}

function f3(url) {
    return url.slice(url.indexOf('?') + 1).split('&').reduce((prev, ele) => {
        let [key, val] = ele.split('=');
        prev[key] = val;
        return prev;
    }, {})
}