/*全局变量*/
var moreInfo = {};
moreInfo.book_img = document.getElementById('book_img');
moreInfo.book_title = document.getElementById('book_title');
moreInfo.book_author = document.getElementById('book_author');
moreInfo.book_num = document.getElementById('book_num');
moreInfo.book_publish = document.getElementById('book_publish');
moreInfo.intro_span = document.getElementById('intro_span');

var content = document.getElementById('content');
var in_place = document.getElementById('in_place');
var brief_more = undefined;
var catalog_more = undefined;
var catalog_list = document.getElementById('catalog_list');
var aisbn = 0;
var isbn = 0;
/*end 全局变量*/

/*utf8*/
function encodeUTF8(str) {
    var temp = "", rs = "";
    for (var i = 0 , len = str.length; i < len; i++) {
        temp = str.charCodeAt(i).toString(16);
        rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
    }
    return rs;
}
function decodeUTF8(str) {
    if(str!=null)
        return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
            return String.fromCharCode(parseInt($2, 16));
        });
    else
        return "";
}
/*end utf8*/

//AJAX
function ajax(url, fnSucc, object, fnFaild) {
    if (typeof XMLHttpRequest != "undefined") {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("GET","/"+aid+ url, true);
    xhr.send();
    var overload = document.getElementsByClassName('loading_page')[0];
    overload.style.display = "block";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            fnSucc(xhr.responseText, object);
            overload.style.display = "none";
        } else {
            if (fnFaild) {//失败
                fnFaild();
            }
        }
    }
}
//end AJAX


/*处理获取的数据*/
function showInfo(data) {
    //var jsonText = JSON.parse(data);
    var jsonText = data;
    if (jsonText.errcode) {
        document.write("加载失败，请重试");
    } else {
        if (jsonText.image) {
            var ht = eval('"' + jsonText.image + '"');
            book_img.src = ht;
        } else {
            book_img.src = '';
        }

        aisbn = jsonText.aisbn;
        isbn = jsonText.isbn;
        moreInfo.book_author.innerHTML = jsonText.author;
        moreInfo.book_title.innerHTML = jsonText.name;
        moreInfo.book_publish.innerHTML = jsonText.press;
        a = decodeUTF8(jsonText.brief);
        b = decodeUTF8(jsonText.catalog);

        moreInfo.intro_span.innerHTML = '<span class="intro_span">简&nbsp&nbsp介:</span><span class="book_intro">' + a + '(<span class="load_more" onclick="spread(this)" name="1">更多</span>)</span></div>';
        content.innerHTML = b + '<span class="load_more" onclick="spread(this)" name="2">更多</span>';
        in_place.innerHTML = '';
        for (var i = 0; i < jsonText.holding.length; i++) {
            var order = "gray";
            if(jsonText.holding[i].order === 1)
                order = "blue";

            var state = "在馆",jsDate = "";
            if(jsonText.holding[i].state != 1 &&jsonText.holding[i].state != 0){
                jsDate = 
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>应还日期:</span> <span class='library_content'>"+jsonText.holding[i].date+"</span>"+
                    "</div>";
                state = "借出";
            }


            in_place.innerHTML += 
                "<div class='library_info'>"+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>索引号: </span><span class='library_content'>"+jsonText.holding[i].code+"</span>"+
                    "</div>"+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>馆藏地: </span><span class='library_content'>"+jsonText.holding[i].place+"</span>"+
                    "</div>"+
                    jsDate+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>取书地: </span><span class='library_content'>馆藏地服务台</span>"+
                    "</div>"+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>可否预约: </span><span class='library_content'>预约记录保留天数（最多六天）</span>"+
                    "</div>"+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>书刊状态: </span><span class='library_content'>"+state+"</span>"+
                    "</div>"+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_order_"+order+"'>预约</span>"+
                    "</div>"+
                "</div>";
        }
    }
}

function getMoreInfo(data, num) {
    var jsonText = JSON.parse(data);
    if (jsonText.errcode) {
        document.write("加载失败，请重试");
    } else {

        brief_more = decodeUTF8(jsonText.brief);
        catalog_more = decodeUTF8(jsonText.catalog);

        if (num === 1) {
            moreInfo.intro_span.innerHTML = '<span class="intro_span">简&nbsp&nbsp介:</span><span class="book_intro">' + brief_more + '(<span class="load_more" onclick="close3(this)" name="1">收起</span>)</span></div>';
        } else if (num === 2) {
            content.innerHTML = catalog_more + '<br/><span class="load_more" onclick="close3(this)" name="2">收起</span>';
        }
    }
}

