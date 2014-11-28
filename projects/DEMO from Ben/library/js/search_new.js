/*全局变量*/
	var oldkeyword;
	var keywordchange = false;//标记关键字是否改变
	var loading = document.createElement("div");//底部“正在加载”

/*获取文档元素函数*/
	var getDom =  function(name){
		if(document.getElementById(name)){
			return document.getElementById(name);
		}
		else if(document.getElementsByClassName(name)){
			return document.getElementsByClassName(name);
		}
	}

/*对dom元素class的操作方法*/
	function hasClass(obj, cls) {  
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	}    
	function addClass(obj, cls) {  
	    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
	}   
	function removeClass(obj, cls) {  
	    if (hasClass(obj, cls)) {  
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	        obj.className = obj.className.replace(reg, ' ');  
	    }  
	}  

/*创建Ajax对象*/
	var ajaxGet = function(url,callback){
			var _xhr = null;
			_xhr = new window.XMLHttpRequest();
			var overload=document.getElementsByClassName('loading_page')[0];//loading页面
			overload.style.display="block";
			_xhr.onreadystatechange = function(){
			if(_xhr.readyState == 4 && _xhr.status == 200){
				callback(JSON.parse(_xhr.responseText));
				 overload.style.display="none";
			}
			}
			_xhr.open('get',url,true);
			_xhr.send();
	}

/*事件绑定函数*/
	var addEvent = function(name,event,fn){
		var el = getDom(name)||document;
		el.addEventListener(event,fn,false);
	}

/*图书馆对象*/
	function library(url,a,name){
		this.url = url;//请求地址
		this.a = a; //a参数为标记文档中class="search_item_wrap"和class="lib_name"对应图书馆的位置
		this.pn = 1;//当前页数，构成请求地址的参数
		this.ifend = 0;//是否到最后
		this.ifspread = 0;//内容是否展开
        this.name=name;//图书馆名字
		this.totalPage;//搜索结果总页数
	}

/*搜索函数*/
	var search =function(obj){
		var kw = getDom('input_word').value;
		var result_item = document.createElement("div");
		var content = "";
		// 去除底部正在加载条目
		if(obj!=scau&&obj.pn>2){
			getDom('search_item_wrap')[obj.a].removeChild(loading);
		}
		ajaxGet(obj.url+kw+'&pageNumber='+obj.pn,function(d){
			// 处理关键字改变，清除上次的搜索结果情况
			if(keywordchange){
				for(var i=0;i<5;i++){
				  getDom('search_item_wrap')[i].innerHTML = "";
		    	}
		    	for(var i=0;i<5;i++){
				  getDom('total_number')[i].innerHTML = "";
		    	}
		    	for(var i=0;i<5;i++){
            		getDom('lib_name')[i].style.display = "none";
            	}
			}
			keywordchange = false;
			obj.totalPage = d.totalPage;
			//处理搜索结果为空的情况
			if(d.resultNum==null||d.resultNum==0||d.totalPage==0){
				content = '<p class="no_result">没有搜到相关书籍</p>';
				getDom('total_number')[obj.a].innerHTML = '';
				getDom('check_other').style.display = "block";
			}
			//有搜索结果则嵌入内容
			else{
				for(var i=0; i<d.item.length; i++ ){
                    var s ="window.location.href='/library/show-item?where="+obj.name+"&marc_no="+d.item[i].marc_no+"';";
					content += '<div id="search_item" onclick="'+s+'">'
					+'<div class="search-icon"><img class="" src="/images/item-right.png" alt=""></div>'
					+'<div class="search-item-left">'
				    +'<p class="search-bookname">'+d.item[i].name+'</p>'
				    +'<p class="search-bookinfo">'+'责任者：'+d.item[i].author+'</p>'
				    +'<p class="search-bookinfo">'+'出版社：'+d.item[i].press+'</p></div></div>';
				}
			}
			result_item.innerHTML = content;

			obj.ifspread = 1;	
			getDom('search_block').style.display = "none";
			getDom('showlist').style.display = "none";
			getDom('showOrder').style.display = "none";	
			getDom('search_item_wrap')[obj.a].appendChild(result_item);
			getDom('lib_name')[obj.a].style.display = "block";
			getDom('search_item_wrap')[obj.a].style.display = "block";

			//当前搜索页数小于总页数，则在底部加入“正在加载”
			if(obj.pn<parseInt(d.totalPage)){
		        loading.innerHTML = '<p class="jump">正在加载</p>';
		        getDom('search_item_wrap')[obj.a].appendChild(loading);
			    }

			//当前搜索页数等于总页数，则设置结束标记
		    if(obj.pn==parseInt(d.totalPage)){
		    	obj.ifend = 1;
		    	obj.pn++;
		    }

		    //华农搜索结果展示完毕，显示“查看其它图书馆”
		    if(scau.ifend){
		    	getDom('check_other').style.display = "block";
		    	scau.ifend = 0;
		    }
		    //页数增一，改变请求
		    obj.pn++;
		    //关键字高亮处理
		    MarkHighLightDemo();
		    //监听滚动条事件，当“正在加载”div进入可视界面则触发新请求
			window.onscroll = function() {
		    var body = document.body;
			 if(loading.offsetTop < body.clientHeight+body.scrollTop&&loading.offsetTop!=0){
	        	search(obj);
	        	if(obj==scau){
	        	getDom('search_item_wrap')[obj.a].removeChild(loading);	
	        	}
	           }
	     	}	
		});		    
	}

