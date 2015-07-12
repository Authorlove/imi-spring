var iCount = 0;


function hanoi(k,a,b,c){
    if(k>0){  
        hanoi(k-1,a,c,b);//把上面k-1个盘子从a通过c搬到b  
        iCount += 1;  
        console.log("第" + iCount +"步移动碟子" + k + " from " + a + " to " + c);//把最大的盘子从a搬到c  
        hanoi(k-1,b,a,c);//把k-1个盘子从b通过a搬到c  
    }     
}

hanoi(4,'柱子1','柱子2','柱子3');//2^n-1为n个盘子的步数



var dight = [1,3,5,7,8,9,11,13,15,16,19,20];
var length = dight.length;
console.log(length)


function search(n,first,last,blue){
	if(blue){
		console.log('你要搜索的数字是'+n);
		console.log('将搜索的数组的长度是'+length);
	}
	if(first!==last){
		if(!(length%2)){//偶数
			if(dight[length/2]>n){
				search(n,first,length/2);
			}else if(dight[length/2]===n){
				console.log('你要的找的数字在第'+ (length/2+1) +'位');
				return;
			}else{
				search(n,length/2,first);
			}
		}else{//奇数
			if(dight[Math.ceil(length/2)]>n){
				search(n,first,Math.ceil(length/2));
			}else if(dight[Math.ceil(length/2)]===n){
				console.log('你要的找的数字在第'+ (Math.ceil(length/2)+1) +'位');
				return;
			}else{
				search(n,Math.ceil(length/2),first);
			}
		}
	}else{
		
		console.log(first);
		console.log('未找到你要找的数字');
	}
}

search(11,0,length,true);
