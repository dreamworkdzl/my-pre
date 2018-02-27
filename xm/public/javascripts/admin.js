window.onload = function() {
  $(".lis").children("a").each(function(index){
    let num = index + 1;
    $(this).css("background-image","url(images/menu_" + num + ".png)");

    $(this).click(function(){
      if($(this).siblings("ul").hasClass("show")){
        $(this).siblings("ul").removeClass("show").addClass("hidden");
        $(this).removeClass("open");
        $(this).css("background-image","url(images/menu_" + num + ".png)");
      } else if ($(this).siblings("ul").hasClass("hidden")){
        $(this).siblings("ul").removeClass("hidden").addClass("show");
        $(this).addClass("open");
        $(this).css("background-image","url(images/menu1_" + num + ".png)");
      }
    })
  });
  $(".items").each(function(index){
    let num = index + 1;
    $(this).click(function(){
      $(this).addClass("on").siblings("li").removeClass("on");
    //点击切换页面
    $(".page" + num).addClass("page-show").siblings("div").removeClass("page-show");
    })
  });
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
  //选项卡
  $(".tab-key").children("p").children("span").click(function(){
    $(this).addClass("tab-front").siblings("span").removeClass("tab-front").addClass("tab-back");
    //控制选项卡对应的页面
    if($("#general-tab").hasClass("tab-front")){
      $("#general-page").css("display","block");
    } else if ($("#general-tab").hasClass("tab-back")){
      $("#general-page").css("display","none")
    }
  })
}