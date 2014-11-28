/* search */
function initSearch(){
    
    /*listener*/
    var searchClear = document.getElementsByClassName("search-clear")[0];
    var searchUp = document.getElementsByClassName("search-up")[0];
    searchClear.style.display='none';

    searchClear.onclick = function(){
        var searchWords = document.getElementById("search-words");
        searchWords.value= "";
        document.getElementsByClassName("search-clear")[0].style.display = 'none';
    }
    
    searchUp.onclick = function(){
        showSearch(2);
    }
}

function showSearch (argument) {
    var heading_wrap=document.getElementById('heading_wrap');
    var left_screen=document.getElementById('left_screen');
    var right_screen=document.getElementById('right_screen');
    var searchInfo = document.getElementsByClassName("search-info")[0];
    if (argument===1) {
        heading_wrap.style.right='100%';
        left_screen.style.display='none';
        right_screen.style.display='block';
        searchInfo.style.display='block';
        if(data.result.length===0){
            document.getElementById('null_data').style.display='none';
        }
    }else if (argument===2) {
        heading_wrap.style.right='0';
        left_screen.style.display='block';
        right_screen.style.display='none';
        searchInfo.style.display='none';
        if(data.result.length===0){
            document.getElementById('null_data').style.display='block';
            document.getElementsByClassName('icon')[0].style.display='none';
            document.getElementsByClassName('search_index')[0].style.display='none';
        }

        var searchWords = document.getElementById("search-words");//消除搜索框内容
        searchWords.value= "";
        var right_screen=document.getElementById('right_screen').firstChild;
        right_screen.innerHTML='';
    }
}

function showList (argument) {
    /*compute data and screen height*/
    //var sHight=document.documentElement.scrollHeight;       //获取页面高度
    var sHight=document.body.offsetHeight; 
    var oMask=document.createElement('div');
    var screenH=screen.availHeight;
    if (sHight<=screenH) {
        sHight=screenH;
    }


    var list=document.getElementById('list');
    var organize=document.getElementById('heading').parentNode;
    var ogn_state=organize.getAttribute('class');
    if (argument===1) {
        if (ogn_state==='heading') {
            list.style.display='block';
            organize.setAttribute('class','heading up');

            /*add mask*/
            oMask.id="mask";
            oMask.style.height=sHight-45+"px";
            oMask.style.top=45+'px';
            document.body.appendChild(oMask);

            /*add mask listener*/
            document.getElementById('mask').onclick=function(){
            showList(2);
            }
        }else{
            list.style.display='none';
            organize.setAttribute('class','heading');
            document.body.removeChild(document.getElementById('mask'));
        }
    }else if (argument===2) {
        if (ogn_state!=='heading') {
            list.style.display='none';
            organize.setAttribute('class','heading');
            document.body.removeChild(document.getElementById('mask'));

        }
    };
}
/* end search */

/* show and hide */
function showPop(num){
    var div_id='info'+num;
    var div_id2='pop-message'+num;
    var overlay = document.getElementById(div_id);
    var popMessage = document.getElementById(div_id2);

    overlay.style.display = "block";
    popMessage.style.display = "block";
}

function hidePop(num){
    var div_id='info'+num;
    var div_id2='pop-message'+num;
    var overlay = document.getElementById(div_id);
    var popMessage = document.getElementById(div_id2);

    overlay.style.display = "none";
    popMessage.style.display = "none";
}

function showPop2(num){
    var div_id='search'+num;
    var div_id2='message'+num;
    var overlay = document.getElementById(div_id);
    var popMessage = document.getElementById(div_id2);

    overlay.style.display = "block";
    popMessage.style.display = "block";
}

function hidePop2(num){
    var div_id='search'+num;
    var div_id2='message'+num;
    var overlay = document.getElementById(div_id);
    var popMessage = document.getElementById(div_id2);

    overlay.style.display = "none";
    popMessage.style.display = "none";
}

function closeCard(obj){
    var wrap_namecard = obj.parentNode.getElementsByClassName('wrap_namecard');
    var display=wrap_namecard[0].getAttribute("style").substr(9,4);
    if(display!=='none'){
        for(var i=0; i<wrap_namecard.length; i++){
            wrap_namecard[i].style.display='none';
            obj.setAttribute("class","group down");
        }
    }else{
        for(var i=0; i<wrap_namecard.length; i++){
            wrap_namecard[i].style.display='block';
            obj.setAttribute("class","group");
        }
    }
    //alert(display);
}

