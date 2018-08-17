/**
 * Created by Administrator on 2018/8/3.
 */
//封装一个代替getElementById的方法
function byId(id){
    return typeof (id)=== "string"?document.getElementById(id):id;
}
//全局变量
var index = 0,
timer = null,pics=byId("banner").getElementsByTagName("div"),
len = pics.length;
dots=byId("dots").getElementsByTagName("span");
var prev=byId("prev"),next=byId("next");
function slideImg(){
    var main = byId("main");
    //滑过清除定时器，离开继续
    main.onmousemove=function(){
       if(timer) clearInterval(timer);
    };
    main.onmouseout= function () {
        timer = setInterval(function(){
            index++;
            if(index >= len){
                index = 0;
            }
            //切换图片
            changeImg();
        },3000);
    };
    //自动在main上触发鼠标离开的事件
    main.onmouseout();
    //遍历所有点击，且绑定点击事件，点击圆点切换图片
    for(var d = 0;d<len;d++){

            //给所以span添加一个id属性，值为d，作为当前span的索引
            dots[d].id=d;

            dots[d].onclick=function(){
                //改变index为当前span的索引
                index=this.id;
                this.className="active";

                //调用changeimg切换图片
                changeImg();
        }
    }
    //下一张
    next.onclick=function(){
        index++;
        if(index>=len) index=0;
        changeImg();
    };
    //下一张
    prev.onclick=function(){
        index--;
        if(index<0) index=len-1;
        changeImg();
    }
}
//切换图片
function changeImg(){
    //遍历banner下所有的div，将其隐藏，遍历所有dots下span，将其span类清除
    for(var i=0;i<len;i++){
        pics[i].style.display="none";
        dots[i].className="";
    }
    pics[index].style.display="block";
    dots[index].className="active";
}
slideImg();