var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var bodyParser = require('body-parser');
var request = require('request');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.get('/',function(req, res, next){
// 	var options = {
//         url: 'https://api.github.com/repos/mikeal/request',
//         method: "GET",
//         headers: {
//             'User-Agent': 'request'
//         }
//     };

//     function callback(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             var info = JSON.parse(body);
//             // console.log(info.stargazers_count + " Stars");
//             // console.log(info.forks_count + " Forks");
//             res.render('index',{gitJson:info})
//         }
//     }

//     request(options, callback);
// })

// router.route("/").get(function(req,res){    // 
//    var options = {
//         url: 'https://api.github.com/repos/mikeal/request',
//         method: "GET",
//         headers: {
//             'User-Agent': 'request'
//         }
//     };

//     function callback(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             var info = JSON.parse(body);
//             // console.log(info.stargazers_count + " Stars");
//             // console.log(info.forks_count + " Forks");
//             res.render('index',{gitJson:info})
//         }
//     }

//     request(options, callback);
// });

router.get('/', function(req, res, next) {
    //userDao.add(req, res, next);
	userDao.queryAll(req, res, next);
    

    // request(options, callback);
});
router.post('/process_post', function(req, res, next) {
	userDao.add(req, res, next);
});
/* form 表单提交 */
// router.route("/process_post").post(function(req,res){    // 
//     var response = {
//        "username":req.body.username, //req.body 获取post传递的参数
//        "password":req.body.password
//    };
//    //console.log(url.parse(request.url).query);
//    res.end(JSON.stringify(response)); //执行完毕后要输出的字符，如果指定了 data 的值，那就意味着在执行完 response.end() 之后，会接着执行一条 response.write(data , encoding);
// });

/* GET login page. */
/* 路由以链式的方式依次处理get put post delete 等http请求 */
router.route("/login").get(function(req,res){    // 到达此路径则渲染login文件，并传出json值供 login.html使用
    res.render("login",{json:{'name':res}});
    console.log('我'+res)
});

/* GET register page. */
// router.route("/register?v=1").get(function(req,res){    // 到达此路径则渲染register文件，并传出json值供 register.html使用
//     res.render("register",{json:'User register'});
// });


/* GET register page. */
router.route("/register").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("register",{title:'User register'});
}).post(function(req,res){ 
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,doc){   // 同理 /login 路径的处理方式
        if(err){ 
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){ 
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{ 
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            },function(err,doc){ 
                 if (err) {
                        res.send(500);
                        console.log(err);
                    } else {
                        req.session.error = '用户名创建成功！';
                        res.send(200);
                    }
                  });
        }
    });
});


module.exports = router;