function express(obj){
    var ul = obj.parentNode;
    var display = ul.getAttribute("class").substr(0,6);
    if (display==='expand') {
        ul.setAttribute("class","wrap_namecard");
    }else{
        ul.setAttribute("class","expand wrap_namecard");
    }
}
/* end show and hide */

//AJAX
function ajax(url,fnSucc,object,fnFaild) {
    if(typeof XMLHttpRequest != "undefined"){
        var xhr=new XMLHttpRequest();
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("GET",url,true);
    xhr.send();
    var overload=document.getElementById('overload');
    overload.style.display="block";
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200) {
            fnSucc(xhr.responseText,object);
            overload.style.display="none";
        }else if(xhr.status>=500&&xhr.status<=510){
            overload.style.display="none";
        	alert('服务器提出了一个问题，请稍后尝试');
        }else{
            if (fnFaild){//失败
                fnFaild();
            }
        }
    }
}
//end AJAX

// display data
function displayBook (num) {
    var pre_data= document.getElementsByClassName("data_wrap");
    var li_num= document.getElementsByClassName("organization");

    if(data.result.length!==0){
        for(var i=0;i<pre_data.length;i++){

            pre_data[i].style.display='none';
        }

        for(var i=0;i<li_num.length;i++){
            li_num[i].style.color='#666';
        }
        li_num[num].style.color='#0278e4';

        var idname='result'+num;
        var dat=document.getElementById(idname);
        dat.style.display='block';
        document.getElementById('heading').innerHTML=jsonText.result[num].name;
        showList(2);
    }else{
        document.getElementById('null_data').style.display='block';
        document.getElementsByClassName('icon')[0].style.display='none';
        document.getElementsByClassName('search_index')[0].style.display='none';
        document.getElementById('heading').innerHTML='通讯录';
    }
}
/*end display*/


