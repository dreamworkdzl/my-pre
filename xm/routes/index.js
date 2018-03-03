var express = require('express');
var router = express.Router();
var UserModel = require("../model/User");
var GoodsModel = require("../model/Goods");
var md5 = require("md5");
var multiparty = require("multiparty");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录管理中心' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: '管理中心' });
});

router.get("/login4ajax", function(req, res) {
	if(req.query.username == "admin123" && req.query.psw == "666666") {
		res.send("登录成功");
	} else {
		res.send("登录失败，请检查您的用户名和密码");
	}
})

router.get('/add_goods', function(req, res, next) {
  	res.render('add_goods', {});
});

router.post('/api/goods_upload', function(req, res, next) {
	console.log(res)
		var form = new multiparty.Form({
				uploadDir: "public/images"
		});
		var result = {
				code: 1,
				message: "商品信息保存成功"
		};
		form.parse(req, function(err, body, files){
				if(err) {
					console.log(err);
				}
				console.log(body);
				var goods_name = body.goods_name[0];
				var price = body.price[0];
				var goods_id = body.goods_id[0];
				var goods_class = body.goods_class[0];
				var imgPath = files["img"][0].path.replace("public\\", "");
				var gm = new GoodsModel();
				gm.goods_name = "good" + goods_name;
				gm.price = price;
				gm.goods_id = goods_id;
				gm.goods_class = goods_class;
				gm.imgPath = imgPath;
				gm.save(function(err){
						if(err) {
							result.code = -99;
							result.message = "商品保存失败";
						}
						res.json(result);
				})
		})
});

router.post('/api/admin4ajax', function(req, res, next) {
	GoodsModel.find(function(err,docs){
			if(!err){
					res.json(docs);
			}
	})
});

router.get('/api/goods_del', function(req, res, next) {
  	GoodsModel.findByIdAndRemove({_id:req.query.gId},function(err) {
  		var result = {
  			status: 1,
  			message: "商品删除成功"
  		};
  		if(err) {
  			result.status = -99;
  			result.message = "删除失败";
  		}
  		res.send(result)
  	})
});

module.exports = router;
