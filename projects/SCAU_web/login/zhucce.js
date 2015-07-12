var err_info = document.getElementById('err_info'),
err_info2 = document.getElementById('err_info2'),
err_info3 = document.getElementById('err_info3'),
email = document.getElementById('email_name_r'),
password = document.getElementById('password'),
re_password = document.getElementById('re_password'),
u_btn2 = document.getElementsByClassName('zhuce_f')[0];


function check_value(e){
	var e_value = /[^A-z_0-9_@]/ig.test(email.value);
	err_info.innerHTML = e_value;
	if(e_value){
		err_info.innerHTML = '用户名包括了特殊字符';
	}else{
		err_info.innerHTML = '';
	}
}
function check_value2(e){
	var p_value = password.value.length;
	if(p_value<6){
		err_info2.innerHTML = '密码不能小于6位';
	}else{
		err_info2.innerHTML = '';
	}
}
function check_value3(e){
	var p_value = password.value.length,
	re_value = re_password.value.length;
	if(p_value!=re_password){
		err_info3.innerHTML = '两次密码不相同';
	}else{
		err_info3.innerHTML = '';
	}
}
email.addEventListener('keyup',check_value,false);
email.addEventListener('blur',check_value,false);
password.addEventListener('blur',check_value2,false);
re_password.addEventListener('blur',check_value3,false);
u_btn2.addEventListener('submit',function(e){
	if(!email.value.length || !password.value.length || !re_password.value.length){
		alert('账号或密码不能为空');
		console.log(!email.value.length);
		console.log(!password.value.length);
		console.log(!re_password.value.length);
		if(document.all)
			e.returnValue=false;
		else
			e.preventDefault();
	}
	var e_value = /[^A-z_0-9_@]/ig.test(email.value);
	var p_value = password.value.length,
	re_value = re_password.value.length;
	if(e_value||p_value<6||p_value!=re_password){
		if(document.all) e.returnValue=false;
		else e.preventDefault();
	}
})