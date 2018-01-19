var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// express.route("/login").get(function(req,res){
//     res.render("login")
// }).post(function(req,res){
//     console.log("aaa");
//     console.log(req.body);
//     connection.query("SELECT * FROM user WHERE name="+connection.escape(req.body.name),req.body.name,function(err,rows,fields){
//         console.log(rows);
//         if(err){
//             console.log()
//             res.render("login",{"loginerrMessage":"账号或者密码错误！"});
//             return;
//         }else if(rows.length<1){
//             res.render("login",{"loginerrMessage":"账号或者密码错误！"});
//         }
//         else if(rows[0].password!==req.body.password){
//             res.render("login",{"loginerrMessage":"账号或者密码错误！"});
//         }else{
//             res.redirect("http://ce.sysu.edu.cn/hope");
//         }
//     })
// });
//router.listen(3000);

module.exports = router;