/*实例化四所图书馆*/
    scau = new library('/library/search?where=scau&keyWord=',0,'scau');
    gzlib = new library('/library/search?where=gzlib&keyWord=',1,'gzlib');
    scut = new library('/library/search?where=scut&keyWord=',2,'scut');
    scnu = new library('/library/search?where=scnu&keyWord=',3,'scnu');

/*搜索框输入事件处理，输入为空时清除所有页面到初始页面“我的预约”并重新实例化四个图书馆，回车时开始搜索*/
	addEvent('input_word','keyup',function(){
    	var keycode =  event.keyCode;
		if(getDom('input_word').value == ''){
			for(var i=0;i<5;i++){
				getDom('lib_name')[i].style.display = "none";
			}
			for(var i=0;i<5;i++){
				getDom('search_item_wrap')[i].innerHTML = "";
			}
			for(var i=0;i<5;i++){
				getDom('search_item_wrap')[i].style.display = "none";
			}
			getDom('check_other').style.display = "none";	
			getDom('showlist').style.display = "block";
			getDom('showOrder').style.display = "block";
			
	    }
	    scau = new library('/library/search?where=scau&keyWord=',0,'scau');
	    gzlib = new library('/library/search?where=gzlib&keyWord=',1,'gzlib');
        scut = new library('/library/search?where=scut&keyWord=',2,'scut');
        scnu = new library('/library/search?where=scnu&keyWord=',3,'scnu');
	    keywordchange = true
	    if(keycode == 13){
	    	search(scau);//默认先搜索华农
	    	getDom('overload_two').style.display = "none";
	    	getDom('input_word').blur();
		}
	});


// 点击图书馆按钮实现搜索结果展开闭合处理、图标翻转、数据请求

/*点击事件绑定，点击华农该列栏目*/
	addEvent('scau','click',function(){
		if(scau.ifspread){
			getDom('search_item_wrap')[0].style.display = "none";
			getDom('lib_name')[0].getElementsByTagName('img')[0].className = "rotate_down";
			scau.ifspread = 0;
		}
		else{
			getDom('search_item_wrap')[0].style.display = "block";
			getDom('lib_name')[0].getElementsByTagName('img')[0].className = "rotate_up";
			scau.ifspread = 1;
		}
	});

/*点击事件绑定，点击广图该列栏目*/
    addEvent('gzlib','click',function(){
        if(gzlib.ifspread){
            getDom('search_item_wrap')[1].style.display = "none";
            getDom('lib_name')[1].getElementsByTagName('img')[0].className = "rotate_down";
            gzlib.ifspread = 0;//标记是否展开状态
        }
        else{
            getDom('search_item_wrap')[1].style.display = "block";
            getDom('lib_name')[1].getElementsByTagName('img')[0].className = "rotate_up";
            if(!gzlib.ifend){
            	search(gzlib);//不是达到最后时继续搜索
            }
            gzlib.ifspread = 1;
        }
    });