/*read data*/
function showData (data) {
    jsonText=data;
    if(jsonText.errcode){
        document.write("加载失败，请重试");
    }else{
        /*if(jsonText.result.length===1){
            var organize=document.getElementById('heading').parentNode;
            organize.removeAttribute("onclick");
            document.getElementsByClassName('icon')[0].style.display='none';
        }*/
        for(var i=0;i<jsonText.result.length;i++){
            var data_id='';
            var div=document.createElement('div');
            div.id=data_id='result'+i;
            div.style.display='none';
            var left_screen=document.getElementById('left_screen');
            left_screen.appendChild(div);


            var div_id=document.getElementById(data_id);
            div_id.setAttribute('class','data_wrap');
            // div_id.innerHTML='<div class="my_card">我的名片</div>';

            
            document.getElementById('list').innerHTML+=
            '<li class="organization" onclick="displayBook('+i+')">'
                +jsonText.result[i].name+
            '</li>';
            

            for(var t=0;t<jsonText.result[i].department.length;t++){

                var department=jsonText.result[i].department[t];

                var depa_id='';
                var ul='';
                ul=document.createElement('ul');
                ul.id=depa_id='department'+apple;
                apple++;

                document.getElementById(data_id).appendChild(ul);
                var ul_id=document.getElementById(depa_id);


                ul_id.innerHTML=
                '<li class="group" onclick="closeCard(this)">'+
                    department+' ('+jsonText.result[i][department].length+'人)'+
                    '<span class="icon_jt"></span>'+
                '</li>';
                
                for(var n=0;n<jsonText.result[i][department].length;n++){

                    var nickname = jsonText.result[i][department][n].nickname;
                    var job = jsonText.result[i][department][n].job;
                    var phone = jsonText.result[i][department][n].phone;
                    var shortphone=jsonText.result[i][department][n].shortphone;
                    var college = jsonText.result[i][department][n].college;
                    var classroom = jsonText.result[i][department][n].classroom;
                    var address = jsonText.result[i][department][n].address;
                    var color = [];
                    color[0]=color[1]=color[2]=color[3]=color[4]='';
                    var on_off = [];
                    on_off[0]=on_off[2]='inline-block';
                    on_off[1]=on_off[3]='none';


                    if(nickname===''){
                        nickname='暂无信息';
                        color[0]='color_gray';
                    }
                    if(job===''){
                        job='暂无';
                        color[1]='color_white';
                    }
                    if(phone===''){
                        phone='暂无数据';
                        on_off[1]='inline-block';
                        on_off[0]='none';
                    }
                    if(shortphone===''){
                        shortphone='暂无数据';
                        on_off[3]='inline-block';
                        on_off[2]='none';
                    }
                    if(college===''){
                        college='暂无数据';
                        color[2]='color_gray';
                    }
                    if(classroom===''){
                        classroom='暂无数据';
                        color[3]='color_gray';
                    }
                    if(address===''){
                        address='暂无数据';
                        color[4]='color_gray';
                    }

                    ul_id.innerHTML+=
                    /*'<li  class="wrap_namecard" style="display:block;" onclick="showPop('+b+')">'+*/
                    '<li  class="wrap_namecard" style="display:block;">'+
                        '<div class="card_main" onclick="express(this)">'+
                            '<div class="wrap_card_up_left"><img class="card_up_left fl" src="./img/num'+parseInt(Math.random()*(4-1+1)+1)+'.png"/></div>'+
                            '<div class="card_up_right">'+
                                '<span class="nickname '+color[0]+'">'+nickname+'</span><br/>'+
                                '<span class="'+color[1]+'">'+job+'</span>'+
                            '</div>'+
                        '</div>'+
                        '<ul class="card_bot" id="oneself'+dog+'">'+
                            '<li><label>长号</label><a style="display:'+on_off[0]+';" href="tel:'+jsonText.result[i][department][n].phone+'">'+phone+'</a><a  style="color:#a0a0a0;display:'+on_off[1]+';" href="javascript:void(0)">'+phone+'</a></li>'+
                            '<li><label>短号</label><a style="display:'+on_off[2]+';" href="tel:'+jsonText.result[i][department][n].shortphone+'">'+shortphone+'</a><a  style="color:#a0a0a0;display:'+on_off[3]+';" href="javascript:void(0)">'+shortphone+'</a></li>'+
                            '<li><label>学院</label><span class="'+color[2]+'">'+college+'</span></li>'+
                            '<li><label>专业</label><span class="'+color[3]+'">'+classroom+'</span></li>'+
                            '<li><label>宿舍</label><span class="'+color[4]+'">'+address+'</span></li>'+
                            '<li><div onclick="show_edit_confirm('+dog+')">编辑(开发中)</div></li>'+
                        '</ul>'+
                        /*编辑界面*/
                        '<ul class="card_bot_edit" style="display:none;" id="confirmself'+dog+'">'+
					        '<li>'+
					        	'<label>长号</label>'+
					        	'<input type="text" value="'+jsonText.result[i][department][n].phone+'" id="input_phone'+dog+'"></input><span class="confirm_grayfont">(待确认)</span>'+
					        '</li>'+
					        '<li>'+
					        	'<label>短号</label>'+
					        	'<input type="text" value="'+jsonText.result[i][department][n].shortphone+'" id="input_shortphone'+dog+'"></input><span class="confirm_grayfont">(待确认)</span>'+
					        '</li>'+
					        '<li>'+
					        	'<label>学院</label>'+
					        	'<input type="text" value="'+college+'" id="input_college'+dog+'"></input><span class="confirm_grayfont">(待确认)</span>'+
					        '</li>'+
					        '<li>'+
					        	'<label>专业</label>'+
					        	'<input type="text" value="'+classroom+'" id="input_classroom'+dog+'"></input><span class="confirm_grayfont">(待确认)</span>'+
					        '</li>'+
					        '<li>'+
					        	'<label>宿舍</label>'+
					        	'<input type="text" value="'+address+'" id="input_address'+dog+'"></input><span class="confirm_grayfont">(待确认)</span>'+
					        '</li>'+
					        '<li>'+
					        	'<div class="yes_or_no">'+
					        		'<div class="confirn_yes3" onclick="get_the_edition(this)" name="'+dog+'">确定</div>'+
					 	       		'<div class="confirn_no2" onclick="edit_cancle(this)">取消</div>'+
					        	'</div><br style="clear:both;">'+
					        '</li>'+
						'</ul>'+
						'<input type="hidden" value="'+jsonText.result[i][department][n].id+'"></input>'+
                    '</li>';
                    dog++;
                }

            }
        }
        displayBook(showId);
    }
}
/*end data*/


