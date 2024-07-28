

//  Promise简单应用，设置请求超时时间
// 同样可以设置图片请求超时

const p1 = new Promise((resolve, reject) => {
    request('xxx').then((response) => {
        if(response.code === 0) {
            resolve('sucess');
        } else {
            reject('fail');
        }
    }).catch((e) => {
        reject(e);
    })
})

// const p = new Promise(function(resolve, reject){
//     var img = new Image();
//     img.onload = function(){
//        resolve(img);
//     }
//     //img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"; 正确的
//     img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg1";
// });

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('ftimeout');
    }, 3000)
})

Promise.race([p1, p2]).then((res) => {
    console.log(res);
    return res;
}).catch((e) => {
    return e 
})