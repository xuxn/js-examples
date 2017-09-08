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



	//


}