/*show search data*/
function checkData (argument) {
	var searchClear = document.getElementsByClassName("search-clear")[0];
    var searchInfo = document.getElementsByClassName("search-info")[0];
    var searchWords = document.getElementById('search-words');
    var right_screen=document.getElementById('right_screen').firstChild;
    var word = searchWords.value;
    var keycode =  event.keyCode;
    if(word!==''){
    	searchClear.style.display = "block";
    }else{
    	searchClear.style.display = 'none';
    }
    if(keycode === 13){
        right_screen.innerHTML='';
        searchInfo.style.display='none';
        searchWords.blur();
        for(var i=0;i<jsonText.result.length;i++){
           
            for(var t=0;t<jsonText.result[i].department.length;t++){
                var department=jsonText.result[i].department[t];

                for(var n=0;n<jsonText.result[i][department].length;n++){
                    if (jsonText.result[i][department][n].nickname.indexOf(word)>=0) {

                        var nickname = jsonText.result[i][department][n].nickname;
                        var job = jsonText.result[i][department][n].job;
                        var phone = jsonText.result[i][department][n].phone;
                        var shortphone=jsonText.result[i][department][n].shortphone;
                        var college = jsonText.result[i][department][n].college;
                        var classroom = jsonText.result[i][department][n].classroom;
                        var address = jsonText.result[i][department][n].address;
                        var color = [];
                        var on_off = [];
                        on_off[0]=on_off[2]='inline-block';
                        on_off[1]=on_off[3]='none';

                        if(nickname===''){
                            nickname='暂无';
                            color[0]='color_gray';
                        }
                        if(job===''){
                            job='暂无';
                            color[1]='color_gray';
                        }
                        if(phone===''){
                            phone='暂无';
                            on_off[1]='inline-block';
                            on_off[0]='none';
                        }
                        if(shortphone===''){
                            shortphone='暂无';
                            on_off[3]='inline-block';
                            on_off[2]='none';
                        }
                        if(college===''){
                            college='暂无';
                            color[2]='color_gray';
                        }
                        if(classroom===''){
                            classroom='暂无';
                            color[3]='color_gray';
                        }
                        if(address===''){
                            address='暂无';
                            color[4]='color_gray';
                        }
                        right_screen.innerHTML+=
                        '<li  class="wrap_namecard" style="display:block;">'+
                            '<div class="card_main" onclick="express(this)">'+
                                '<div class="wrap_card_up_left"><img class="card_up_left fl" src="'+jsonText.result[i][department][n].headimg+'"/></div>'+
                                '<div class="card_up_right">'+
                                    '<span class="'+color[0]+'">'+nickname+'</span><br/>'+
                                    '<span class="'+color[1]+'">'+job+'</span>'+
                                '</div>'+
                            '</div>'+
                            '<ul class="card_bot" id="oneself'+dog+'">'+
                                '<li><label>长号</label><a style="display:'+on_off[0]+';" href="tel:'+jsonText.result[i][department][n].phone+'">'+phone+'</a><a  style="color:#a0a0a0;display:'+on_off[1]+';" href="javascript:void(0)">'+phone+'</a></li>'+
                                '<li><label>短号</label><a style="display:'+on_off[2]+';" href="tel:'+jsonText.result[i][department][n].shortphone+'">'+shortphone+'</a><a  style="color:#a0a0a0;display:'+on_off[3]+';" href="javascript:void(0)">'+shortphone+'</a></li>'+
                                '<li><label>学院</label><span class="'+color[2]+'">'+college+'</span></li>'+
                                '<li><label>专业</label><span class="'+color[3]+'">'+classroom+'</span></li>'+
                                '<li><label>宿舍</label><span class="'+color[4]+'">'+address+'</span></li>'+
                                '<li><div onclick="show_edit_confirm()">编辑(开发中)</div></li>'+
                            '</ul>'+
                        '</li>';
                        dog++;
                        return;

                       /* right_screen.innerHTML+='<li onclick="showPop2('+c+')">'+jsonText.result[i][department][n].nickname+'</li>';
*/
                        /*var info_wrap=document.createElement('div');
                        var info_id='';
                        info_wrap.id=info_id='search'+c;
                        document.body.appendChild(info_wrap);
                        document.getElementById(info_id).setAttribute('class','overlay');
                        document.getElementById(info_id).innerHTML=
                        '<div class="zhezhao" onclick="hidePop2('+c+')"></div>'+
                        '<div id="message'+c+'" class="pop-message" >'+
                            '<div class="card-name">'+
                                '<h2>'+jsonText.result[i][department][n].nickname+'</h2>'+
                                '<p>'+jsonText.result[i][department][n].department+'</p>'+
                            '</div>'+
                           '<ul id="detail_data">'+
                                '<li>长号<span class="blue">'+jsonText.result[i][department][n].phone+'</span></li>'+
                                '<li>短号<span class="blue">'+jsonText.result[i][department][n].shortphone+'</span></li>'+
                                '<li>班级<span>班级后台尚未完成</span></li>'+
                                '<li>生日<span>'+jsonText.result[i][department][n].birthdate+'</span></li>'+
                                '<li>宿舍<span>'+jsonText.result[i][department][n].address+'</span></li>'+
                            '</ul>'+
                        '</div>';
                        c++;*/
                    }
                }

            }

        }
    }

}
/*end show*/