/*点击事件绑定，点击华工该列栏目*/
    addEvent('scut','click',function(){
        if(scut.ifspread){
            getDom('search_item_wrap')[2].style.display = "none";
            getDom('lib_name')[2].getElementsByTagName('img')[0].className = "rotate_down";
            scut.ifspread = 0;
        }
        else{
            getDom('search_item_wrap')[2].style.display = "block";
            getDom('lib_name')[2].getElementsByTagName('img')[0].className = "rotate_up";
            if(!scut.ifend){
            	search(scut);
            }
            scut.ifspread = 1;
        }
    });

/*点击事件绑定，点击华师该列栏目*/
    addEvent('scnu','click',function(){
        if(scnu.ifspread){
            getDom('search_item_wrap')[3].style.display = "none";
            getDom('lib_name')[3].getElementsByTagName('img')[0].className = "rotate_down";
            scnu.ifspread = 0;
        }
        else{
            getDom('search_item_wrap')[3].style.display = "block";
            getDom('lib_name')[3].getElementsByTagName('img')[0].className = "rotate_up";
           if(!scnu.ifend){
            	search(scnu);
            }
            scnu.ifspread = 1;
        }
    })

/*请求得到四所图书馆的搜索结果总数*/
	function searchNum(obj){
		var kw = getDom('input_word').value;
		ajaxGet(obj.url+kw,function(d){
			if(d.resultNum==null||d.resultNum==0||d.totalPage==0)
			getDom('total_number')[obj.a].innerHTML = '(0)';
		});
	}

//查看其它图书馆
	addEvent('check_other','click',function(){
		getDom('check_other').style.display = "none";
		searchNum(gzlib);
		searchNum(scut);
		searchNum(scnu);
		for(var i=1;i<5;i++){
			getDom('lib_name')[i].style.display = "block";
		}
	});

function onpen_close(){
	if(getDom('tab').getAttribute("ifspread")== "0"){
            getDom('tab_list')[0].style.display = "block";
            getDom('tab').getElementsByTagName('img')[0].className='rotate_down';
            getDom('tab').setAttribute("ifspread","1");
            getDom('overload_two').style.display = "block";
        }
        else{
            getDom('tab_list')[0].style.display = "none";
            getDom('tab').getElementsByTagName('img')[0].className='rotate_up';
            getDom('tab').setAttribute("ifspread","0");
            getDom('overload_two').style.display = "none";
        }
}

/*事件绑定，“我的预约”和“我的订阅”*/
    addEvent('tab','click',onpen_close);

/*事件绑定，“订阅”、“预约”下拉框切换函数*/
    var tab_list = document.getElementsByClassName('tab_list')[0];
    tab_list.addEventListener('click',function(){
    	onpen_close();
        var off = document.getElementsByClassName('off')[0];
        var on = document.getElementsByClassName('on')[0];
        off.addEventListener('click',function(){
        	for(var i=0;i<5;i++){
        		getDom('lib_name')[i].style.display = "none";
        	}
        	for(var i=0;i<5;i++){
        		getDom('search_item_wrap')[i].style.display = "none";
        	}
        	getDom('check_other').style.display = "none";
        if(off.getAttribute("shownum")=="1"){
            getDom('showlist').style.display="block";
            getDom('showOrder').style.display="none";
        }   
        else{
            getDom('showlist').style.display="none";
            getDom('showOrder').style.display="block";
        } 
        getDom('tab').getElementsByTagName('span')[0].innerHTML = off.getElementsByTagName('span')[0].innerHTML;
        off.className = 'on';
        on.className = 'off';
        getDom('overload_two').style.display = "none";
        getDom('tab_list')[0].style.display = "none";
        getDom('tab').getElementsByTagName('img')[0].className='rotate_up';
        
        },false);
    },false);

/*点击搜索框*/
	addEvent('input_wrap','click',function(){
		var inputId = document.getElementById('input_word');
	    addClass(getDom('search_wrap'),"search_wrap_focus");
	    setTimeout(function(){
	    getDom('search_block').style.display = "block";
	    getDom('tab_list')[0].style.display = "none";	
	    },200)
	    var self = this;
		inputId.focus();
		getDom('input_wrap_two')[0].style.marginLeft = '10px';
		document.getElementById('showlist').style.display = 'none';
		
	});



