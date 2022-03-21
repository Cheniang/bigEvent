// 每次调用$.get()  $.post()  $.ajax时会先调用ajaxPrefilter函数
$.ajaxPrefilter(function(options){
    options.url='http://api-breakingnews-web.itheima.net'+options.url
    //统一为权限的接口设置，headers
    if(options.url.indexOf('/my/')!==-1){
        options.headers= {
            Authorization:localStorage.getItem('token')||''
        }
    }
    // 不管成功还是失败都会调用一个complete函数
    options.complete=function(res){
        if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败!'){
            localStorage.removeItem('token')
            location.href='./login.html'
        }
    }
})