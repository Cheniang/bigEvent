$(function(){
    getUserInfo()
    logOut()
})
// 获取用户信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
    
        success: function(res){
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            else{
                readerAvatar(res.data)
            }
        }
    })
}
// 渲染用户头像
function readerAvatar(user){
    var name=user.nickname||user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(user.user_pic!==null){
        $('.pic').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }
    else{
        $('.pic').hide()
        var first =name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
//退出登录
function logOut(){
    var layer=layui.layer
    $('.logOut').on('click',function(){
        layer.confirm('确定要退出登录吗？',{icon:3,title:'提示'},
            function(index){
               localStorage.removeItem('token')
               location.href='./login.html'
                layer.close(index)
            }
        )
    })
}