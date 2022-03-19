// 每次调用$.get()  $.post()  $.ajax时会先调用ajaxPrefilter函数
$.ajaxPrefilter(function(options){
    options.url='http://api-breakingnews-web.itheima.net'+options.url
})