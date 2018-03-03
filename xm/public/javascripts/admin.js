window.onload = function(){
	//循环给手风琴key添加背景图片
	$(".lis").children("a").each(function(index){
		let num = index + 1;
		$(this).css("background-image","url(images/menu_" + num + ".png");
//		console.log($(this));
		//控制手风琴
		$(this).click(function(){
			if($(this).siblings("ul").hasClass("show")){
				$(this).siblings("ul").removeClass("show").addClass("hidden");
				$(this).removeClass("open");
				$(this).css("background-image","url(images/menu_" + num + ".png");
			}else if($(this).siblings("ul").hasClass("hidden")){
				$(this).siblings("ul").removeClass("hidden").addClass("show");
				$(this).addClass("open");
				$(this).css("background-image","url(images/menu1_" + num + ".png");
			}
		})
	});
	//给二级菜单添加选项卡功能
	$(".items").each(function(index){
		let num = index + 1;
		$(this).click(function(){
			$(this).addClass("on").siblings("li").removeClass("on");
			//点击切换页面
			$(".page" + num).addClass("page-show").siblings("div").removeClass("page-show");
		})
	});
	//控制跳页
	$("#to-add-new").click(function(){
		$(".page2").addClass("page-show").siblings("div").removeClass("page-show");
	});
	$("#to-list").click(function(){
		$(".page1").addClass("page-show").siblings("div").removeClass("page-show");
	});
	//控制list
	$("#list_control").click(function(){
		if($(this).hasClass("right")){
			$(this).removeClass("right").addClass("left");
			$(".list-show").css("display","none");
			$(".list-hidden").css("display","block");
		}else if($(this).hasClass("left")){
			$(this).removeClass("left").addClass("right");
			$(".list-show").css("display","block");
			$(".list-hidden").css("display","none");
		}
	});
	//控制page1全选功能
	$("#check-all").click( 
	  function(){ 
	    if(this.checked){ 
	        $("input[name='checkname']").attr('checked', true)
	    }else{ 
	        $("input[name='checkname']").attr('checked', false)
	    } 
	  } 
	);
	//控制page2
	//控制选项卡
	$(".tab-key").children("p").children("span").click(function(){
		$(this).addClass("tab-front").siblings("span").removeClass("tab-front").addClass("tab-back");
		//控制选项卡对应页面
		if($("#general-tab").hasClass("tab-front")){
			$("#general-page").css("display","block");
		}else if($("#general-tab").hasClass("tab-back")){
			$("#general-page").css("display","none");
		}
		if($("#detail-tab").hasClass("tab-front")){
			$("#detail-page").css("display","block");
		}else if($("#detail-tab").hasClass("tab-back")){
			$("#detail-page").css("display","none");
		}
		if($("#mix-tab").hasClass("tab-front")){
			$("#mix-page").css("display","block");
		}else if($("#mix-tab").hasClass("tab-back")){
			$("#mix-page").css("display","none");
		}
		if($("#properties-tab").hasClass("tab-front")){
			$("#properties-page").css("display","block");
		}else if($("#properties-tab").hasClass("tab-back")){
			$("#properties-page").css("display","none");
		}
		if($("#gallery-tab").hasClass("tab-front")){
			$("#gallery-page").css("display","block");
		}else if($("#gallery-tab").hasClass("tab-back")){
			$("#gallery-page").css("display","none");
		}
	});
	//控制添加新分类的弹出效果
	$("#add1").click(function(){
		$("#category_add").addClass("function-on");
		$("#close1").click(function(){
			$("#category_add").removeClass("function-on");
		})
	});
	$("#add2").click(function(){
		$("#brand_add").addClass("function-on");
		$("#close2").click(function(){
			$("#brand_add").removeClass("function-on");
		})
	});
	//实现前后端交互
	//商品信息页
	
	//-分页
	var condition = $("#search-word").val();
	var pageNO = $("#pageCurrent").html();
	var perPageCnt = $("#pageSize").val();
	paging(condition,pageNO,perPageCnt);
	console.log(condition,pageNO,perPageCnt);
	//搜索功能
	$("#sub").click(function(){
		var condition = $("#search-word").val();
		var pageNO = $("#pageCurrent").html();
		var perPageCnt = $("#pageSize").val();
		$("#goods-msg .trs").remove();
		paging(condition,pageNO,perPageCnt);
	})
	//控制前后页按钮
//
//	var curPage = $("#pageCurrent").html();
//	console.log($("#pageCurrent").html());
//	var num = $("#totalPages").html();
//	console.log(num);
	$("#firstPage").click(function(){
		var condition = $("#search-word").val();
		var pageNO = 1;
		var perPageCnt = $("#pageSize").val();
		$("#goods-msg .trs").remove();
		paging(condition,pageNO,perPageCnt);
	});
	$("#prevPage").click(function(){
		var condition = $("#search-word").val();
		var pageNO = $("#pageCurrent").html();
		var perPageCnt = $("#pageSize").val();
		$("#goods-msg .trs").remove();
		if(pageNO > 1){
			pageNO --;
			$("#pageCurrent").text(pageNO);
			paging(condition,pageNO,perPageCnt);
		}else if(pageNO == 1){
			alert("已经是第一页了");
			$("#pageCurrent").text(1);
			paging(condition,pageNO,perPageCnt);
		}
	})
	$("#nextPage").click(function(){
		var condition = $("#search-word").val();
		var pageNO = $("#pageCurrent").html();
		var perPageCnt = $("#pageSize").val();
		var num = $("#totalPages").html();
		$("#goods-msg .trs").remove();
		if(pageNO < num){
			pageNO ++;
			$("#pageCurrent").text(pageNO);
			paging(condition,pageNO,perPageCnt);
		}else if(pageNO == num){
			alert("已经是最后一页了");
			$("#pageCurrent").text(num);
			paging(condition,pageNO,perPageCnt);
		}
	})
	$("#lastPage").click(function(){
		var condition = $("#search-word").val();
		var num = $("#totalPages").html();
		var pageNO = num;
		var perPageCnt = $("#pageSize").val();
		$("#goods-msg .trs").remove();
		paging(condition,pageNO,perPageCnt);
	});
	function paging(condition,pageNO,perPageCnt){
		$.ajax({
			url:"/goods/list",
			type:"get",
			data:{
				condition : condition,
				pageNO: pageNO,
				perPageCnt:perPageCnt
			},
			success:function(res){
//				console.log(res);
				//动态添加页码
				var pageNumber = res.pageNO;
				$("#pageCurrent").text(pageNumber);
				var pageRecode = res.total;
				$("#totalRecode").text(pageRecode);
				var num = parseInt(pageRecode) / parseInt($("#pageSize").val());
				$("#totalPages").text(Math.ceil(num));
				//遍历查找到的元素，并加载到页面中
				var arr = res.data;
				var len = res.data.length;
				for(var i = 0;i < len;i++){
					var gName = arr[i].goods_name.replace("good","");
					var gId = arr[i].goods_id;
					var gClass = arr[i].goods_class;
					var gPrice = arr[i].price;
					$("#goods-msg").children("tbody").eq(0).append(
						'<tr class="trs">' +
							'<td><input type="checkbox" class="checks" name="checkname">' + gId + '</td>'+
							'<td class="first-cell"><span>' + gName +'</span></td>'+
							'<td><span>ECS000'+ gId+ '</span></td>'+
							'<td><span>' + gPrice + '</span></td>'+
							'<td><img src="images/yes.gif"></td>'+
							'<td><img src="images/yes.gif"></td>'+
							'<td><img src="images/yes.gif"></td>'+
							'<td><img src="images/yes.gif"></td>'+
							'<td><span>100</span></td>'+
							'<td><span>97</span></td>'+
							'<td><span>0</span></td>'+
							'<td>'+
								'<a href="javascript:;" class="edit"><img src="images/icon_edit.gif"></a>'+
								'<a href="javascript:;" class="delete""><img src="images/icon_trash.gif"></a>'+
							'</td>'+
						'</tr>'
					)
						function del(gId) {
							alert(123)
							$.ajax({
								url: "/api/goods_del",
								type: "get",
								data:{
									gId:gId
								},
								success: function(res) {
									console.log(res)
									if(res.status == 1){
										location.reload(true)
									} else {
										alert(res.message)
									}
								}
							})
						}
					//控制page1中焦点td的背景颜色
				//	console.log($("#goods-msg").children("tbody").children("tr"));
					$("#goods-msg").children("tbody").children("tr").mouseover(function(){
						$(this).addClass("cur-tr").siblings("tr").removeClass("cur-tr");
						$(this).children("td").children("span").mouseover(function(){
							$(this).css("background-color", "rgb(39, 130, 150)");
							$(this).mouseout(function(){
								$(this).css("background", "none");
							})
						})
						//点击删除本条
						var that = this;
						$(this).children("td").children(".delete").click(function(){
							$(that).remove();
						});
						//点击编辑本条
						var index = i;
						$(this).children("td").children(".edit").click(function(){
							var gId = $(that).children("td").eq(0).text();
							var gName = $(that).children("td").eq(1).text();
							var gPrice = $(that).children("td").eq(3).text();
							console.log(gId + "," + gName + "," + gPrice);
							$(".page1").removeClass("page-show").siblings(".page2").addClass("page-show");
							$("#goods_name").val(gName);
							$("#goods_id").val(gId);
							$("#price").val(gPrice);
						})
					});
				}
				
			}
			
		})
	}
	// $(".delete").click(function(){
	// 	del();
	// })

	//添加商品页-商品信息交互
	$(".up_load1").click(function(){
		upload();
//		console.log(document.getElementById("goods_name").value);
//		console.log(document.getElementById("price").value);
	})
	function upload() {
		var form = new FormData(); // FormData是H5新特性
		form.append("goods_name", document.getElementById("goods_name").value);
		form.append("price", document.getElementById("price").value);
		form.append("goods_id",document.getElementById("goods_id").value);
		form.append("goods_class",document.getElementById("goods_class").value);
		form.append("img", document.getElementById("img").files[0]);

		var ajax = new XMLHttpRequest();
		ajax.open("POST", "/api/goods_upload");
		ajax.onreadystatechange = function(res){
			if (ajax.readyState==4 && ajax.status==200) {
				console.log(ajax.responseText);
				var res = JSON.parse(ajax.responseText);
				alert(res.message);
			}
		}
		ajax.send(form);
	}
}
