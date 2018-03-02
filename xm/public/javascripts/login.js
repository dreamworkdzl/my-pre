window.onload = function(){
	//四位验证码
	function randomCode(){
		var $arr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z'];
		var code = "";
		for(var i = 0; i < 4; i++){
	    var index = Math.floor(Math.random()*36);  
	        code += $arr[index]; 
	    }
		$("#new-code").text(code);
		return code;
	}
	randomCode();
	var iCode = $("#new-code").text();
	$("#new-code").click(function(){
		randomCode();
		iCode = $(this).text();
		console.log(iCode);
	})
	//登录功能
	$("#btn").click(function(){
		login();
	});
	function login(){
		var inputCode = $("#id-code").val();
		var code = $("#new-code").text();
		$.ajax({
			url:"/login4ajax",
			type:"get",
			data:{
				username : $("#username").val(),
				psw:$("#psw").val()
			},
			success:function(res){
				console.log(res);
				
				if(inputCode == code){
					alert(res);
					if(res == "登录成功"){
						location.href = "/admin";
					}
				}else{
					alert("验证码错误");
					randomCode();
				}
				
			}
		})
	}
}
