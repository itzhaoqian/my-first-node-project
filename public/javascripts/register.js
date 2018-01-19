$(function(){ 
        $("#login1").click(function(){ 
            location.href = 'login';
        });
        $("#register1").click(function(){ 
            console.log(222)
            var username = $("#username").val();
            var password = $("#password").val();
            var password1 = $("#password1").val();
            if(password !== password1){ 
                $("#password").css("border","1px solid red");
                $("#password1").css("border","1px solid red");
            }else if(password === password1){
            var data = {"uname":username,"upwd":password};
            $.ajax({ 
                url: '/register',
                type: 'post',
                data: data,
                success: function(data,status){ 
                    if(status == 'success'){ 
                        console.log(1)
                        //location.href = 'login';
                    }
                },
                error: function(data,err){ 
                    console.log(2)
                        //location.href = 'register';
                }
            }); 
        }
        });
    });