function getSchoolInfo(data, obj) {
    var jsonText = JSON.parse(data);
    if (jsonText.errcode) {
        document.write("加载失败，请重试");
    } else {
        if(jsonText.holding===undefined){
            jsonText.holding= {};
            jsonText.holding.length=0;
        }

        obj.a_id.innerHTML=obj.name+'('+jsonText.holding.length+')';
        for(var i=0;i<jsonText.holding.length;i++){
            obj.info_id.innerHTML+=
            /*
'<div class="libcol-list">'+
                '<div>'+
                    '<span class="libcol-item">索引号:</span>'+
                    '<span class="libcol-content">'+jsonText.holding[i].code+'</span>'+
                    '<span class="libcol-item-r">书刊状态:<span class="libcol-content-r">'+jsonText.holding[i].state+'</span></span>'+
                '</div>'+
                '<div>'+
                    '<span class="libcol-item">馆藏地:</span>'+
                    '<span class="libcol-content">'+jsonText.holding[i].place+'</span>'+
                '</div>'+
            '</div>';
*/
"<div class='library_info'>"+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>索引号: </span><span class='library_content'>"+jsonText.holding[i].code+"</span>"+
                    "</div>"+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>书刊状态: </span><span class='library_content'>"+jsonText.holding[i].state+"</span>"+
                    "</div>"+
                    "<div class='info_item_wrap'>"+
                        "<span class='library_info_item'>馆藏地: </span><span class='library_content'>"+jsonText.holding[i].place+"</span>"+
                    "</div>"+
                "</div>";
        }
    }
}
/*end 处理获取的数据*/

/*show content*/
function express() {
    var n = content.getAttribute("style").substr('8', '4');
    if (n === 'none') {
        content.setAttribute('style', 'display:block;');
        catalog_list.parentNode.setAttribute('class','catalog jt_up');
    } else {
        content.setAttribute('style', 'display:none;');
        catalog_list.style.position = 'relative';
        catalog_list.style.margin = '0';
        catalog_list.parentNode.setAttribute('class','catalog');
    }
}
/*end*/

/*判断更多*/
function spread(obj) {
    if (obj.getAttribute('name') === '1') {
        if (brief_more) {
            moreInfo.intro_span.innerHTML = '<span class="intro_span">简&nbsp&nbsp介:</span><span class="book_intro">' + brief_more + '(<span class="load_more" onclick="close3(this);" name="1">收起</span>)</span></div>';
        } else {
            ajax('/library/more-info?aisbn=' + aisbn, getMoreInfo, 1);
        }
    } else if (obj.getAttribute('name') === '2') {
        if (catalog_more) {
            content.innerHTML = catalog_more + '<br/><span class="load_more" id="load_more" onclick="close3(this)" name="2">收起</span>';
        } else {
            ajax('/library/more-info?aisbn=' + aisbn, getMoreInfo, 2);
        }
    }
}

function close3(obj) {
    if (obj.getAttribute('name') === '1') {
        moreInfo.intro_span.innerHTML = '<span class="intro_span">简&nbsp&nbsp介:</span><span class="book_intro">' + a + '(<span class="load_more" onclick="spread(this)" name="1">更多</span>)</span></div>';
    } else if (obj.getAttribute('name') === '2') {
        content.innerHTML = b + '<span class="load_more" onclick="spread(this)" name="2">更多</span>';
    }
}
/*end*/

/*float content*/
window.onscroll = function (argument) {
    var sure_height = document.getElementById('sure_height');
    var pre_tall = sure_height.offsetHeight + sure_height.parentNode.previousSibling.offsetHeight + sure_height.parentNode.previousSibling.previousSibling.offsetHeight + 10;
    var la_tall = content.offsetHeight + pre_tall - 42;
    var tall = document.body.scrollTop;
    if (tall > pre_tall && tall < la_tall) {
        catalog_list.style.position = 'fixed';
        catalog_list.style.top = '0';
        catalog_list.style.left = '0';
        catalog_list.parentNode.style.paddingTop='42px';
    } else if (tall > la_tall || tall < pre_tall) {
        catalog_list.style.position = 'relative';
        catalog_list.parentNode.style.paddingTop='0px';
    }
}
/*end*/

/*show other school*/
function spreadSchool(obj) {
    ajax("/library/holding-info?where=gzlib&isbn=" + isbn, getSchoolInfo, GT);
    ajax("/library/holding-info?where=scut&isbn=" + isbn, getSchoolInfo, SCUT);
    ajax("/library/holding-info?where=scnu&isbn=" + isbn, getSchoolInfo, SCNU);
    var name = obj.getAttribute('name');
    if (name === '1') {
        obj.parentNode.style.display = 'none';
        var more_school = document.getElementById('more_school');
        more_school.style.display = 'block';
    }
}
/*end*/

/*图书馆类*/
function library(obj,a_obj) {
    this.info_id = document.getElementById(obj);
    this.a_id=document.getElementById(a_obj);
    this.spreadInfo = function () {
        this.info_id.style.display = 'block';
    }
    this.stopInfo = function () {
        this.info_id.style.display = 'none';
    }
}

var SCUT = new library('scut_info','lib_scut');
SCUT.name='华南理工大学图书馆';
var SCNU = new library('scnu_info','lib_scnu');
SCNU.name='华南师范大学图书馆';
var GT = new library('gt_info','lib_gt');
GT.name='广州图书馆';

function show_stop(obj,obj2) {
    var c_style = obj.info_id.style.display;
    if (c_style === 'none' || c_style === undefined) {
        obj.spreadInfo();
        obj2.parentNode.setAttribute('class','jt_up');
    } else {
        obj.stopInfo();
        obj2.parentNode.removeAttribute('class');
    }
}


