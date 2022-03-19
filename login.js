

        $(function(){
            $('#link-reg').on('click',function(){
                $('.login-box').hide()
                $('.reg-box').show()
            })
            $('#link-login').on('click',function(){
                $('.reg-box').hide()
                $('.login-box').show()
            })
            // 自定义验证规则
            var form=layui.form
                form.verify({
                    pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'] ,
                    // 验证两次密码是否一致
                    repwd: function(value){
                        var pwd=$('.reg-box [name=password]').val()
                        if(pwd!==value){
                            return '两次密码不一致'
                        }
                    }
                })
          // 监听注册表单的提交事件
         $('#form_reg').on('submit', function(e) {
           // 1. 阻止默认的提交行为
           e.preventDefault()
           // 2. 发起Ajax的POST请求
           var data = {
             username: $('#form_reg [name=username]').val(),
             password: $('#form_reg [name=password]').val()
           }
           $.post('/api/reguser', data, function(res) {
             if (res.status !== 0) {
               return layer.msg(res.message)
             }
          layer.msg('注册成功，请登录！')
             // 模拟人的点击行为
             $('#link_login').click()
           })
         })
        //  监听登录表单的提交事件
        $('#form_login').on('submit', function(e) {
            // 1. 阻止默认的提交行为
            e.preventDefault()
            // 2. 发起Ajax的POST请求
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
              }
            $.post('/api/login', data, function(res) {
              if (res.status !== 0) {
                return layer.msg('登录失败')
              }
           layer.msg('注册成功，请登录！')
              // 跳转到后台主页
              localStorage.setItem('token',res.token)
              location.href='./index.html'
            })
          })

        })