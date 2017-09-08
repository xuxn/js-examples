window.onload=function(){ 

	//登录存储用户名
	var loginForm=document.getElementById("loginForm"); 
	loginForm.addEventListener("submit",function(e){
		localStorage.name=loginForm.elements[0].value;
		alert("返回首页，您已登录");
		this.reset(); 
        e.preventDefault();
	})
}