//ajax('/library/item?where=' + where  + "&marc_no=" + marc_no, showInfo);
var data = 
{"name":"&#x0043;&#x0053;&#x0053;&#x521b;&#x610f;&#x8bfe;","author":"&#x0028;&#x82f1;&#x0029;&#x672a;&#x6765;&#x51fa;&#x7248;&#x7f16;&#x8457; &#x738b;&#x6167;&#x73b2;&#x8bd1;","press":"&#x5317;&#x4eac;:&#x7535;&#x5b50;&#x5de5;&#x4e1a;&#x51fa;&#x7248;&#x793e;,&#x0032;&#x0030;&#x0031;&#x0033;","isbn":"9787121209314","holding":[{"code":"TP393.092\/1537 ","place":"\u81ea\u7136\u79d1\u5b66\u4e66\u5e93","state":-1,"date":"2015-01-16"},{"code":"TP393.092\/1537 ","place":"\u81ea\u7136\u79d1\u5b66\u4e66\u5e93","state":-1,"date":"2015-01-08"},{"code":"TP393.092\/1537 ","place":"\u6837\u672c\u4e66\u5e93","state":0}],"image":"http:\\\/\\\/img3.douban.com\\\/mpic\\\/s27133113.jpg","aisbn":"1112927380796","brief":"\\u7b2c1\\u7ae0&nbsp;\\u7279\\u5199\\u6536\\u5f551.1&nbsp;25\\u5927\\u57fa\\u4e8e\\u6d4f\\u89c8\\u5668\\u7684\\u5de5\\u51771.2&nbsp;\\u7528\\u7f51\\u9875\\u5b57\\u4f53\\u6539\\u5584\\u7f51\\u57401.3&nbsp;\\u6770\\u592b\\u7ef4\\u60691.4&nbsp;\\u73b0\\u5728\\u5c31\\u8ba9\\u4f60\\u7684\\u7f51\\u7ad9\\u63d0\\u901f1.5&nbsp;Web\\u54cd\\u5e94\\u8bbe\\u8ba11.6&nbsp;\\u4f0a\\u6851\\u9a6c\\u79d1\\u72791.7&nbsp;\\u4f60\\u7684\\u7b2c\\u4e00\\u4e2a\\u81ea\\u9002\\u5e94\\u9879\\u76ee1.8&nbsp;\\u4e3a\\u79fb\\u52a8\\u8bbe\\u5907\\u8c03\\u6574\\u7f51\\u9875\\u56fe\\u50cf1.9&nbsp;\\u7528\\u4f2a\\u5143\\u7d20\\u6765\\u5f3a\\u5316\\u4f60\\u7684CSS1.10&nbsp;2012\\u5e74\\u6700\\u70ed\\u95e8\\u7684\\u5341\\u79cdCSS\\u6280\\u5de71","catalog":"\\u7b2c1\\u7ae0&nbsp;\\u7279\\u5199\\u6536\\u5f55<br>1.1&nbsp;25\\u5927\\u57fa\\u4e8e\\u6d4f\\u89c8\\u5668\\u7684\\u5de5\\u5177<br>1.2&nbsp;\\u7528\\u7f51\\u9875\\u5b57\\u4f53\\u6539\\u5584\\u7f51\\u5740<br>1.3&nbsp;\\u6770\\u592b\\u7ef4\\u6069<br>1.4&nbsp;\\u73b0\\u5728\\u5c31\\u8ba9\\u4f60\\u7684\\u7f51\\u7ad9\\u63d0\\u901f<br>1.5&nbsp;Web\\u54cd\\u5e94\\u8bbe\\u8ba1<br>1.6&nbsp;\\u4f0a\\u6851\\u9a6c\\u79d1\\u7279<br>1.7&nbsp;\\u4f60\\u7684\\u7b2c\\u4e00\\u4e2a\\u81ea\\u9002\\u5e94\\u9879\\u76ee<br>1.8&nbsp;\\u4e3a\\u79fb\\u52a8\\u8bbe\\u5907\\u8c03\\u6574\\u7f51\\u9875\\u56fe\\u50cf<br>1.9&nbsp;\\u7528\\u4f2a\\u5143\\u7d20\\u6765\\u5f3a\\u5316\\u4f60\\u7684CSS<br>1.10&nbsp;2012\\u5e74\\u6700\\u70ed\\u95e8\\u7684\\u5341\\u79cdCSS\\u6280\\u5de7<br>1.11&nbsp;\\u827e\\u529b\\u514b\\u6885\\u5c14<br>1.12&nbsp;\\u7528CSS\\u5de5\\u5177\\u7bb1\\u66f4\\u5feb\\u5730\\u521b\\u5efa\\u7f51\\u7ad9<br>1.13&nbsp;\\u8ba9\\u4f60\\u7684\\u7f51\\u7ad9\\u5177\\u5907\\u5b8c\\u5168\\u7684\\u517c\\u5bb9\\u6027<br><br>"};
showInfo(data);

