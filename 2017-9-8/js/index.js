window.onload=function(){
	//自执行改变title
	(function(){
		var originTitle=document.title;
		var titleTime;
		document.addEventListener('visibilitychange',function(e){
			if(document.hidden){
				document.title="你轻轻的走了";
				clearTimeout(titleTime);
			}else{
				document.title="我又回来啦！！";
				titleTime=setTimeout(function(){
					document.title=originTitle;
				},2000)
			} 
		})
	})();


	//控制音频
	var audio=document.getElementById("audio");
	audio.play();
	audio.loop=true;

	function changeAudio(event){
		var target=event.target;
		if(target.hidden){
			audio.pause();
		}else{
			audio.play();
		}
	}

	document.addEventListener('visibilitychange',changeAudio,false);



	//返回后显示登录用户名
	var loginInfo=document.getElementById("loginInfo"); 

	function changePage(){ 
		var username=localStorage.name;
		if(username){
			loginInfo.innerHTML='欢迎回来，'+username;
		}else{
			var href=location.href.replace("index","login"); 
			loginInfo.innerHTML='您尚未登录，请<a href="'+href+'" target="_blank">登录</a>';

		} 
	}

	//首次进入页面
	changePage();

	//切换页面回来
	document.addEventListener('visibilitychange',function(){
		if(!document.hidden){
			changePage();
		}
	},false);


	//关闭页面的时候清楚缓存
	window.addEventListener("unload",function(){
		localStorage.removeItem('name'); 
	},false);

}