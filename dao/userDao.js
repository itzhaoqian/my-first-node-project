// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/conf');//数据库连接配置
// var $util = require('../util/util');
var $sql = require('./userSqlMapping');//数据库增删改查命令

// 使用连接池，提升性能
var pool = mysql.createPool( $conf.mysql );

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var request = require('request');

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            if(err){
                console.log('err了')
            }
            else
            {
                // 获取前台页面传过来的参数
                var param = req.body;
                // 建立连接，向表中插入值
                // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
                connection.query($sql.insert, [param.name, param.age], function(err, result) {
                    console.log('嗨')
                    if(result) {
                        result = {
                            code: 200,
                            msg:'增加成功'
                        };    
                    }
                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result);
                    // 释放连接 
                    connection.release();
                });
            }
            
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            console.log(req.query.id);
            var id = +req.query.id;
            connection.query($sql.delete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    jsonWrite(res, result);
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    updateUser: function (req, res, next) {
        var param = req.body;
        console.log(param);
        if(param.name == null || param.age == null) {
            jsonWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, param.id], function(err, result) {
                // 使用页面进行跳转提示
                // if(result.affectedRows) {
                //     res.render('suc',{
                //         title:'成功页',
                //         result: result
                //     });                     // 第二个参数可以直接在jade中使用
                // } else {
                //     res.render('fail',  {
                //         result: result
                //     });
                // }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryById: function (req, res, next) {
        var id = +req.query.id;                     // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                // jsonWrite(res, result);
                var options = {
                    url: 'https://www.jinhui365.com/syncAjax/bannerRelated?type=3',
                    method: "GET",
                    headers: {
                        'User-Agent': 'request'
                    }
                };

                function callback(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var info = JSON.parse(body);
                        // console.log(info.stargazers_count + " Stars");
                        // console.log(info.forks_count + " Forks");
                        console.log('接口取数据'+info)
                        res.render('index',{gitJson:info,result:result})
                    }
                }
                request(options, callback);
                // res.render('index',{
                //     title:'列表页',
                //     result:result
                // });
                connection.release();
            });
        });
    }
};