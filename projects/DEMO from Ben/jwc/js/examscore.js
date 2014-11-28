/*遮罩层*/
function showxiala (num) {
	var expand=document.getElementById('expand');
	var divC=expand.getAttribute('class');
	var divClass=divC.substr(-8);
	var sHight=document.documentElement.scrollHeight;		//获取页面高度
	var oMask=document.createElement('div');
	var screenH=screen.availHeight;
	if (sHight<=screenH) {
		sHight=screenH;
	};
	if (num===1) {
		if (divClass==="expand_0") {
			expand.setAttribute("class","xl2 expand_1");
			oMask.id="mask";
			oMask.style.height=sHight-76+"px";
			oMask.style.top=76+'px';
			document.body.appendChild(oMask);
		}else if (divClass==="expand_1")
		{
			expand.setAttribute("class","xl2 expand_0");
			document.body.removeChild(document.getElementById('mask'));
		}else if (divClass==="expand_2") {
			expand.setAttribute("class","xl2 expand_1");
		};
	}else if(num===2){
		if (divClass==="expand_0") {
			expand.setAttribute("class","xl2 expand_2");
			oMask.id="mask";
			oMask.style.height=sHight-76+"px";
			oMask.style.top=76+'px';
			document.body.appendChild(oMask);
		}else if (divClass==="expand_1")
		{
			expand.setAttribute("class","xl2 expand_2");
		}else if (divClass==="expand_2") {
			expand.setAttribute("class","xl2 expand_0");
			document.body.removeChild(document.getElementById('mask'));
		};
	}
	document.getElementById('mask').addEventListener("click",function(){
		var expand=document.getElementById('expand');
		var divC=expand.getAttribute('class');
		var divClass=divC.substr(-8);
		if (divClass==="expand_1") {
			showxiala(1);
		}else if(divClass==="expand_2"){
			showxiala(2);
		}
	},false);
}

function showxiala_01 (num) {
	var expand=document.getElementById('expand_01');
	var divC=expand.getAttribute('class');
	var divClass=divC.substr(-8);
	var sHight=document.documentElement.scrollHeight;		//获取页面高度
	var oMask=document.createElement('div');
	var screenH=screen.availHeight;
	if (sHight<=screenH) {
		sHight=screenH;
	};
	if (num===1) {
		if (divClass==="expand_0") {
			expand.setAttribute("class","xl2 expand_1");
			oMask.id="mask";
			oMask.style.height=sHight-76+"px";
			oMask.style.top=76+'px';
			document.body.appendChild(oMask);
		}else if (divClass==="expand_1")
		{
			expand.setAttribute("class","xl2 expand_0");
			document.body.removeChild(document.getElementById('mask'));
		}else if (divClass==="expand_2") {
			expand.setAttribute("class","xl2 expand_1");
		};
	}else if(num===2){
		if (divClass==="expand_0") {
			expand.setAttribute("class","xl2 expand_2");
			oMask.id="mask";
			oMask.style.height=sHight-76+"px";
			oMask.style.top=76+'px';
			document.body.appendChild(oMask);
		}else if (divClass==="expand_1")
		{
			expand.setAttribute("class","xl2 expand_2");
		}else if (divClass==="expand_2") {
			expand.setAttribute("class","xl2 expand_0");
			document.body.removeChild(document.getElementById('mask'));
		};
	}
	document.getElementById('mask').addEventListener("click",function(){
		var expand=document.getElementById('expand_01');
		var divC=expand.getAttribute('class');
		var divClass=divC.substr(-8);
		if (divClass==="expand_1") {
			showxiala_01(1);
		}else if(divClass==="expand_2"){
			showxiala_01(2);
		}
	},false);
}
/*end 遮罩层*/

