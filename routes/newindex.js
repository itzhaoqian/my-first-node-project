var express = require('express');
var router = express.Router();
var request= require("request");
var checkAuth = require('../midware/checkAuth').isLogin

/* GET news listing. */

router.all('*', checkAuth);


//Node接口取后端数据渲染到前台页面
var getInfo = function(option, req, res, next){
	
		//回调函数渲染制定页面
    function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
			var list = JSON.parse(body).list;  
				res.render('./pages/news',
					{
						data: list,
						title: '新闻查看页',
						newsHeader: option.newsHeader
					});
			}
		}
    // 发送请求 --option请求参数  --callback回调函数
		request(option, callback); 
	}





router.get('/', function(req, res, next) {
// define a function to Get information
	return  res.redirect('/news/top');
})
router.get('/top',function(req, res, next){
	var option = {
			url: 'http://wangyi.butterfly.mopaasapp.com/news/api?type=war&page=1&limit=20', //后端接口地址
			headers: {
			  'User-Agent': 'request'
			},
			newsHeader: 'top news'
		};
	// 取到后端数据渲染到/top页面
	getInfo(option,req, res, next);
})

router.get('/financial',function(req, res, next){
	var option = {
			url: 'http://wangyi.butterfly.mopaasapp.com/news/api?type=money&page=1&limit=20',
			headers: {
			  'User-Agent': 'request'
			},
			newsHeader: 'financial news'
		};
	getInfo(option, req, res, next) ;
})

router.get('/sports',function(req, res, next){
	var option = {
			url: 'http://wangyi.butterfly.mopaasapp.com/news/api?type=sport&page=1&limit=20',
			headers: {
			  'User-Agent': 'request'
			},
			newsHeader: 'sports news'
		};
	getInfo(option, req, res, next) ;
})

router.get('/tech',function(req, res, next){
	var option = {
			url: 'http://wangyi.butterfly.mopaasapp.com/news/api?type=tech&page=1&limit=20',
			headers: {
			  'User-Agent': 'request'
			},
			newsHeader: 'technology news'
		};
	getInfo(option, req, res, next) ;
})

router.get('/social',function(req, res, next){
	var option = {
			url: 'http://wangyi.butterfly.mopaasapp.com/news/api?type=ent&page=1&limit=20',
			headers: {
			  'User-Agent': 'request'
			},
			newsHeader: 'society news'
		};
	getInfo(option, req, res, next) ;
})
	
module.exports = router;