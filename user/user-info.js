$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称必须在1-6位之间'
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!== 0){
                    return layer.msg('获取用户信息失败')
                }
                 form.val("UserInfo",res.data)
                        
            }
        })
    }
    // 表单重置事件
    $('.btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    // 表单提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('修改名称失败！')
                }
                layer.msg('修改名称成功！')
                // 调用父页面的方法
                window.parent.getUserInfo()
                
            }
        })
        
    })
})