//AJAX
function ajax(url,fnSucc,fnFaild) {
	if(typeof XMLHttpRequest != "undefined"){
		var xhr=new XMLHttpRequest();
	}else{
		var xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET",url,true);
	xhr.send();
	var overload=document.getElementsByClassName('loading_page')[0];
	overload.style.display="block";
	xhr.onreadystatechange=function(){
		if (xhr.readyState==4 && xhr.status==200) {
			fnSucc(xhr.responseText);
			overload.style.display="none";
		}else{
			if (fnFaild){//失败
				fnFaild();
			}
		}
	}
}
//end AJAX

/*处理获取的数据*/
function readData(data) {
	var jsonText= data;
	if(jsonText.errcode==1){
		document.write("正方系统服务器崩溃了！请稍后再试")
	}else if(jsonText.errcode==11){
        document.write("您本学期尚未注册，无法查询数据！")
    }else{
		var score=document.getElementById('score');
		/*初始化界面*/
		document.getElementById('aver_gpa').innerHTML='&nbsp;';
		score.innerHTML='';
		/*end 初始化*/
		document.getElementById('aver_gpa').innerHTML = jsonText.gpa;
        document.getElementById('studentname').innerHTML = jsonText.studentname;
        document.getElementById('studentid').innerHTML = jsonText.studentid;
		for(var i=0;i<jsonText.item.length;i++){
            var scoreName = jsonText.item[i].name;
            var scoreNum = jsonText.item[i].score;
            var credit = jsonText.item[i].credit;
            var uscore = "";
            var fscore = "";

            if(typeof jsonText.item[i].uscore!="undefined" && jsonText.item[i].uscore !="&nbsp;" ){
                uscore = '平时: <span>'+jsonText.item[i].uscore+'</span>';
            }
            if(typeof jsonText.item[i].fscore!="undefined" && jsonText.item[i].fscore !="&nbsp;" ){
                fscore = '期末: <span>'+jsonText.item[i].fscore+'</span>';
            }

            score.innerHTML+='<li><h2>'+scoreName+'</h2><p class="s_num">'+scoreNum+'</p><div class="b_div"><p class="p_l">'+uscore+'&nbsp;&nbsp;'+fscore+'</p><p class="p_r">学分: <span>'+credit+'</span></p></div></li>';

		}
	}
}

function readData2(data){
	var jsonText= data;
	if(jsonText.errcode==1){
		document.write("正方系统服务器崩溃了！请稍后再试")
	}else if(jsonText.errcode==11){
        document.write("您本学期尚未注册，无法查询数据！")
    }else{
		var exam=document.getElementById('exam');
		exam.innerHTML='';
		for(var i=0;i<jsonText.item.length;i++){
			if(jsonText.item[i].area!= "&nbsp;" && jsonText.item[i].area!=" "){
				var timer=jsonText.item[i].time.replace("("," ");
				timer=timer.replace(")"," ");
				exam.innerHTML+='<li><h2>'+jsonText.item[i].name+'</h2><p class="p_up">'+timer+'</p><p class="p_bot">'+jsonText.item[i].area+'&nbsp;'+jsonText.item[i].classroom+'&nbsp;座位号: '+jsonText.item[i].seat+'</p></li>';
			}
		}
	}
}
/*end 处理获取的数据*/

/*选择学期*/
function semesterchoice(num){
	var expand=document.getElementById('expand');
	expand.setAttribute("class","xl2 expand_0");
	document.body.removeChild(document.getElementById('mask'));
	if(num===1){
		document.getElementById('score_a_right').innerHTML='第一学期';
		scoreyearsemester();
	}else if (num===2) {
		document.getElementById('score_a_right').innerHTML='第二学期';
		scoreyearsemester();
	}
}

function semesterchoice_01(num){
	var expand=document.getElementById('expand_01');
	expand.setAttribute("class","xl2 expand_0");
	document.body.removeChild(document.getElementById('mask'));
	if(num===1){
		document.getElementById('score_a_right_01').innerHTML='第一学期';
		scoreyearsemester_01();
	}else if (num===2) {
		document.getElementById('score_a_right_01').innerHTML='第二学期';
		scoreyearsemester_01();
	}
}
/*end 选择学期*/

/*判断学年*/
function schoolyear(name){
	var year=name+'';
	year=year.substr(0,4);
	var cols_1=document.getElementById('cols_1');
	var cols_1_01=document.getElementById('cols_1_01');
	if (year==='2011') {
		cols_1.innerHTML='<li><a href="javascript:;" onclick="choseyear(1,1)">2011 - 2012年</a></li><li><a href="javascript:;" onclick="choseyear(1,2)">2012 - 2013年</a></li><li><a href="javascript:;" onclick="choseyear(1,3)">2013 - 2014年</a></li>';
		cols_1_01.innerHTML='<li><a href="javascript:;" onclick="choseyear_01(1,1)">2011 - 2012年</a></li><li><a href="javascript:;" onclick="choseyear_01(1,2)">2012 - 2013年</a></li><li><a href="javascript:;" onclick="choseyear_01(1,3)">2013 - 2014年</a></li>';
	}else if (year==='2012') {
		cols_1.innerHTML='<li><a href="javascript:;" onclick="choseyear(2,1)">2012 - 2013年</a></li><li><a href="javascript:;" onclick="choseyear(2,2)">2013 - 2014年</a></li>';
		cols_1_01.innerHTML='<li><a href="javascript:;" onclick="choseyear_01(2,1)">2012 - 2013年</a></li><li><a href="javascript:;" onclick="choseyear_01(2,2)">2013 - 2014年</a></li>';
	}else if (year==='2013') {
		cols_1.innerHTML='<li><a href="javascript:;" onclick="choseyear(3,1)">2013 - 2014年</a></li>';
		cols_1_01.innerHTML='<li><a href="javascript:;" onclick="choseyear_01(3,1)">2013 - 2014年</a></li>';
	}else if (year==='2014') {

	}
}
/*end 判断学年*/

/*选择学年*/
function choseyear(year,num){
	var expand=document.getElementById('expand');
	expand.setAttribute("class","xl2 expand_0");
	document.body.removeChild(document.getElementById('mask'));
	switch(year){
		case 1:
			if (num===1) {
				document.getElementById('score_a_left').innerHTML='2011 - 2012年';
				scoreyearsemester();
			}else if(num===2){
				document.getElementById('score_a_left').innerHTML='2012 - 2013年';
				scoreyearsemester();
			}else if (num===3) {
				document.getElementById('score_a_left').innerHTML='2013 - 2014年';
				scoreyearsemester();
			}
			break;
		case 2:
			if (num===1) {
				document.getElementById('score_a_left').innerHTML='2012 - 2013年';
				scoreyearsemester();
			}else if(num===2){
				document.getElementById('score_a_left').innerHTML='2013 - 2014年';
				scoreyearsemester();
			}
			break;
		case 3:
			if (num===1) {
				document.getElementById('score_a_left').innerHTML='2013 - 2014年';
				scoreyearsemester();
			}
			break;
		case 4:
			break;
	}
}

function choseyear_01(year,num){
	var expand=document.getElementById('expand_01');
	expand.setAttribute("class","xl2 expand_0");
	document.body.removeChild(document.getElementById('mask'));
	switch(year){
		case 1:
			if (num===1) {
				document.getElementById('score_a_left_01').innerHTML='2011 - 2012年';
				scoreyearsemester_01();
			}else if(num===2){
				document.getElementById('score_a_left_01').innerHTML='2012 - 2013年';
				scoreyearsemester_01();
			}else if (num===3) {
				document.getElementById('score_a_left_01').innerHTML='2013 - 2014年';
				scoreyearsemester_01();
			}
			break;
		case 2:
			if (num===1) {
				document.getElementById('score_a_left_01').innerHTML='2012 - 2013年';
				scoreyearsemester_01();
			}else if(num===2){
				document.getElementById('score_a_left_01').innerHTML='2013 - 2014年';
				scoreyearsemester_01();
			}
			break;
		case 3:
			if (num===1) {
				document.getElementById('score_a_left_01').innerHTML='2013 - 2014年';
				scoreyearsemester_01();
			}
			break;
		case 4:
			break;
	}
}
/*end 选择学年*/

/*判断学年学期调用ajax*/
function scoreyearsemester(){
	var semester=0;
	var left=document.getElementById('score_a_left').innerHTML;
	var left1=left.substr(0,4);
	var left2=left.substr(5,1);
	var left3=left.substr(7,4);
	left=left1+left2+left3;
	var right=document.getElementById('score_a_right').innerHTML;
	if(right==='第一学期'){
		semester=1;
	}else if(right==='第二学期'){
		semester=2;
	}
	ajax("/jwc/score?&year="+left+"&semester="+semester,readData);
}

function scoreyearsemester_01(){
	var semester=0;
	var left=document.getElementById('score_a_left_01').innerHTML;
	var left1=left.substr(0,4);
	var left2=left.substr(5,1);
	var left3=left.substr(7,4);
	left=left1+left2+left3;
	var right=document.getElementById('score_a_right_01').innerHTML;
	if(right==='第一学期'){
		semester=1;
	}else if(right==='第二学期'){
		semester=2;
	}
	ajax("/jwc/exam?&year="+left+"&semester="+semester,readData2);
}
/*end 判断*/



/*切换信息*/
function scoreORexam(num){
	var r_line=document.getElementById('r_line');
	var score_check=document.getElementById('score_check');
	var exam_check=document.getElementById('exam_check');
	var score_but=document.getElementById('score_but');
	var exam_but=document.getElementById('exam_but');
	var divD=score_check.style.display;
	if (num===1) {
		if(divD!='block'){
			score_check.style.display='block';
			exam_check.style.display='none';
			r_line.style.left='0';
			score_but.setAttribute("class","font_blue");
			exam_but.removeAttribute("class");
		}
	}else if(num===2){
		if (divD==='block') {
			score_check.style.display='none';
			exam_check.style.display='block';
			r_line.style.left='50%';
			exam_but.setAttribute("class","font_blue");
			score_but.removeAttribute("class");
		};
	}
}
