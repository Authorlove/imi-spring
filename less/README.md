less的简要使用说明(具体请查看[这里](http://less.bootcss.com/))
================

##注释
和css不同，less可以使用行注释`// ...`，而css只能使用块注释`/* ... */`

##变量
* 定义变量：`@你定义的名字: value`; （变量只能定义一次）
``` less
@my-color: #fff;
body {
  color: @my-color;
}
```
* 变量用于选择器名
``` less
@test-class-name: classA;
#header {
  color: blue;
  .@{test-class-name} {   // 即.classA
    color: red;    
  }
}
```
* 变量用于属性名
``` less
@property-name: color;
#footer {
  @{property-name}: blue;
  background-@{property-name}: #999;
}
```
#混合(最常用得功能)
* 不带参数
``` less
.bordered {
  border: 1px solid black;
}

.mixin-class {
  color: #000;
  .bordered;
}
```
>可以混入的选择器只有类选择器和id选择器,带括号的混合不能被输出，例如
>>``` less
#output {
  color: red;
}
#not-output() { // 注意这里加了括号
  border: 1px solid black;
}
.mixined {
  #output;
  #not-output;
}
```
>>编译出来是
>>``` less
#output {
  color: red;
}
.mixined {
  color: red;
  border: 1px solid black;
}
```
*带参数






