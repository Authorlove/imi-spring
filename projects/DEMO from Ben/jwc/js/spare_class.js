/*校区、时间断、日期下拉展开函数*/
function more_select (obj,apple) {
		var className = obj.parentNode.getAttribute('class');
		switch(apple){
			case 1:
				if(className){
					obj.parentNode.removeAttribute('class');
				}else{
					obj.parentNode.setAttribute('class','up');
				}
				break;
			case 2:
				if(className){
					obj.parentNode.removeAttribute('class');
				}else{
					obj.parentNode.setAttribute('class','up1');
				}
				break;
			case 3:
				if(className){
					obj.parentNode.removeAttribute('class');
				}else{
					obj.parentNode.setAttribute('class','up2');
				}
				break;
		}
	}


/*改变校区的value值*/
function change_area(obj){
	var area = document.getElementsByClassName('boxselect')[0];
    var num = obj.getAttribute("value");
    area.setAttribute("value",num);
	area.firstChild.innerText = obj.innerText;
	more_select(area,3);
}
/*改变时间段的value值*/
function change_time_line(obj){
	var time_line = document.getElementsByClassName('boxselect')[1];
	var num = obj.getAttribute("value");
	time_line.setAttribute("value",num);
	time_line.firstChild.innerText = obj.innerText;
	more_select(time_line,2);
}
/*改变日期的value值*/
function change_day(obj){
	var day = document.getElementsByClassName('boxselect')[2];
	var num = obj.value;
	day.value = num;
	day.firstChild.innerText = obj.innerText;
	more_select(day,1);
}

	/*展开年月日函数*/
	function show_ymd(obj){
		var bad = document.getElementsByClassName('wrap_time_line')[0].parentNode;
		var apple = bad.getAttribute('class');
		if(obj===1&&apple){
			var cat = document.getElementsByClassName('wrap_time_line')[0];
			bad.removeAttribute('class');
			cat.style.overflow = 'hidden';
			document.getElementsByClassName('check_box')[0].style.marginTop = 20+'px';

			/*初始化时间数据*/
			var date = new Date();
			var date_year = date.getFullYear();
			var date_month = date.getMonth()+1;
			var date_day = date.getDate();
			var date_hour = date.getHours();
			
			var year = document.getElementsByClassName('wrap_neirong')[0];
			year.firstChild.innerText = date_year+'年';
			var year_more = document.getElementsByClassName('year_more')[0];
			year_more.value = date_year;
			
			var month = document.getElementsByClassName('wrap_neirong')[1];
			month.firstChild.innerText = date_month+'月';
			var month_more = document.getElementsByClassName('month_more')[0];
			month_more.value = date_month;

			var day = document.getElementsByClassName('wrap_neirong')[2];
			day.firstChild.innerText = date_day+'日';
			var day_more = document.getElementsByClassName('day_more')[0];
			day_more.value = date_day;
		}else if(obj===2&&!apple){
			var cat = document.getElementsByClassName('wrap_time_line')[0];
			bad.setAttribute('class','appear');
			more_date(document.getElementsByClassName('wrap_neirong')[0],1);
			more_date(document.getElementsByClassName('wrap_neirong')[0],1);
			setTimeout(
				function(){
					cat.style.overflow = 'visible';
				},200);
		}
	}

	/*选择年月日函数*/
	function more_date(obj,obj2){
		var apple = obj.parentNode.getAttribute('class').length;
		var month_more = document.getElementsByClassName('month_more')[0];
		var day_more = document.getElementsByClassName('day_more')[0];
		var year_more = document.getElementsByClassName('year_more')[0];

		month_more.parentNode.setAttribute('class','time_line');
		day_more.parentNode.setAttribute('class','time_line');
		year_more.parentNode.setAttribute('class','time_line');

		if (apple===9) {
			switch(obj2){
				case 1:
					document.getElementsByClassName('check_box')[0].style.marginTop = 100+'px';
					break;
				case 2:
					document.getElementsByClassName('check_box')[0].style.marginTop = 220+'px';
					break;
				case 3:
					document.getElementsByClassName('check_box')[0].style.marginTop = 220+'px';
					break;
			}
			obj.parentNode.setAttribute('class','time_line more');
		}else{
			obj.parentNode.setAttribute('class','time_line');
			document.getElementsByClassName('check_box')[0].style.marginTop = 20+'px';
			/*switch(obj2){
				case 1:
					if(!month_more.clientHeight&&!day_more.clientHeight){
						document.getElementsByClassName('check_box')[0].style.marginTop = 20+'px';
					}
					break;
				case 2:
					if(!year_more.clientHeight&&!day_more.clientHeight){
						document.getElementsByClassName('check_box')[0].style.marginTop = 20+'px';
					}else if (year_more.clientHeight&&!day_more.clientHeight) {
						document.getElementsByClassName('check_box')[0].style.marginTop = 100+'px';
					}
					break;
				case 3:
					if(!year_more.clientHeight&&!month_more.clientHeight){
							document.getElementsByClassName('check_box')[0].style.marginTop = 20+'px';
						}else if (year_more.clientHeight&&!month_more.clientHeight) {
							document.getElementsByClassName('check_box')[0].style.marginTop = 100+'px';
						}
					break;
			}*/
		}
	}

