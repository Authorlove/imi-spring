/*
{"result":"succeed"}
*/

/*全局变量*/
var bar_code=[];
var check=[];
var days=[];
var stdays=[];
var redays=[];
var n=0;

var order={
    call_no:[],
    marc_no:[],
    loca:[]
}

var more_info=[];

    var addEvent = function(name,event,fn){
        var el = getDom(name)||document;
        el.addEventListener(event,fn,false);
    }

    var getDom =  function(name){
        if(document.getElementById(name)){
            return document.getElementById(name);
        }
        else if(document.getElementsByClassName(name)){
            return document.getElementsByClassName(name);
        }
    }





//AJAX
function ajax(url,fnSucc,object,fnFaild) {
    if(typeof XMLHttpRequest != "undefined"){
        var xhr=new XMLHttpRequest();
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("GET","/"+aid+url,true);
    xhr.send();
    var overload=document.getElementsByClassName('loading_page')[0];
    overload.style.display="block";
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200) {
            fnSucc(xhr.responseText,object);
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


function displayData(data){
    var jsonText= data;
    if(jsonText.errcode){
        document.write("图书馆服务器崩溃了！请稍后再试")
    }else{
        var showlist=document.getElementById('showlist');
        showlist.innerHTML='';
        if (!jsonText.length) {
            showlist.innerHTML = 
                '<div class="lend_null">'+
                    '<img src="/img/icon-library.png">'+
                    '<p>你当前还没有借阅书籍<br/>喔，赶紧去借一本吧。</p>'+
                '</div>';
        }
        for(var i=0;i<jsonText.length;i++){
            bar_code[i]=jsonText[i].bar_code;
            check[i]=jsonText[i].renew;
            /*var End=new Date(jsonText[i].end);服务器上*/
            /*var Now=a;服务器上*/
            var End=new Date(jsonText[i].end);
            var Now=new Date();
            var res=Math.floor((End-Now)/86400000+1);
            var begin=jsonText[i].begin.replace(/-/g,".");
            var end=jsonText[i].end.replace(/-/g,".");
            days[i]=res;
            stdays[i]=begin;
            redays[i]=jsonText[i].end;
            more_info[i]=jsonText[i].mar_no;
            
            var leftDay = '<span class="lli-leftday return">已还</span>';
            var leftDayclass ='';
            var reNewclass = '';
            var leftDayColorclass = '';
            if(jsonText[i].num==='0'){
	            reNewclass = ' can-renew';
            }
            if (res<=9){
	            leftDayColorclass = ' red-num';
            }
            if (jsonText[i].num!='-1'){
            	leftDayclass = ' lib-leftday';
	            leftDay = 
                '<div class="lli-leftday">'+
                    '<span>剩'+
                        '<span class="leftday-num">'+res+
                        '</span>天'+
                    '</span>'+
                    '<div class="lli-renew" onclick="cancel(this),stopBubble(this.id);" name="'+i+'">续借</div>'+
                '</div>';
            }
            
            showlist.innerHTML+=
            '<div class="liblist-item'+reNewclass+leftDayColorclass+leftDayclass+'" onclick="opnew(this)" name="'+i+'">'+
	            leftDay+
	            '<div class="liblist-item-left">'+
	            	'<p class="bookname">'+jsonText[i].name+'</p>'+
	            	'<p class="lastday">'+begin+' - '+end+'</p>'+
	            '</div>'+
	        '</div>';
        }
    }
}

function lendMore(data,object){
    var jsonText=JSON.parse(data);
    if(jsonText.errcode){
        alert('续借出现异常情况，请重新尝试');
    }else{
        /*处理时间*/
        var day=days[n]+30;
        var endDay=new Date(redays[n]);
        endDay.setDate(endDay.getDate() + 30);
        var a=endDay.getFullYear();
        var b=endDay.getMonth()+1;
        if (b<10) {b='0'+b;}
        var c=endDay.getDate();
        if (c<10) {c='0'+c;}
        var d=a+'.'+b+'.'+c;
        /*end 处理时间*/
        object.previousSibling.innerHTML='剩<span class="leftday-num">'+day+'</span>天</span>';
        object.parentNode.nextSibling.lastChild.innerHTML=stdays[n]+' - '+d;
        object.setAttribute("onclick",'stopBubble(this.id);');
        object.style.color='#AAA';
        object.style.border='1px solid #AAA';
    }
}


function displayOrder(data){
    var jsonText= data;
    if(jsonText.errcode){
        document.write("图书馆服务器崩溃了！请稍后再试")
    }else{
        var showOrder=document.getElementById('showOrder');
        showOrder.innerHTML='';
        if(!jsonText.length){
            showOrder.innerHTML+=
                '<div class="order_null">'+
                    '<p>你目前没有预约的书记喔</p>'+
                    '<p class="passage">图书预约服务指对已被借出的图书向图书馆进行预约登记，该书到馆后优先借给预约者的流通形式服务。每人可预约2册，预约保留6天。预约的图书到馆后，系统会发出通知，读者可通过我的图书馆或者Email来查看通知。</p>'+
                '</div>';
        }
        for(var i=0; i<jsonText.length; i++){
            order.call_no[i]=jsonText[i].call_no;
            order.marc_no[i]=jsonText[i].mar_no;
            order.loca[i]=jsonText[i].loca;
            showOrder.innerHTML+=
                '<div class="subscribe-item">'+
                    '<div class="subs-bookinfo">'+
                        '<p class="subs-bookname">'+jsonText[i].name+'</p>'+
                        '<p class="subs-bookauthor">'+jsonText[i].author+'</p>'+
                    '</div>'+
                    '<div class="subs-state">'+
                        '<p>预约中</p>'+
                        '<span class="subs-cancel" name="'+i+'" onclick="cancel1(this)">取消预约</span>'+
                    '</div>'+
                    '<div class="subs-detail">'+
                        '<div>'+
                            '<span class="subsdetail-item">取书地: </span>'+
                            '<span class="subsdetail-itemcontent">'+jsonText[i].addr+'</span>'+
                        '</div>'+
                        '<div>'+
                            '<span class="subsdetail-item">预约日: </span>'+
                            '<span class="subsdetail-itemcontent">'+jsonText[i].begin+'</span>'+
                        '</div>'+
                        '<div>'+
                            '<span class="subsdetail-item">截止日: </span>'+
                            '<span class="subsdetail-itemcontent">'+jsonText[0].end+'</span>'+
                        '</div>'+
                    '</div>'+
                '</div>';
        }
    }
}
function deOrder(data,object){
    var jsonText=JSON.parse(data);
    if(jsonText.errcode){
        alert("取消失败，请重新尝试");
    }else{
        object.previousSibling.innerHTML='';
        object.removeAttribute("onclick");
        object.innerHTML='取消成功';
        object.style.color='#AAA';
        object.style.border='1px solid #AAA';
    }
}

/*end 处理获取的数据*/
/*cancel order*/
function cancel1(object) {

    n=parseInt(object.getAttribute("name"));
 
    ajax("/library/cancel-order?marc_no="+order.marc_no[n]+"&loca="+order.loca[n]+"&call_no="+order.call_no[n],deOrder,object);


}
/*end cancel*/



/*阻止冒泡*/
function stopBubble(e) { 
    if (e && e.stopPropagation) {//非IE浏览器 
     e.stopPropagation();
    } 
    else {//IE浏览器 
    window.event.cancelBubble = true; 
    } 
} 
/*end*/



/*get time*/
function getTime(url){
    if(typeof XMLHttpRequest != "undefined"){
        var xhr=new XMLHttpRequest();
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("HEAD","/"+aid+url,true);
    xhr.send();
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 && xhr.status==200) {
            a=xhr.getResponseHeader("Date");
            a=new Date(a);
        }else{

        }
    }
}
/*end get time*/

/*续借调用*/
function cancel (asd) {
    n=parseInt(asd.getAttribute("name"));
    //ajax("http://2.smartcampus.sinaapp.com/module/library/Lib.php?bar_code="+bar_code[n]+"&check="+check[n]+"",lendMore);
    ajax("/library/renew?bar_code="+bar_code[n]+"&check="+check[n],lendMore,asd);
}
/*end*/

/*open new window*/
function opnew(obj){
    var n=parseInt(obj.getAttribute('name'));
    window.location.href="/"+aid+'/library/show-item?where=scau&marc_no='+more_info[n];
}

// (function(){
//     var xhr=new XMLHttpRequest();
//     xhr.open("GET","/"+aid+'/library/my-order',true);
//     xhr.send();
//     xhr.onreadystatechange=function(){
//         if (xhr.readyState==4 && xhr.status==200) {
//             displayOrder(xhr.responseText);
//         }
//     }
// })()
//ajax('/library/my-book',displayData);
var data = [{"bar_code":"A1553992","name":"SQL基础教程","begin":"2014-09-15","end":"2014-12-14","num":"1","mar_no":"0000608641","renew":"5D4C3148"},{"bar_code":"A1578937","name":"CSS创意课:全球优秀交互页面设计","begin":"2014-11-09","end":"2015-01-08","num":"0","mar_no":"0000611721","renew":"6866DEED"},{"bar_code":"E0095815","name":"Effective Java / 2nd ed.","begin":"2014-07-11","end":"2014-10-12","num":"-1","mar_no":"0000548777"},{"bar_code":"A1428192","name":"大型门户网站是这样炼成的!:Struts 2+Spring 2+Hibernate 3","begin":"2014-07-11","end":"2014-10-12","num":"-1","mar_no":"0000482334"},{"bar_code":"A1428192","name":"大型门户网站是这样炼成的!:Struts 2+Spring 2+Hibernate 3","begin":"2014-07-11","end":"2014-07-11","num":"-1","mar_no":"0000482334"},{"bar_code":"E0103601","name":"Head first HTML & CSS = 深入浅出HTML与CSS / 第二版.","begin":"2014-07-11","end":"2014-10-12","num":"-1","mar_no":"0000653195"},{"bar_code":"E0103601","name":"Head first HTML & CSS = 深入浅出HTML与CSS / 第二版.","begin":"2014-07-11","end":"2014-07-11","num":"-1","mar_no":"0000653195"},{"bar_code":"A1385728","name":"PHP与MySQL程序设计","begin":"2014-06-24","end":"2014-09-27","num":"-1","mar_no":"0000450009"},{"bar_code":"A1553992","name":"SQL基础教程","begin":"2014-06-24","end":"2014-09-15","num":"-1","mar_no":"0000608641"},{"bar_code":"A1525155","name":"数据库原理与应用","begin":"2014-06-17","end":"2014-09-15","num":"-1","mar_no":"0000585845"},{"bar_code":"A1539995","name":"Arduino＋Android互动智作","begin":"2014-03-01","end":"2014-05-16","num":"-1","mar_no":"0000599411"},{"bar_code":"A1512784","name":"使用HTML、CSS和JavaScript开发Android程序","begin":"2014-03-01","end":"2014-05-16","num":"-1","mar_no":"0000574455"},{"bar_code":"A1550713","name":"Android网络开发与应用实战详解","begin":"2014-03-01","end":"2014-05-16","num":"-1","mar_no":"0000593777"},{"bar_code":"A1475371","name":"我编程, 我快乐:程序员职业规划之道:creating a remarkable career in software development","begin":"2014-02-26","end":"2014-05-16","num":"-1","mar_no":"0000502340"},{"bar_code":"A1259858","name":"Eclipse, Struts, Hibernate, Spring集成开发宝典","begin":"2014-01-14","end":"2014-04-10","num":"-1","mar_no":"0000397918"},{"bar_code":"GP061289","name":"Java Web编程宝典:十年典藏版","begin":"2013-12-01","end":"2014-01-09","num":"-1","mar_no":"0000571604"},{"bar_code":"A1498565","name":"Java Web编程宝典:十年典藏版","begin":"2013-12-01","end":"2014-02-23","num":"-1","mar_no":"0000571604"},{"bar_code":"A1506151","name":"大话企业级Android应用开发实战","begin":"2013-10-12","end":"2014-01-09","num":"-1","mar_no":"0000574454"},{"bar_code":"A0715241","name":"瞬间抓住人心的66个关键:必备的识人讲义","begin":"2013-09-04","end":"2013-12-05","num":"-1","mar_no":"0000180243"},{"bar_code":"A1506104","name":"PHP与MySQL网站开发全接触","begin":"2013-06-14","end":"2013-09-04","num":"-1","mar_no":"0000577171"},{"bar_code":"A1405221","name":"PHP从入门到精通","begin":"2013-06-14","end":"2013-09-04","num":"-1","mar_no":"0000467326"},{"bar_code":"A0752358","name":"篆书七言唐诗一百首","begin":"2013-03-26","end":"2013-04-06","num":"-1","mar_no":"0000184686"},{"bar_code":"A0503742","name":"历代名帖集联集诗集文","begin":"2013-03-26","end":"2013-04-06","num":"-1","mar_no":"0000134118"},{"bar_code":"A0721655","name":"书法","begin":"2013-03-26","end":"2013-04-06","num":"-1","mar_no":"0000106264"},{"bar_code":"A1189864","name":"管理学概论","begin":"2013-03-26","end":"2013-06-04","num":"-1","mar_no":"0000366686"},{"bar_code":"A0963005","name":"思维决定一切:成功管理的思考方式","begin":"2013-03-26","end":"2013-06-04","num":"-1","mar_no":"0000227843"},{"bar_code":"A0701318","name":"管理心理学","begin":"2013-03-26","end":"2013-06-04","num":"-1","mar_no":"0000174540"},{"bar_code":"A1370814","name":"After Effects CS3完全自学手册","begin":"2012-12-15","end":"2013-03-08","num":"-1","mar_no":"0000436635"},{"bar_code":"A1452679","name":"经济学原理:缩译全彩珍藏本.第2版","begin":"2012-12-15","end":"2013-03-08","num":"-1","mar_no":"0000493816"},{"bar_code":"A1335138","name":"Java语言程序设计基础.2版","begin":"2012-12-15","end":"2013-03-08","num":"-1","mar_no":"0000419489"},{"bar_code":"A1520520","name":"一定要会的Photoshop CS5精彩案例208例","begin":"2012-12-15","end":"2013-03-08","num":"-1","mar_no":"0000580847"},{"bar_code":"A1370814","name":"After Effects CS3完全自学手册","begin":"2012-12-15","end":"2012-12-15","num":"-1","mar_no":"0000436635"},{"bar_code":"A1460272","name":"人人都要懂点经济学","begin":"2012-12-15","end":"2013-03-08","num":"-1","mar_no":"0000493647"},{"bar_code":"A1419754","name":"轻松读懂经济学:人人都该知道的经济学常识","begin":"2012-12-15","end":"2013-03-08","num":"-1","mar_no":"0000476499"},{"bar_code":"A1419754","name":"轻松读懂经济学:人人都该知道的经济学常识","begin":"2012-12-15","end":"2012-12-15","num":"-1","mar_no":"0000476499"},{"bar_code":"A0907458","name":"After Effects 6.0标准教程","begin":"2012-12-07","end":"2013-03-08","num":"-1","mar_no":"0000217716"},{"bar_code":"A1465435","name":"ACM程序设计竞赛基础教程","begin":"2012-12-06","end":"2013-03-08","num":"-1","mar_no":"0000501843"},{"bar_code":"A1465435","name":"ACM程序设计竞赛基础教程","begin":"2012-12-06","end":"2012-12-06","num":"-1","mar_no":"0000501843"},{"bar_code":"A1439971","name":"iLike职场After Effects CS4影视特效制作完美实现","begin":"2012-12-06","end":"2013-03-08","num":"-1","mar_no":"0000482734"},{"bar_code":"A1465435","name":"ACM程序设计竞赛基础教程","begin":"2012-12-06","end":"2012-12-06","num":"-1","mar_no":"0000501843"},{"bar_code":"A0464815","name":"现代经济学导论","begin":"2012-10-31","end":"2012-12-13","num":"-1","mar_no":"0000126884"},{"bar_code":"A1147663","name":"数据结构:C语言描述","begin":"2012-10-19","end":"2012-12-13","num":"-1","mar_no":"0000357548"},{"bar_code":"A1116759","name":"编译原理","begin":"2012-10-19","end":"2012-12-13","num":"-1","mar_no":"0000333420"}];
var data2 = [];
displayData(data);
displayOrder(data2);


/*text 201330480117  001*/
/*errcode:11  errmsg:续借出现异常情况*/
/*{"result":"succeed"}*/