/*点击取消搜索函数*/
	function input_cancel(){
		removeClass(getDom('search_wrap'),"search_wrap_focus");
		getDom('search_block').style.display = "none";
		getDom('overload_two').style.display = "none";
		getDom('input_wrap_two')[0].style.marginLeft = formM+'px';
		document.getElementById('showlist').style.display = 'block';
	}
/*点击取消搜索*/
	addEvent('search_cancel','click',function(){
		getDom('input_word').value="";
		input_cancel();
	});

/*点击弹幕*/
	addEvent('overload_two','click',function(){
		input_cancel();
		getDom('tab_list')[0].style.display = "none";
		if(getDom('tab').getElementsByTagName('img')[0].className=='rotate_down'){
			getDom('tab').getElementsByTagName('img')[0].className='rotate_up';
		}
	});

/*点击搜索提示框*/
	addEvent('search_block','click',function(){
		input_cancel();
	});


/*关键字高亮处理函数*/
function MarkHighLight(obj,hlWords,cssClass){ 

    hlWords=AnalyzeHighLightWords(hlWords); 
   
    if(obj==null || hlWords.length==0) 
        return; 
    if(cssClass==null) 
        cssClass="highlight"; 
    MarkHighLightCore(obj,hlWords); 
   
    //------------执行高亮标记的核心方法---------------------------- 
    function MarkHighLightCore(obj,keyWords){ 
        var re=new RegExp(keyWords, "i"); 
       
        for(var i=0; i<obj.childNodes.length; i++){ 
       
            var childObj=obj.childNodes[i]; 
            if(childObj.nodeType==3){ 
                if(childObj.data.search(re)==-1)continue; 
                var reResult=new RegExp("("+keyWords+")", "gi"); 
                var objResult=document.createElement("span"); 
                objResult.innerHTML=childObj.data.replace(reResult,"<span class='"+cssClass+"'>$1</span>");                    
                //if(childObj.data==objResult.childNodes[0].innerHTML) continue; 
                obj.replaceChild(objResult,childObj);                                     
            }else if(childObj.nodeType==1){ 
                MarkHighLightCore(childObj,keyWords); 
            } 
        } 
    }       

    //----------分析关键词---------------------- 
    function AnalyzeHighLightWords(hlWords) 
    { 
        if(hlWords==null) return ""; 
        hlWords=hlWords.replace(/\s+/g,"|").replace(/\|+/g,"|");           
        hlWords=hlWords.replace(/(^\|*)|(\|*$)/g, ""); 
       
        if(hlWords.length==0) return ""; 
        var wordsArr=hlWords.split("|"); 
       
        if(wordsArr.length>1){ 
            var resultArr=BubbleSort(wordsArr); 
            var result=""; 
            for(var i=0;i<resultArr.length;i++){ 
                result=result+"|"+resultArr[i]; 
            }               
            return result.replace(/(^\|*)|(\|*$)/g, ""); 

        }else{ 
            return hlWords; 
        } 
    }   
   
    //-----利用冒泡排序法把长的关键词放前面-----   
    function BubbleSort(arr){       
        var temp, exchange;   
        for(var i=0;i<arr.length;i++){           
            exchange=false;               
            for(var j=arr.length-2;j>=i;j--){               
                if((arr[j+1].length)>(arr[j]).length){                   
                    temp=arr[j+1]; arr[j+1]=arr[j]; arr[j]=temp; 
                    exchange=true; 
                } 
            }               
            if(!exchange)break; 
        } 
        return arr;           
    } 

} 
//----------------end------------------------ 
   
function MarkHighLightDemo(){ 
var txtObj=getDom('input_word').value; 
var divObj= getDom('search-bookname');
for(var i=0;i<divObj.length;i++){
	MarkHighLight(divObj[i],txtObj);
}
}


var divW = getDom('input_wrap_one')[0].offsetWidth;
var formM = (divW-78)/2;
getDom('input_wrap_two')[0].style.marginLeft = formM+'px';
// getDom('input_wrap_two')[0].style.marginLeft = 100+'px';