//show&hide the tanceng of confirm
function show_edit_confirm(obj){
	var edit_confirm = document.getElementById('confirm_show');
	edit_confirm.style.display = 'block';
	edit_confirm.setAttribute('name', 'confirmself'+obj);
	document.getElementsByClassName('edit_confirm')[0].setAttribute('name', 'oneself'+obj);
}
function hide_edit_confirm(obj){
	obj.parentNode.parentNode.style.display = 'none';
}
//show the edit page
function show_edit_page(obj){
		var ul_id = obj.parentNode.parentNode.getAttribute('name');
		var old_ul_id = obj.parentNode.getAttribute('name');
		var edit_ul = document.getElementById(ul_id);
		var old_ul = document.getElementById(old_ul_id);
		old_ul.style.display = 'none';
		edit_ul.style.display = 'block';
		hide_edit_confirm(obj);
		old_ul.previousSibling.removeAttribute('onclick');
}
//cancle the edit
function edit_cancle(obj){
	var edit_ul = obj.parentNode.parentNode.parentNode;
	var old_ul = edit_ul.previousSibling;
	old_ul.previousSibling.setAttribute('onclick', 'express(this)');
	edit_ul.style.display = 'none';
	old_ul.style.display = 'block';
}
//get the edition
function get_the_edition(obj){
	var number = obj.getAttribute('name');
	var phone = document.getElementById('input_phone'+number).value;
	var shortphone = document.getElementById('input_shortphone'+number).value;
	var college = document.getElementById('input_college'+number).value;
	var classroom = document.getElementById('input_classroom'+number).value;
	var address = document.getElementById('input_address'+number).value;
	var id = obj.parentNode.parentNode.parentNode.nextSibling.value;
	//alert('id='+id+';phone='+phone+';shortphone='+shortphone+';college='+college+';classroom='+classroom+';address='+address);
	//发送数据到服务器
    if(typeof XMLHttpRequest != "undefined"){
        var xhr=new XMLHttpRequest();
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    try{
        xhr.open("POST",'/joshell/contact/change',true);xhr.send();
    }catch(e){

    }


    //try(xhr.open("POST",'/joshell/contact/change',true);xhr.send();)catch{}
    
    
	var tanceng_gou = document.getElementsByClassName('notifitation_gou')[0];
	tanceng_gou.style.display = 'block';
	setTimeout(function(){
		document.getElementsByClassName('notifitation_gou')[0].style.display = 'none';
        edit_cancle(obj.nextSibling);
	}, 2000);	
}

function show_share(){
        document.getElementsByClassName('share_page')[0].style.display = 'block';
        document.getElementById('show_heading').innerText = document.getElementById('heading').innerText;
        document.getElementsByClassName('contact_red_point')[0].style.display = 'none';
}

function stop_share(obj){
    obj.style.display = 'none';
}


(function(){
    var searchInfo = document.getElementsByClassName("search-info")[0];
    var noInfo = document.getElementsByClassName("noInfo")[0];
    var sHight=document.documentElement.scrollHeight;
    searchInfo.style.height=sHight-47+'px';
    noInfo.style.height=sHight-47+'px';
})()




/*build variable*/

var apple=0;
/*var b=0;*/
var c=0;
var dog = 0;
showData(data);

//alert(showId);