function select_year(obj){
	var year = document.getElementsByClassName('wrap_neirong')[0];
	year.firstChild.innerText = obj.innerText;

	obj.parentNode.value = obj.value;
	more_date(year,1);
}

function select_month(obj){
	var month = document.getElementsByClassName('wrap_neirong')[1];
	month.firstChild.innerText = obj.innerText;

	obj.parentNode.value = obj.value;
	more_date(month,2);
}

function select_day(obj){
	var day = document.getElementsByClassName('wrap_neirong')[2];
	day.firstChild.innerText = obj.innerText;

	obj.parentNode.value = obj.value;
	more_date(day,3);
}


/*时间初始化函数*/
function getDate_line(){
	var date = new Date();
	var date_year = date.getFullYear();
	var date_month = date.getMonth()+1;
	var date_day = date.getDate();
	var date_hour = date.getHours();
	
	var year = document.getElementsByClassName('wrap_neirong')[0];
	year.firstChild.innerText = date_year+'年';
	var year_more = document.getElementsByClassName('year_more')[0];
	year_more.value = date_year;
	
	var month = document.getElementsByClassName('wrap_neirong')[1];
	month.firstChild.innerText = date_month+'月';
	var month_more = document.getElementsByClassName('month_more')[0];
	month_more.value = date_month;

	var day = document.getElementsByClassName('wrap_neirong')[2];
	day.firstChild.innerText = date_day+'日';
	var day_more = document.getElementsByClassName('day_more')[0];
	day_more.value = date_day;

	var today = date_day;

	/*填入日期*/
	switch(date_month){
		case 9:
		case 11:
		case 4:
		case 6:
			for(var i=0; i<30; i++){
				if (today>30) {
					today = 1;
				}
				day_more.innerHTML += '<li value="'+today+'" onclick="select_day(this)">'+today+'日</li>'
				today++;
			}
			break;
		case 10:
		case 12:
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
			for(var i=0; i<31; i++){
				if (today>31) {
					today = 1;
				}
				day_more.innerHTML += '<li value="'+today+'" onclick="select_day(this)">'+today+'日</li>'
				today++;
			}
			break;
		case 2:
			if(date_year%4){
				for(var i=0; i<28; i++){
					if (today>28) {
						today = 1;
					}
					day_more.innerHTML += '<li value="'+today+'" onclick="select_day(this)">'+today+'日</li>'
					today++;
				}
			}else{
				for(var i=0; i<29; i++){
					if (today>29) {
						today = 1;
					}
					day_more.innerHTML += '<li value="'+today+'" onclick="select_day(this)">'+today+'日</li>'
					today++;
				}
			}
			break;
	}
	/*填入年份*/
	switch(date_month){
		case 9:
		case 10:
		case 11:
		case 12:
		case 1:
		case 2:
			var next_year = date_year+1;
			year_more.innerHTML = '<li value="'+date_year+'" onclick="select_year(this)">'+date_year+'年</li>'+
								  '<li value="'+next_year+'" onclick="select_year(this)">'+next_year+'年</li>';
		  	break;
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
			year_more.innerHTML = '<li value="'+date_year+'" onclick="select_year(this)">'+date_year+'年</li>';
		  	break;

	}
	/*填入月份*/
	var now_month = date_month;
	for(var i=0; i<12; i++){
		if (now_month>12) {
			now_month = 1;
		}
		month_more.innerHTML += '<li value="'+now_month+'" onclick="select_month(this)">'+now_month+'月</li>'
		now_month++;
	}
	var boxselect = document.getElementsByClassName('boxselect');
	boxselect[0].value = 2;
	boxselect[1].value = 0;
	boxselect[2].value = 0;
}


function checkOut(){
	var boxselect = document.getElementsByClassName('boxselect');
	var place = boxselect[0].getAttribute("value");
	var time = boxselect[1].getAttribute("value");
	var date_num = boxselect[2].value;
	var date_year = document.getElementsByClassName('year_more')[0].value;
	var date_month = document.getElementsByClassName('month_more')[0].value;
	var date_day = document.getElementsByClassName('day_more')[0].value;

	if(date_num===1){
		date_day += 1;
	}
	//alert(place+'+'+time+'+'+date_num+'+'+date_year+'+'+date_month+'+'+date_day)
		window.location.href = '/'+aid+'/jwc/free-classroom?place='+place+'&time='+time+'&date='+date_year+'-'+date_month+'-'+date_day;
	//\/jwc/free-classroom?place=1&time=0&date=2014-09-27
}

window.onload = function(){
	getDate_line();
}
