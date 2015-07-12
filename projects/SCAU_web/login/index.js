var login = document.getElementById('loginform'),
username = document.getElementById('username'),
password = document.getElementById('password');

login.addEventListener('submit',function(e){
	if(!username.value.length || !password.value.length){
		alert('账号或密码不能为空');
		if(document.all) e.returnValue=false;
		else e.preventDefault();
	}
})
